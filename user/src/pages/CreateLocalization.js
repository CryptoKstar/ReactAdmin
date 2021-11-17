import Page from '../components/Page';
import { Container, Button, Stack, Typography, CardActionArea, TextField, FormControl, InputLabel, Select, MenuItem, Input, Checkbox } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { useEffect } from 'react';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddTaskIcon from '@mui/icons-material/AddTask';
import FormLabel from '@mui/material/FormLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function CreateLocalization() {
    const history = useHistory();
    // eslint-disable-next-line
    const [PaymentMethods, setPaymentMethods] = useState([]);
    // eslint-disable-next-line
    const [SitePayment, setSitePayment] = useState({});
    // eslint-disable-next-line
    const [Details, setDetails] = useState();
    // eslint-disable-next-line
    const [ValueObject, setValueObject] = useState({});
    // eslint-disable-next-line
    const [ValueObjectLocalize, setValueObjectLocalize] = useState({});
    // eslint-disable-next-line
    const [sitepaymentmethods, setsitepaymentmethods] = useState([]);
    const [AlertMessage, setAlertMessage] = useState("success");
    const [AlertType, setAlertType] = useState("success");
    const [AlertOpen, setAlertOpen] = useState(false);
    const { t } = useTranslation();
    const params = useParams();

    const AlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    const httpClient = (url, options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }
        const token = JSON.parse(sessionStorage.AccessToken).Token;
        options.headers.set('Authorization', `${token}`);
        return fetchUtils.fetchJson(url, options);
    };

    const dataProvider = jsonServerProvider(configData.API_URL + 'api', httpClient);

    const handleSubmit = (e) => {
        e.preventDefault();
        const localizedata = Details;
        for (let i = 0; i < localizedata.length; i++) {
            if (localizedata[i].Localizable === true) {
                if (ValueObjectLocalize[localizedata[i].Name]) {
                    localizedata[i].Default = ValueObjectLocalize[localizedata[i].Name];
                }
            }
        }
        const local_data = JSON.stringify({ "parameters": localizedata })
        dataProvider.create('company_site_payment_methods_localize', { data: { CompanySitePaymentMethodId: params.id, Languange: ValueObjectLocalize.localize ? ValueObjectLocalize.localize : "en-US", Data: local_data } })
            .then(res => {
                setAlertMessage(t("Selected Payment Methods is added correctly"));
                setAlertType("success");
                setAlertOpen(true);
                history.push(`/localization/${params.id}`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const go = () => {
        history.push(`/localization/${params.id}`)
    }

    const load = () => {
        let payment_methods = [];
        const Id = params.id;
        dataProvider.getList("payment_methods", { pagination: { page: 1, perPage: 10 }, sort: { field: 'id', order: 'ASC' }, filter: {} })
            .then(res => {
                payment_methods = res.data;
                const methods = [];
                for (let i = 0; i < payment_methods.length; i++) {
                    methods.push({
                        label: payment_methods[i].Name,
                        value: payment_methods[i].id,
                        data: payment_methods[i],
                    })
                }
                setPaymentMethods(methods);
                console.log(Id);
                dataProvider.getList('company_site_payment_methods', { pagination: { page: 1, perPage: 10 }, sort: { field: 'id', order: 'ASC' }, filter: { id: Id } })
                    .then(res => {
                        const data = res.data;
                        console.log(data);
                        const res_data = [];
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].CompanySiteId === JSON.parse(sessionStorage.CurrentSite).id) {
                                if (data[i].id.toString() === Id) {
                                    res_data.push({
                                        id: data[i].id,
                                        name: payment_methods[data[i].PaymentMethodId - 1].Name,
                                        data: data[i].Data,
                                        date: data[i].UpdatedAt,
                                        PaymentMethodsId: data[i].PaymentMethodId,
                                    })
                                }
                            }
                        }
                        console.log(res_data, 88)
                        setsitepaymentmethods(res_data);
                        setDetails(JSON.parse(res_data[0].data).parameters)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
    }
    useEffect(() => {
        load()
        // eslint-disable-next-line
    }, [])
    return (
        <Page title="Localizations | Holest">
            <Snackbar open={AlertOpen} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={AlertClose}>
                <Alert onClose={AlertClose} severity={AlertType} sx={{ width: '100%' }}>
                    {AlertMessage}
                </Alert>
            </Snackbar>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {t("New Localization")}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={(e) => go(e)}
                        startIcon={<AddTaskIcon />}
                        color="secondary"
                    >
                        {t('Go Localizations')}
                    </Button>
                </Stack>
            </Container>
            <Grid container justifyContent="center">
                <Grid item xs={8}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {t("Localizations")}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardContent>
                            <form action="/paymentmethods" onSubmit={handleSubmit}>
                                <Stack spacing={3} paddingTop={2}>
                                    <FormControl >
                                        <TextField
                                            fullWidth
                                            label="Localize"
                                            required={true}
                                            value={ValueObjectLocalize["localize"]}
                                            // eslint-disable-next-line
                                            onChange={(e) => setValueObjectLocalize({ ...ValueObjectLocalize, ["localize"]: e.target.value })}
                                        />
                                    </FormControl>
                                    {
                                        // eslint-disable-next-line
                                        Details ? Details.map((item, key) => {
                                            if (item.Localizable === true) {

                                                if (item.Type === "Text") {
                                                    return (
                                                        <FormControl key={key}>
                                                            <TextField
                                                                disabled={!item.Localizable}
                                                                fullWidth
                                                                label={item.Name}
                                                                defaultValue={item.Default}
                                                                required={item.Required}
                                                                value={ValueObjectLocalize[item.Name]}
                                                                onChange={(e) => setValueObjectLocalize({ ...ValueObjectLocalize, [item.Name]: e.target.value })}
                                                            />
                                                        </FormControl>
                                                    )
                                                }
                                                else if (item.Type === "WYSIWYG") {
                                                    return (
                                                        <FormControl key={key}>
                                                            <Editor
                                                                // toolbarOnFocus
                                                                readOnly={!item.Localizable}
                                                                wrapperClassName="wrapper-class"
                                                                editorClassName="editor-class"
                                                                toolbarClassName="toolbar-class"
                                                                required={item.Required}
                                                                editorState={EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('<p>' + item.Default + '</p>')))}
                                                                // contentState = {123}
                                                                // ValueObjectLocalize[item.Editor] ? ValueObjectLocalize[item.Editor] :
                                                                // value={ValueObjectLocalize[item.Editor]}
                                                                onChange={(e) => setValueObjectLocalize({ ...ValueObjectLocalize, [item.Name]: e.blocks[0].text })}
                                                                toolbar={{
                                                                    inline: { inDropdown: true },
                                                                    list: { inDropdown: true },
                                                                    textAlign: { inDropdown: true },
                                                                    link: { inDropdown: true },
                                                                    history: { inDropdown: true },
                                                                }}
                                                            />
                                                        </FormControl>
                                                    )
                                                }
                                                else if (item.Type === "Upload") {
                                                    return (
                                                        <FormControl key={key}>
                                                            <label htmlFor="contained-button-file">
                                                                <Input accept="image/*" id="contained-button-file" disabled={!item.Localizable} multiple type="file" style={{ display: "none" }} value={ValueObjectLocalize[item.Name]} onChange={(e) => setValueObjectLocalize({ ...ValueObjectLocalize, [item.Name]: e.target.value })} />
                                                                <Button variant="contained" color="secondary" disabled={!item.Localizable} required={item.Required} component="span" size="large" fullWidth>
                                                                    {item.Name} Upload
                                                                </Button>
                                                            </label>
                                                        </FormControl>
                                                    )
                                                }
                                                else if (item.Type === "RADIO") {
                                                    return (
                                                        <FormControl component="fieldset" key={key}>
                                                            <FormLabel component="legend" color="secondary">{item.Name}</FormLabel>
                                                            <RadioGroup row aria-label="gender" defaultValue={item.Default} name="row-radio-buttons-group" value={ValueObjectLocalize[item.Name]} onChange={(e) => setValueObjectLocalize({ ...ValueObjectLocalize, [item.Name]: e.target.value })}>
                                                                {
                                                                    item.Options.map((sub_item, sub_key) => {
                                                                        return (
                                                                            <FormControlLabel value={Object.values(sub_item)[0]} required={item.Required} disabled={!item.Localizable} key={sub_key} control={<Radio color="secondary" />} label={Object.values(sub_item)[0]} />
                                                                        )
                                                                    })
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                    )
                                                }
                                                else if (item.Type === "Checkbox") {
                                                    return (
                                                        <FormControl component="fieldset" key={key}>
                                                            <FormControlLabel key={key} value={ValueObjectLocalize[item.Name]} disabled={!item.Localizable} onChange={(e) => setValueObjectLocalize({ ...ValueObjectLocalize, [item.Name]: e.target.value })} required={item.Required} control={<Checkbox color="secondary" defaultChecked={item.Default} />} label={item.Name} />
                                                        </FormControl>
                                                    )
                                                }
                                                else if (item.Type === "Select") {
                                                    return (
                                                        <FormControl key={key}>
                                                            <InputLabel id="demo-simple-select-label">{item.Name}</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                // value={SitePayment}
                                                                label="Payment Methods"
                                                                defaultValue={item.Default}
                                                                disabled={!item.Localizable}
                                                                required={item.Required}
                                                                value={ValueObjectLocalize[item.Name]}
                                                                onChange={(e) => setValueObjectLocalize({ ...ValueObjectLocalize, [item.Name]: e.target.value })}
                                                            >
                                                                {
                                                                    item.Options.map((sub_item, sub_key) => {
                                                                        return (
                                                                            <MenuItem key={sub_key} value={Object.values(sub_item)[0]}>{Object.keys(sub_item)[0]}</MenuItem>

                                                                        )
                                                                    })
                                                                }

                                                            </Select>
                                                        </FormControl>
                                                    )
                                                }
                                            }
                                        }) : ""
                                    }
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={10}>
                                        <LoadingButton
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            color="secondary"
                                            endIcon={<SendIcon />}
                                            variant="contained"
                                        >
                                            {t("Create")}
                                        </LoadingButton>
                                    </Stack>

                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Page >
    );
}
