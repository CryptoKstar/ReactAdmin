import Page from '../components/Page';
import { Container, Stack, Button, Typography, CardActionArea, TextField, FormControl, Input } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { LoadingButton } from '@mui/lab';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SendIcon from '@mui/icons-material/Send';
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import axios from 'axios';
export default function CreateCompany() {
    const history = useHistory();
    const { t } = useTranslation();
    const [files, setFiles] = useState("");
    const RegisterSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, t('Too Short!'))
            .max(200, t('Too Long!'))
            .required(t('Name is required')),
        address: Yup.string()
            .min(2, t('Too Short!'))
            .max(200, t('Too Long!'))
            .required(t('Address is required')),
        regnumber: Yup.string().min(2, t('Too Short!')).max(15, t('Too Long!')).required(t('Reg Number required')),
        taxnumber: Yup.string().min(2, t('Too Short!')).max(15, t('Too Long!')).required(t('Tax Number required')),
        country: Yup.string().min(2, t('Too Short!')).max(15, t('Too Long!')).required(t('Country required')),
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
            file: '',
            taxnumber: '',
            address: '',
            regnumber: '',
            country: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, e) => {
            if (files === "") {
                alert("Please select Logo file.");
                return;
            }
            else {
                const data = new FormData();
                data.append('file', files);
                await axios.post(configData.API_URL + "upload", data, {})
                    .then(res => {
                        dataProvider.create('companies', { data: { Name: values.name, File: res.data.filename, Address: values.address, Country: values.country, TaxNo: values.taxnumber, RegNo: values.regnumber, MainUserId: MainUserId } })
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
                    })
            }

        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
    return (
        <Page title="Company | Holest">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {t("New Company")}
                    </Typography>
                </Stack>
            </Container>
            <Grid container justifyContent="center">
                <Grid item xs={8}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {t("Company")}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardContent>
                            <FormikProvider value={formik}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        <TextField
                                            fullWidth
                                            label={t("Company Name")}
                                            {...getFieldProps('name')}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                        <FormControl >
                                            <label htmlFor="contained-button-file">
                                                <Input accept="image/*" id="contained-button-file" onChange={(e) => setFiles(e.target.files[0])} multiple type="file" style={{ display: "none" }} />
                                                <Button variant="contained" color="secondary" component="span" size="large" fullWidth>
                                                    {t("Logo Upload")}
                                                </Button>
                                            </label>
                                        </FormControl>
                                        {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={5}> */}
                                        <TextField
                                            fullWidth
                                            label={t("Conutry")}
                                            {...getFieldProps('country')}
                                            error={Boolean(touched.country && errors.country)}
                                            helperText={touched.country && errors.country}
                                        />
                                        <TextField
                                            fullWidth
                                            label={t("Address")}
                                            {...getFieldProps('address')}
                                            error={Boolean(touched.address && errors.address)}
                                            helperText={touched.address && errors.address}
                                        />
                                        {/* </Stack> */}
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={5}>
                                            <TextField
                                                fullWidth
                                                label={t("ResNo")}
                                                {...getFieldProps('regnumber')}
                                                error={Boolean(touched.regnumber && errors.regnumber)}
                                                helperText={touched.regnumber && errors.regnumber}
                                            />

                                            <TextField
                                                fullWidth
                                                label={t("TaxNo")}
                                                {...getFieldProps('taxnumber')}
                                                error={Boolean(touched.taxnumber && errors.taxnumber)}
                                                helperText={touched.taxnumber && errors.taxnumber}
                                            />
                                        </Stack>


                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={10}>
                                            <LoadingButton
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                endIcon={<SendIcon />}
                                                variant="contained"
                                                loading={isSubmitting}
                                            >
                                                {t("Create")}
                                            </LoadingButton>
                                            <LoadingButton
                                                fullWidth
                                                color="secondary"
                                                size="large"
                                                endIcon={<RotateLeftIcon />}
                                                type="reset"
                                                variant="contained"
                                            >
                                                {t("Reset")}
                                            </LoadingButton>
                                        </Stack>

                                    </Stack>
                                </Form>
                            </FormikProvider>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Page>
    );
}
