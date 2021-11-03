import { Container, Stack, Typography, Button } from '@mui/material';
import Page from '../components/Page';
import Iframe from 'react-iframe'
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import configData from "../config.json";
import { useEffect, useState } from 'react';
import SelectSite from './SelectSite'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DashboardApp() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
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
  const MainUserId = JSON.parse(sessionStorage.AccessToken).UserId

  const loadData = (param) => {
    dataProvider.getList('companies', {
      pagination: { page: 1, perPage: 5 },
      sort: { field: 'name', order: 'ASC' },
      filter: { MainUserId: MainUserId }
    })
      .then(response => {
        const data = response.data;
        if (data.length === 0) {
          setOpen(true);
        }
      })
      .catch(error => {
        console.log(error)
      });
  }
  useEffect(() => {
    loadData("defalut");
    // eslint-disable-next-line  
  }, [])

  return (
    <Page title="Dashboard | Minimal-UI">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Welcome!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have no company for now. So please create New Company
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" color="secondary" onClick={handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">DashBoard</Typography>
          <SelectSite reload={loadData} />
        </Stack>
        <Iframe height="100%" overflow="hidden" frameBorder="0" url="./static/DashBoard.html" />
      </Container>
    </Page>
  );
}
