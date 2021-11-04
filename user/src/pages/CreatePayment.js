// import { useState } from 'react';
import Page from '../components/Page';
import { Container, Button, Stack, Typography, CardActionArea, TextField, FormControl, InputLabel, Select, MenuItem, Input, Checkbox } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
// import axios from 'axios'
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SendIcon from '@mui/icons-material/Send';
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { useEffect } from 'react';
import { useState } from 'react';
// import { Editor, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
// import { CollectionsBookmarkRounded } from '@material-ui/icons';

export default function CreatePayment() {
    const history = useHistory();
    const [PaymentMethods, setPaymentMethods] = useState([]);
    const [SitePayment, setSitePayment] = useState({});
    const [Details, setDetails] = useState();
    // const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const handleChange = (event) => {
        const data = event.target.value;
        setDetails(JSON.parse(data.Data).parameters);
        console.log(JSON.parse(data.Data).parameters)
        setSitePayment(data);
    };
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(200, 'Too Long!')
            .required('Name is required'),
        address: Yup.string()
            .min(2, 'Too Short!')
            .max(200, 'Too Long!')
            .required('Address is required'),
        regnumber: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Reg Number required'),
        taxnumber: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Tax Number required'),
        country: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Country required'),
    });

    const httpClient = (url, options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }
        const token = JSON.parse(sessionStorage.AccessToken).Token;
        options.headers.set('Authorization', `${token}`);
        return fetchUtils.fetchJson(url, options);
    };

    const dataProvider = jsonServerProvider(configData.API_URL + 'api', httpClient);
    const MainUserId = JSON.parse(sessionStorage.AccessToken).UserId
    const formik = useFormik({
        initialValues: {
            name: '',
            taxnumber: '',
            address: '',
            regnumber: '',
            country: ''
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, e) => {
            dataProvider.create('companies', { data: { Name: values.name, Address: values.address, Country: values.country, TaxNo: values.taxnumber, RegNo: values.regnumber, MainUserId: MainUserId } })
                .then(response => {
                    dataProvider.create('user_companies', { data: { UserId: MainUserId, CompanyId: response.data.id, Role: "admin" } })
                        .then(response => {
                            history.push('/company')
                        })
                        .catch(error => {
                            console.log(error)
                        });
                })
                .catch(error => {
                    console.log(error)
                });
        }
    });

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
            })
    }

    useEffect(() => {
        load()
        // eslint-disable-next-line
    }, [])
    const { errors, touched, isSubmitting, handleSubmit } = formik;
    return (
        <Page title="Company | Holest">
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
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        {
                                            Details ? Details.map((item, key) => {
                                                console.log(item)
                                                if (item.Type === "Text") {
                                                    return (
                                                        <TextField
                                                            key={key}
                                                            fullWidth
                                                            label={item.Name}
                                                            defaultValue={item.Default}
                                                            error={Boolean(touched.name && errors.name)}
                                                            helperText={touched.name && errors.name}
                                                        />
                                                    )
                                                }
                                                else if (item.Type === "WYSIWYG") {
                                                    return (
                                                        <Editor
                                                            key={key}
                                                            toolbarOnFocus
                                                            wrapperClassName="wrapper-class"
                                                            editorClassName="editor-class"
                                                            toolbarClassName="toolbar-class"
                                                            toolbar={{
                                                                inline: { inDropdown: true },
                                                                list: { inDropdown: true },
                                                                textAlign: { inDropdown: true },
                                                                link: { inDropdown: true },
                                                                history: { inDropdown: true },
                                                            }}
                                                        />
                                                    )
                                                }
                                                else if (item.Type === "Upload") {
                                                    return (
                                                        <label key={key} htmlFor="contained-button-file">
                                                            <Input accept="image/*" id="contained-button-file" multiple type="file" style={{ display: "none" }} />
                                                            <Button variant="contained" color="secondary" component="span" size="large" fullWidth>
                                                                Upload
                                                            </Button>
                                                        </label>
                                                    )
                                                }
                                                else if (item.Type === "RADIO") {
                                                    return (
                                                        <FormControl component="fieldset" key={key}>
                                                            <FormLabel component="legend" color="secondary">{item.Name}</FormLabel>
                                                            <RadioGroup row aria-label="gender" defaultValue={item.Default} name="row-radio-buttons-group">
                                                                {
                                                                    item.Options.map((sub_item, sub_key) => {
                                                                        return (
                                                                            <FormControlLabel value={Object.values(sub_item)[0]} key={sub_key} control={<Radio color="secondary" />} label={Object.values(sub_item)[0]} />

                                                                        )
                                                                    })
                                                                }
                                                            </RadioGroup>
                                                        </FormControl>
                                                    )
                                                }
                                                else if (item.Type === "Checkbox") {
                                                    return (
                                                        <FormControlLabel key={key} control={<Checkbox color="secondary" defaultChecked={item.Default} />} label={item.Name} />
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
                                                                onChange={(e) => console.log(e.target.value)}
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
