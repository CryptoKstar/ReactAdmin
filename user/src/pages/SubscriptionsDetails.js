import { useEffect, useState } from 'react';
import Page from '../components/Page';
import { Container, Stack, Typography, CardActionArea, TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { useParams } from 'react-router';
export default function SubscriptionsDetails() {
    const params = useParams();
    const history = useHistory();
    // eslint-disable-next-line
    const [data, setdata] = useState([]);
    // eslint-disable-next-line
    const [UpdateId, setUpdateId] = useState("");
    const [Name, setName] = useState("");
    const [actions, setactions] = useState("");
    const [amount, setamount] = useState("");
    const [UID, setUID] = useState("");
    const [date, setdate] = useState("");

    const httpClient = (url, options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }
        const token = JSON.parse(sessionStorage.AccessToken).Token;
        options.headers.set('Authorization', `${token}`);
        return fetchUtils.fetchJson(url, options);
    };

    const dataProvider = jsonServerProvider(configData.API_URL + 'api', httpClient);
    const load = () => {
        const Id = params.id;
        dataProvider.getOne("company_site_subscriptions", { id: Id })
            .then(res => {
                const data = res.data;
                setUpdateId(data.id);
                setName(data.Name)
                setamount(data.Amount)
                setUID(data.Uid)
                setdate(data.FirstChargeAt)
                const action = JSON.parse(data.Data).actions
                setactions(action)
                setdata(data.Data)
            })
    }
    const back = (params) => {
        history.push('/subscriptions')
    }

    useEffect(() => {
        load()
        // eslint-disable-next-line
    }, [])
    return (
        <Page title="Subscriptions | Holest">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Subscriptions Details
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={(e) => back()}
                        startIcon={<Icon icon={plusFill} />}
                    >
                        Go Subscriptions
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
                                    disabled
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={5}>
                                    <TextField
                                        fullWidth
                                        label="Amount"
                                        value={amount}
                                        disabled
                                        onChange={(e) => setamount(e.target.value)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="UID"
                                        disabled
                                        value={UID}
                                        onChange={(e) => setUID(e.target.value)}
                                    />
                                </Stack>

                                <TextField
                                    fullWidth
                                    label="Date"
                                    value={date}
                                    disabled
                                    onChange={(e) => setdate(e.target.value)}
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={10} justifyContent="space-between">
                                    {
                                        actions === "" ? "" : (actions.map((item, key) => {
                                            // console.log(item.Action)
                                            return (
                                                <Button variant="contained" onClick={function add() { alert('Initiate CAPTURE') }} key={key}>{item.Caption}</Button>
                                            )
                                        }))
                                    }
                                </Stack>

                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Page>
    );
}
