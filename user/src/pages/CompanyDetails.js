import { useEffect, useState } from 'react';
import Page from '../components/Page';
import { Container, Stack, Typography, CardActionArea, TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { LoadingButton } from '@mui/lab';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SendIcon from '@mui/icons-material/Send';
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import querystring from "query-string"
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
        console.log(querystring.parse(history.location.search))
        const query = querystring.parse(history.location.search);
        const Id = query.id;
        dataProvider.getOne('companies', { id: Id })
            .then(response => {
                console.log(response.data);
                setdetails(response.data);
                const item = response.data;
                setUpdateId(item.id)
                setName(item.Name)
                setCountry(item.Name)
                setAddress(item.Address)
                setReg(item.RegNo)
                setTax(item.TaxNo)
            })
            .catch(error => {
                console.log(error)
            });
    }

    const Update = (params) => {
        console.log(Name);
        dataProvider.update('companies', { id: UpdateId, data: { Name: Name, Address: Address, RegNo: Reg, TaxNo: Tax } })
            .then(response => {
                console.log(response.data);
                alert("Success")
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
                console.log(response);
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
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Company Details
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={(e) => back()}
                        startIcon={<Icon icon={plusFill} />}
                    >
                        Go Company
                    </Button>
                </Stack>
            </Container>
            <Grid container justifyContent="center">
                <Grid xs={9}>
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
                                        endIcon={<SendIcon />}
                                        variant="outlined"
                                        onClick={(e) => Update()}
                                    >
                                        Update
                                    </LoadingButton>
                                    <LoadingButton
                                        fullWidth
                                        color="secondary"
                                        size="large"
                                        endIcon={<RotateLeftIcon />}
                                        type="reset"
                                        variant="outlined"
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
