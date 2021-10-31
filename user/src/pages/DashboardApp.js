import { Box, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import Iframe from 'react-iframe'
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import configData from "../config.json";
import { forwardRef, useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function DashboardApp() {
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
          setAlertMessage("Please create New Company");
          setAlertType("info");
          setAlertOpen(true);
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
      <Snackbar open={AlertOpen} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={AlertClose}>
        <Alert onClose={AlertClose} severity={AlertType}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">DashBoard</Typography>
        </Box>
        <Iframe height="100%" overflow="hidden" frameBorder="0" url="./static/DashBoard.html" />
      </Container>
    </Page>
  );
}
