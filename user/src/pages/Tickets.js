import { Container, Grid, Stack, Tabs, Typography } from '@mui/material';
import Page from '../components/Page';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from 'react';
// eslint-disable-next-line
import FavoriteIcon from '@mui/icons-material/Favorite';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import configData from "../config.json";
import CreateTicket from "./CreateTicket";
import SelectSite from './SelectSite'
import { useTranslation } from 'react-i18next';

const actions = [
  { icon: <FileCopyIcon />, name: 'New' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

export default function EcommerceShop() {
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  const [TicketName, setTicketName] = useState("");
  const [TicketData, setTicketData] = useState(null);
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
  const MainUserId = JSON.parse(sessionStorage.AccessToken).UserId

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const newticket = (params) => {
    setOpen(true);
  }

  const saveticket = (params) => {
    dataProvider.create('tickets', { data: { UserId: MainUserId, CompanySiteId: null, CompanySitePaymentMethodId: null, AltEmail: JSON.parse(sessionStorage.UserData).Email, Title: TicketName } })
      .then(res => {
        setOpen(false);
        // setisTicket(true);
        load();
      })
      .catch(error => {
        console.log(error)
      })
  }

  const load = (params) => {
    dataProvider.getList('tickets', {
      pagination: { page: 1, perPage: 5 }, sort: { field: 'id', order: 'ASC' },
      filter: { UserId: MainUserId },
    })
      .then(res => {
        const res_data = res.data;
        let item = res_data.find(obj => obj.UserId === MainUserId && obj.Closed === false)
        if (item) {
          setTicketData(item);
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line
  }, [])

  return (
    <Page title=" Ticket | Holest">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" >
            {t("Ticket")}
          </Typography>
          <SelectSite reload={load} />
        </Stack>
        <Grid container>
          <Grid item xs={12} justifyContent="center">
            <Box sx={{ width: '100%', typography: 'body1', justifyContent: "center" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
                    <Tab icon={<AirplaneTicketIcon />} iconposition="start" style={{ width: "50%" }} label={t("New Ticket")} value="1" />
                    {/* <Tab icon={<FavoriteIcon />} iconposition="start" style={{ width: "50%" }} label={t("My Tickets")} value="2" /> */}
                  </Tabs>
                </Box>
                <TabPanel value="1">
                  {
                    TicketData ? <CreateTicket TicketData={TicketData} setTicketData={setTicketData} /> : <Box sx={{ height: 500, transform: 'translateZ(0px)', flexGrow: 1 }}>
                      <SpeedDial
                        ariaLabel="SpeedDial openIcon example"
                        color="secondary"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                      >
                        {actions.map((action) => (
                          <SpeedDialAction

                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={(e) => newticket()}
                          />
                        ))}
                      </SpeedDial>
                      <Dialog open={open} onClose={handleClose} >
                        <DialogTitle >New Ticket</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Please enter Ticket Subject.
                          </DialogContentText>
                          <TextField autoFocus margin="dense" onChange={(e) => setTicketName(e.target.value)} id="name" label="Ticket Name" type="type" fullWidth variant="standard" style={{ width: "500px" }} />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="secondary">Cancel</Button>
                          <Button onClick={(e) => saveticket()} color="secondary">Open</Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                  }
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
