// import { useState } from 'react';
import Page from '../components/Page';
import { Container, Stack, Typography, CardActionArea, TextField } from '@mui/material';
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

export default function CreatePayment() {
    const history = useHistory();
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
            dataProvider.create('companies', { data: { Name: values.name, Address: values.address, Country : values.country, TaxNo: values.taxnumber, RegNo: values.regnumber, MainUserId: MainUserId } })
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

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;
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
                <Grid xs={8}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    New Post
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardContent>
                            <FormikProvider value={formik}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        <TextField
                                            fullWidth
                                            label="Company Name"
                                            {...getFieldProps('name')}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={5}>
                                            <TextField
                                                fullWidth
                                                label="Conutry"
                                                {...getFieldProps('country')}
                                                error={Boolean(touched.country && errors.country)}
                                                helperText={touched.country && errors.country}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Address"
                                                {...getFieldProps('address')}
                                                error={Boolean(touched.address && errors.address)}
                                                helperText={touched.address && errors.address}
                                            />
                                        </Stack>
                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={5}>
                                            <TextField
                                                fullWidth
                                                label="Reg Number"
                                                {...getFieldProps('regnumber')}
                                                error={Boolean(touched.regnumber && errors.regnumber)}
                                                helperText={touched.regnumber && errors.regnumber}
                                            />

                                            <TextField
                                                fullWidth
                                                label="Tax Number"
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
        </Page>
    );
}
