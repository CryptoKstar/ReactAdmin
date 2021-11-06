import Page from '../components/Page';
import { Container, Button, Stack, Typography, CardActionArea, TextField, FormControl, InputLabel, Select, MenuItem, Input, Checkbox } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useFormik, Form, FormikProvider } from 'formik';
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
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function CreatePayment() {
    const history = useHistory();
    const [PaymentMethods, setPaymentMethods] = useState([]);
    const [SitePayment, setSitePayment] = useState({});
    const [Details, setDetails] = useState();
    const [ValueObject, setValueObject] = useState({});
    const [sitepaymentmethods, setsitepaymentmethods] = useState([]);
    const [AlertMessage, setAlertMessage] = useState("success");
    const [AlertType, setAlertType] = useState("success");
    const [AlertOpen, setAlertOpen] = useState(false);
    const handleChange = (event) => {
        const data = event.target.value;
        setDetails(JSON.parse(data.Data).parameters);
        setSitePayment(data);
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
    const formik = useFormik({
    });

    const handleSubmit = (params, e) => {
        let flag = 0;
        for (let i = 0; i < sitepaymentmethods.length; i++) {
            if (SitePayment.id === sitepaymentmethods[i].PaymentMethodsId) {
                flag++;
            }
        }
        if (flag !== 0) {
            setAlertMessage("The Payment Methods is exist in this site");
            setAlertType("error");
            setAlertOpen(true);
        }
        else {
            dataProvider.create('company_site_payment_methods', { data: { PaymentMethodId: SitePayment.id, CompanySiteId: JSON.parse(sessionStorage.CurrentSite).id, Data: SitePayment.Data } })
                .then(res => {
                    setAlertMessage("Selected Payment Methods is added correctly");
                    setAlertType("success");
                    setAlertOpen(true);
                    history.push('/paymentmethods')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const load = (params) => {
        let payment_methods = [];
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
                dataProvider.getList('company_site_payment_methods', { pagination: { page: 1, perPage: 10 }, sort: { field: 'id', order: 'ASC' }, filter: {} })
                    .then(res => {
                        const data = res.data;
                        const res_data = [];
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].CompanySiteId === JSON.parse(sessionStorage.CurrentSite).id) {
                                res_data.push({
                                    id: data[i].id,
                                    name: payment_methods[data[i].PaymentMethodId - 1].Name,
                                    data: data[i].Data,
                                    date: data[i].UpdatedAt,
                                    PaymentMethodsId: data[i].PaymentMethodId,
                                })
                            }
                        }
                        setsitepaymentmethods(res_data);
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
    const { isSubmitting } = formik;
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
                        New Payment Methods
                    </Typography>
                </Stack>
            </Container>
            <Grid container justifyContent="center">
                <Grid item xs={8}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Payments
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardContent>
                            <FormControl fullWidth style={{ marginBottom: "10px" }}>
                                <InputLabel id="demo-simple-select-label">Payment Methods</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={SitePayment}
                                    label="Payment Methods"
                                    onChange={handleChange}
                                >
                                    {
                                        PaymentMethods.map((item, key) => {
                                            return (
                                                <MenuItem key={key} value={item.data}>{item.label}</MenuItem>

                                            )
                                        })
                                    }

                                </Select>
                            </FormControl>
                            <FormikProvider value={formik}>
                                <Form autoComplete="off" action="/paymentmethods" noValidate onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        {
                                            // eslint-disable-next-line
                                            Details ? Details.map((item, key) => {
                                                console.log(item)
                                                if (item.Type === "Text") {
                                                    return (
                                                        <FormControl key={key}>
                                                            <TextField
                                                                disabled={!item.Localizable}
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
                                                                // toolbarOnFocus
                                                                readOnly={!item.Localizable}
                                                                wrapperClassName="wrapper-class"
                                                                editorClassName="editor-class"
                                                                toolbarClassName="toolbar-class"
                                                                required={item.Required}
                                                                editorState={EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML('<p>' + item.Default + '</p>')))}
                                                                // contentState = {123}
                                                                // ValueObject[item.Editor] ? ValueObject[item.Editor] :
                                                                // value={ValueObject[item.Editor]}
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
                                                            <RadioGroup row aria-label="gender" defaultValue={item.Default} name="row-radio-buttons-group" value={ValueObject[item.Name]} onChange={(e) => setValueObject({ ...ValueObject, [item.Name]: e.target.value })}>
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
                                                            <FormControlLabel key={key} value={ValueObject[item.Name]} disabled={!item.Localizable} onChange={(e) => setValueObject({ ...ValueObject, [item.Name]: e.target.value })} required={item.Required} control={<Checkbox color="secondary" defaultChecked={item.Default} />} label={item.Name} />
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
                                                                defaultValue="complited"
                                                                disabled={!item.Localizable}
                                                                required={item.Required}
                                                                value={ValueObject[item.Name]}
                                                                onChange={(e) => setValueObject({ ...ValueObject, [item.Name]: e.target.value })}
                                                            // onChange={(e) => console.log(e.target.value)}
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
                                                loading={isSubmitting}
                                            >
                                                Create
                                            </LoadingButton>
                                            <LoadingButton
                                                fullWidth
                                                color="secondary"
                                                size="large"
                                                endIcon={<RotateLeftIcon />}
                                                type="reset"
                                                variant="contained"
                                            >
                                                Reset
                                            </LoadingButton>
                                        </Stack>

                                    </Stack>
                                </Form>
                            </FormikProvider>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Page >
    );
}
