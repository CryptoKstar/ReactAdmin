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
// import querystring from "query-string";
import { useParams } from 'react-router';

export default function SiteDetails() {
    const history = useHistory();
    // eslint-disable-next-line
    const params = useParams();
    // eslint-disable-next-line
    const [details, setdetails] = useState([]);
    const [UpdateId, setUpdateId] = useState("");
    const [Url, setUrl] = useState("");
    const [Urls, setUrls] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    // eslint-disable-next-line
    const [Date, setDate] = useState("");
    const [SiteKey, setSiteKey] = useState("");
    const token = JSON.parse(sessionStorage.AccessToken).Token;

    const httpClient = (url, options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }
        options.headers.set('Authorization', `${token}`);
        return fetchUtils.fetchJson(url, options);
    };

    const dataProvider = jsonServerProvider(configData.API_URL + 'api', httpClient);
    const load = () => {
        const Id = params.id;
        dataProvider.getOne('company_sites', { id: Id })
            .then(response => {
                setdetails(response.data);
                const item = response.data;
                setUpdateId(item.id)
                setUrl(item.Url)
                setUrls(item.Urls)
                setCompanyName(JSON.parse(sessionStorage.CurrentCompany).name)
                setDate(item.date)
                dataProvider.getList("company_site_create", {
                    pagination: { page: 1, perPage: 5 },
                    sort: { field: 'id', order: 'ASC' },
                    filter: { CompanySiteId: Id },
                })
                    .then(res => {
                        const data = res.data;
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].CompanySiteId === item.id) {
                                setSiteKey(data[i].Token);
                            }
                        }
                    })
                    .catch(err => {

                    })
            })
            .catch(error => {
                console.log(error)
            });
    }

    const Update = (params) => {
        dataProvider.update('company_sites', { id: UpdateId, data: { Url: Url, Urls: Urls, CompanyId: JSON.parse(sessionStorage.CurrentCompany).id } })
            .then(response => {
                alert("Success")
            })
            .catch(error => {
                console.log(error)
            });
    }

    const ItemDelete = () => {
        dataProvider.delete('company_sites', {
            id: UpdateId
        })
            .then(response => {
                history.push('/sites')
            })
            .catch(error => {
                console.log(error)
            });

    }

    const back = (params) => {
        history.push('/sites')
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
                        Go Sites
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
                                    value={CompanyName}
                                    disabled
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={5}>
                                    <TextField
                                        fullWidth
                                        label="Site Url"
                                        value={Url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Site Urls"
                                        value={Urls}
                                        onChange={(e) => setUrls(e.target.value)}
                                    />
                                </Stack>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={5}>
                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Site Secret"
                                        value={token}
                                    />

                                    <TextField
                                        disabled
                                        fullWidth
                                        label="Site Key"
                                        value={SiteKey}
                                    />
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        endIcon={<SendIcon />}
                                        variant="outlined"
                                        onClick={(e) => Update()}
                                    >
                                        ReGenerate
                                    </LoadingButton>
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
