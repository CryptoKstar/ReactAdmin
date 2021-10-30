import Page from '../components/Page';
import { Stack, Typography, CardActionArea, TextField } from '@mui/material';
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
import { useEffect, useState } from 'react';

export default function CreateTicket({ TicketData }) {
    const history = useHistory();
    const [ticketdata, setticketdata] = useState([]);
    const RegisterSchema = Yup.object().shape({
        details: Yup.string().min(2, 'Too Short!').max(500, 'Too Long!').required('Country required'),
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
    const Email = JSON.parse(sessionStorage.UserData).Email
    const formik = useFormik({
        initialValues: {
            details: ""
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, e) => {
            dataProvider.create('ticket_entry', { data: { TicketId: ticketdata.id, WriterId: null, Content: values.details } })
                .then(response => {
                    dataProvider.update('tickets', { id: ticketdata.id, data: { Closed: true } })
                        .then(response => {
                            history.push('/tickets')
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

    const load = (params) => {
        setticketdata(TicketData)
    }

    useEffect(() => {
        load()
        // eslint-disable-next-line
    }, [])
    return (
        <Page title="Company | Holest">
            {/* <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        New Company
                    </Typography>
                </Stack>
            </Container> */}
            <Grid container justifyContent="center">
                <Grid item xs={12}>
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
                                            label="Ticket Name"
                                            value={ticketdata.Title ? ticketdata.Title : ""}
                                            disabled
                                        />

                                        <TextField
                                            fullWidth
                                            label="User Email"
                                            value={Email}
                                            disabled
                                        />

                                        <TextField
                                            fullWidth
                                            label="TIcket Details"
                                            multiline
                                            rows={6}
                                            {...getFieldProps('details')}
                                            error={Boolean(touched.details && errors.details)}
                                            helperText={touched.details && errors.details}
                                        />

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
