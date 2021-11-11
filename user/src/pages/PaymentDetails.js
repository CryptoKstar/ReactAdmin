import Page from '../components/Page';
import { Container, Button, Stack, Typography, CardActionArea, TextField, FormControl, InputLabel, Select, MenuItem, Input, Checkbox, Icon, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
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
import FormLabel from '@mui/material/FormLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function PaymentDetails() {
    const history = useHistory();
    const [Currentdata, setCurrentdata] = useState("");
    const [SitePayment, setSitePayment] = useState("123");
    const [Details, setDetails] = useState();
    const [LocalizeData, setLocalizeData] = useState();
    const [LocalizeId, setLocalizeId] = useState();
    const [localLanguage, setlocalLanguage] = useState();
    const [ValueObject, setValueObject] = useState({});
    // eslint-disable-next-line
    const [AlertMessage, setAlertMessage] = useState("success");
    // eslint-disable-next-line
    const [AlertType, setAlertType] = useState("success");
    const [AlertOpen, setAlertOpen] = useState(false)
    const params = useParams();
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [ValueObjectLocalize, setValueObjectLocalize] = useState({});

    const handleClose = () => {
        setOpen(false);
    };

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
        const maindata = Details;
        for (let i = 0; i < maindata.length; i++) {
            if (ValueObject[maindata[i].Name]) {
                maindata[i].Default = ValueObject[maindata[i].Name];
            }
        }
        const main_data = JSON.stringify({ "parameters": maindata })

        const localizedata = LocalizeData;
        for (let i = 0; i < localizedata.length; i++) {
            if (localizedata[i].Localizable === true) {
                if (ValueObjectLocalize[localizedata[i].Name]) {
                    localizedata[i].Default = ValueObjectLocalize[localizedata[i].Name];
                }
            }
        }
        const local_data = JSON.stringify({ "parameters": localizedata })

        dataProvider.update('company_site_payment_methods', { id: Currentdata.id, data: { PaymentMethodId: Currentdata.PaymentMethodId, CompanySiteId: JSON.parse(sessionStorage.CurrentSite).id, Data: main_data } })
            .then(res => {
                dataProvider.update('company_site_payment_methods_localize', { id: LocalizeId, data: { CompanySitePaymentMethodId: res.data.id, Languange: ValueObjectLocalize.localize ? ValueObjectLocalize.localize : "en-US", Data: local_data } })
                    .then(res => {
                        setAlertMessage(t("Selected Payment Methods is added correctly"));
                        setAlertType("success");
                        setAlertOpen(true);
                        // history.push('/paymentmethods')
                    })
                    .catch(error => {
                        console.log(error)
                    })
                // history.push('/paymentmethods')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const gopayment = (params) => {
        history.push('/paymentmethods')
    }

    const paymentMethodsDelete = (id) => {
        dataProvider.delete('company_site_payment_methods', { id: Currentdata.id })
            .then(res => {
                history.push('/paymentmethods')
            })
            .catch(error => {
                console.log(error)
            })
    }


    const load = async () => {
        let payment_methods = [];
        const Id = params.id;
        await dataProvider.getOne("company_site_payment_methods", { id: Id })
            .then(async res => {
                const data = res.data;
                setCurrentdata(data);
                setDetails(JSON.parse(data.Data).parameters)
                await dataProvider.getList("payment_methods", { pagination: { page: 1, perPage: 10 }, sort: { field: 'id', order: 'ASC' }, filter: {} })
                    .then(async res => {
                        payment_methods = res.data;
                        const methods = [];
                        for (let i = 0; i < payment_methods.length; i++) {
                            methods.push({
                                label: payment_methods[i].Name,
                                value: payment_methods[i].id,
                                data: payment_methods[i],
                            })
                        }

                        await dataProvider.getList("company_site_payment_methods_localize", { pagination: { page: 1, perPage: 10 }, sort: { field: 'id', order: 'ASC' }, filter: { CompanySitePaymentMethodId: Id } })
                            .then(res => {
                                const data = res.data;
                                for (let j = 0; j < data.length; j++) {
                                    if (data[j].CompanySitePaymentMethodId.toString() === Id.toString()) {
                                        setLocalizeData(JSON.parse(data[j].Data).parameters)
                                        setLocalizeId(data[j].id);
                                        setlocalLanguage(data[j].Languange);
                                    }
                                }
                            })

                        setSitePayment(methods[data.PaymentMethodId - 1].label)
                    })
            })
    }

    useEffect(() => {
        load()
        // eslint-disable-next-line
    }, [])
    return (
        <Page title="Company | Holest">
            <Snackbar open={AlertOpen} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={AlertClose}>
                <Alert onClose={AlertClose} severity={AlertType} sx={{ width: '100%' }}>
                    {AlertMessage}
                </Alert>
            </Snackbar>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {t("Payment Methods Details")}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={(e) => gopayment()}
                        startIcon={<Icon icon={plusFill} />}
                        color="secondary"
                    >
                        {t("GO PaymentMethod")}
                    </Button>
                </Stack>
            </Container>
            <Grid container justifyContent="center">
                <Grid item xs={8}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {t("Details")}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardContent>
                            <form action="/paymentmethods" onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <FormControl>
                                        <TextField
                                            fullWidth
                                            label="Payment Methods"
                                            value={SitePayment}
                                            disabled={true}
                                        />
                                    </FormControl>
                                    {
                                        // eslint-disable-next-line
                                        Details ? Details.map((item, key) => {
                                            if (item.Type === "Text") {
                                                return (
                                                    <FormControl key={key}>
                                                        <TextField

                                                            fullWidth
                                                            label={item.Name}
                                                            defaultValue={item.Default}
                                                            required={item.Required}
                                                            value={ValueObject[item.Name]}
                                                            onChange={(e) => setValueObject({ ...ValueObject, [item.Name]: e.target.value })}
                                                        />
                                                    </FormControl>
                                                )
                                            }
                                            else if (item.Type === "WYSIWYG") {
                                                return (
                                                    <FormControl key={key}>
                                                        <Editor
                                                            wrapperClassName="wrapper-class"
                                                            editorClassName="editor-class"
                                                            toolbarClassName="toolbar-class"
                                                            required={item.Required}
                                                            defaultEditorState={EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('<p>' + item.Default + '</p>')))}
                                                            onChange={(e) => setValueObject({ ...ValueObject, [item.Name]: e.blocks[0].text })}
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
                                                            <Input accept="image/*" id="contained-button-file" multiple type="file" style={{ display: "none" }} value={ValueObject[item.Name]} onChange={(e) => setValueObject({ ...ValueObject, [item.Name]: e.target.value })} />
                                                            <Button variant="contained" color="secondary" required={item.Required} component="span" size="large" fullWidth>
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
                                                        <RadioGroup row aria-label="gender" defaultValue={item.Default} name="row-radio-buttons-group" value={ValueObject[item.Name]} onChange={(e) => setValueObject({ ...ValueObject, [item.Name]: e.target.value })}>
                                                            {
                                                                item.Options.map((sub_item, sub_key) => {
                                                                    return (
                                                                        <FormControlLabel value={Object.values(sub_item)[0]} required={item.Required} key={sub_key} control={<Radio color="secondary" />} label={Object.values(sub_item)[0]} />

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
                                                        <FormControlLabel key={key} value={ValueObject[item.Name]} onChange={(e) => setValueObject({ ...ValueObject, [item.Name]: e.target.value })} required={item.Required} control={<Checkbox color="secondary" defaultChecked={item.Default} />} label={item.Name} />
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
                                                            label="Payment Methods"
                                                            defaultValue={item.Default}
                                                            required={item.Required}
                                                            value={ValueObject[item.Name]}
                                                            onChange={(e) => setValueObject({ ...ValueObject, [item.Name]: e.target.value })}
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
                                            {t("Update")}
                                        </LoadingButton>
                                        <LoadingButton
                                            fullWidth
                                            color="secondary"
                                            size="large"
                                            endIcon={<RotateLeftIcon />}
                                            type="reset"
                                            variant="contained"
                                            onClick={(e) => paymentMethodsDelete()}
                                        >
                                            {t("Delete")}
                                        </LoadingButton>
                                        <LoadingButton
                                            fullWidth
                                            color="secondary"
                                            size="large"
                                            endIcon={<RotateLeftIcon />}
                                            type="reset"
                                            variant="contained"
                                            onClick={(e) => setOpen(true)}
                                        >
                                            {t("Localizations")}
                                        </LoadingButton>
                                        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
                                            <DialogTitle>{t("PAYMENT METHOD LOCALIZATIONS")}</DialogTitle>
                                            <DialogContent>
                                                <Stack spacing={3} paddingTop={2}>
                                                    <FormControl >
                                                        <TextField
                                                            fullWidth
                                                            label="Localize"
                                                            defaultValue={localLanguage}
                                                            required={true}
                                                            value={ValueObjectLocalize["localize"]}
                                                            // eslint-disable-next-line
                                                            onChange={(e) => setValueObjectLocalize({ ...ValueObjectLocalize, ["localize"]: e.target.value })}
                                                        />
                                                    </FormControl>
                                                    {
                                                        // eslint-disable-next-line
                                                        LocalizeData ? LocalizeData.map((item, key) => {
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
                                                </Stack>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={(e) => setOpen(false)}>{t("Ok")}</Button>
                                            </DialogActions>
                                        </Dialog>
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
