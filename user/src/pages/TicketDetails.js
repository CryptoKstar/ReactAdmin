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
import { useTranslation } from 'react-i18next';

export default function TicketDetails() {
    const params = useParams();
    const history = useHistory();
    const [details, setdetails] = useState("");
    const [Title, setTitle] = useState("");
    const [date, setdate] = useState("");
    const { t } = useTranslation();

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
        dataProvider.getOne("tickets", { id: Id })
            .then(res => {
                const data = res.data;
                setTitle(data.Title);
                setdate(data.CreatedAt)
                dataProvider.getList("ticket_entry", { pagination: { page: 1, perPage: 10 }, sort: { field: 'url', order: 'ASC' }, filter: { TicketId: data.id } })
                    .then(res => {
                        const rdata = res.data;
                        for (var i = 0; i < rdata.length; i++) {
                            if (rdata[i].TicketId === data.id) {
                                setdetails(rdata[i].Content)
                            }
                        }
                    })
            })

    }
    const back = (params) => {
        history.push('/tickets')
    }

    useEffect(() => {
        load()
        // eslint-disable-next-line
    }, [])
    return (
        <Page title="Ticket | Holest">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {t("Ticket Details")}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={(e) => back()}
                        startIcon={<Icon icon={plusFill} />}
                    >
                        {t("Go Tickets")}
                    </Button>
                </Stack>
            </Container>
            <Grid container justifyContent="center">
                <Grid item xs={9}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {t("Details")}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardContent>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label={t("User Email")}
                                    value={JSON.parse(sessionStorage.UserData).Email}
                                    disabled
                                />
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} >
                                    <TextField
                                        fullWidth
                                        label={t("Ticket Title")}
                                        value={Title}
                                        disabled
                                    />
                                </Stack>

                                <TextField
                                    fullWidth
                                    label="Date"
                                    value={date}
                                    disabled
                                />

                                <TextField
                                    fullWidth
                                    label="TIcket Details"
                                    multiline
                                    disabled
                                    rows={6}
                                    value={details}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Page>
    );
}
