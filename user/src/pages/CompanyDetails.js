import { forwardRef, useEffect, useState } from 'react';
import Page from '../components/Page';
import { Container, Stack, Typography, CardActionArea, TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { LoadingButton } from '@mui/lab';
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import querystring from "query-string"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CompanyDetails() {
    const history = useHistory();
    // eslint-disable-next-line
    const [details, setdetails] = useState([]);
    const [UpdateId, setUpdateId] = useState("");
    const [Name, setName] = useState("");
    const [Country, setCountry] = useState("");
    const [Address, setAddress] = useState("");
    const [Reg, setReg] = useState("");
    const [Tax, setTax] = useState("");

    const [AlertMessage, setAlertMessage] = useState("success");
    const [AlertType, setAlertType] = useState("success");
    const [AlertOpen, setAlertOpen] = useState(false);

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
    const load = (params) => {
        const query = querystring.parse(history.location.search);
        const Id = query.id;
        dataProvider.getOne('companies', { id: Id })
            .then(response => {
                setdetails(response.data);
                const item = response.data;
                setUpdateId(item.id)
                setName(item.Name)
                setCountry(item.Country)
                setAddress(item.Address)
                setReg(item.RegNo)
                setTax(item.TaxNo)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const Update = (params) => {
        dataProvider.update('companies', { id: UpdateId, data: { Name: Name, Address: Address, Country: Country, RegNo: Reg, TaxNo: Tax } })
            .then(response => {
                setAlertMessage("Selected Item was Updated!");
                setAlertType("success");
                setAlertOpen(true);
            })
            .catch(error => {
                console.log(error)
            });
    }

    const ItemDelete = () => {
        dataProvider.delete('companies', {
            id: UpdateId
        })
            .then(response => {
                history.push('/company')
            })
            .catch(error => {
                console.log(error)
            });

    }

    const back = (params) => {
        history.push('/company')
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
                        Company Details
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={(e) => back()}
                        startIcon={<ExitToAppIcon />}
                        color="secondary"
                    >
                        Go Company
                    </Button>
                </Stack>
            </Container>
            <Grid container justifyContent="center">
                <Grid item xs={9}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Details
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardContent>
                            {/* <FormikProvider value={formik}>
                                <Form autoComplete="off" noValidate onSubmit={handleSubmit}> */}
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Company Name"
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={5}>
                                    <TextField
                                        fullWidth
                                        label="Conutry"
                                        value={Country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        value={Address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </Stack>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={5}>
                                    <TextField
                                        fullWidth
                                        label="Reg Number"
                                        value={Reg}
                                        onChange={(e) => setReg(e.target.value)}
                                    />

                                    <TextField
                                        fullWidth
                                        label="Tax Number"
                                        value={Tax}
                                        onChange={(e) => setTax(e.target.value)}
                                    />
                                </Stack>


                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={10}>
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        endIcon={<SystemUpdateAltIcon />}
                                        variant="contained"
                                        onClick={(e) => Update()}
                                        color="secondary"
                                    >
                                        Update
                                    </LoadingButton>
                                    <LoadingButton
                                        fullWidth
                                        color="secondary"
                                        size="large"
                                        endIcon={<DeleteForeverIcon />}
                                        type="reset"
                                        variant="contained"
                                        onClick={(e) => ItemDelete()}
                                    >
                                        Delete
                                    </LoadingButton>
                                </Stack>

                            </Stack>
                            {/* </Form>
                            </FormikProvider> */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Page>
    );
}
