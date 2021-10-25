import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Icon } from '@iconify/react';
import Page from '../components/Page';
import plusFill from '@iconify/icons-eva/plus-fill';
import { ProductSort } from '../components/_dashboard/products';
import { Button, Container, Stack, Typography, CardActionArea, CardActions } from '@mui/material';
import { useHistory } from 'react-router-dom';
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Label from '../components/Label';
import SelecetCompany from './SelecetCompany';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EcommerceShop() {
  // eslint-disable-next-line
  const [openFilter, setOpenFilter] = useState(false);
  const [Companydata, setCompanydata] = useState([]);
  const History = useHistory();
  // eslint-disable-next-line
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [open_select, setOpenSelect] = useState(false);
  const [opencompany, setopencompany] = useState(false);
  const details = (item) => {
    console.log(item);
    History.push(`/companydetails?id=${item.Id}`);
  }

  const handleOpenSelect = (item) => {
    setOpenSelect(true);
  }

  const dialogCompany = (params) => {
    setopencompany(true);
  }


  const handleClose = () => {
    setOpen(false)
    setOpenSelect(false)
    setopencompany(false);
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

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });
  // eslint-disable-next-line
  const { resetForm, handleSubmit } = formik;
  const NewCompany = (params) => {
    History.push('/newcompany');
  }

  const ItemDelete = (ID) => {
    dataProvider.delete('companies', {
      id: ID
    })
      .then(response => {
        console.log(response);
        loadData("delete");
      })
      .catch(error => {
        console.log(error)
      });

  }

  const loadData = (param) => {
    const res_data = [];
    dataProvider.getList('companies', {
      pagination: { page: 1, perPage: 5 },
      sort: { field: 'name', order: 'ASC' },
      filter: { MainUserId: MainUserId }
    })
      .then(response => {
        console.log(response);
        const data = response.data;
        for (let i = 0; i < data.length; i++) {
          res_data.push({
            Id: data[i].id,
            Name: data[i].Name,
            RegNo: data[i].RegNo,
            TaxNo: data[i].TaxNo,
            Address: data[i].Address
          })
        }
        if (res_data.length === 0) {
          alert("Please create New Company")
        }
        else if (param === "delete") {
          sessionStorage.CurrentCompany = JSON.stringify({ id: res_data[0].Id, name: res_data[0].Name })
        }
        else if (res_data.length === 1) {
          sessionStorage.CurrentCompany = JSON.stringify({ id: res_data[0].Id, name: res_data[0].Name })
        }
        setCompanydata(res_data)
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
    <Page title="Company | Holest">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Company
          </Typography>
          <Typography variant="h5" gutterBottom>
            Current Company : {sessionStorage.CurrentCompany ? JSON.parse(sessionStorage.CurrentCompany).name : "No selected"}
          </Typography>

          <Button
            variant="outlined"
            onClick={(e) => dialogCompany()}
            startIcon={<Icon icon={plusFill} />}
          >
            Select Company
          </Button>

          <Dialog open={opencompany} onClose={handleClose} fullWidth={true} maxWidth="md">
            <DialogTitle>Please select Company</DialogTitle>
            <DialogContent>
              <SelecetCompany USERLIST={Companydata} handleOpenSelect={handleOpenSelect} />
            </DialogContent>
          </Dialog>

          <Button
            variant="contained"
            onClick={(e) => NewCompany(e)}
            startIcon={<Icon icon={plusFill} />}
          >
            New Company
          </Button>

        </Stack>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}
            <ProductSort />
          </Stack>
        </Stack>
        {/* <CustomCompany products={Companydata} /> */}
        <Grid container spacing={2}>

          {
            Companydata.map((item, key) => (
              <Grid xs={4} paddingRight={2} paddingBottom={5} key={key}>
                <Box sx={{ position: 'relative' }}>
                  <Label
                    variant="filled"
                    color={'info'}
                    sx={{
                      zIndex: 9,
                      top: 16,
                      right: 16,
                      position: 'absolute',
                      textTransform: 'uppercase'
                    }}
                  >
                    Company
                  </Label>

                  <Card>
                    <CardActionArea onClick={(e) => details(item)}>
                      <CardMedia
                        component="img"
                        height="200"
                        image="/static/default.png"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" >
                          {item.Name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Label variant="ghost" color={'success'}>Address</Label>
                          <Label variant="ghost" color={'success'}>{item.Address}</Label>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Label variant="ghost" color={'error'}>RegNo</Label>
                          <Label variant="ghost" color={'error'}>{item.RegNo}</Label>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Label variant="ghost" color={'info'}>TaxNo</Label>
                          <Label variant="ghost" color={'info'}>{item.TaxNo}</Label>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button size="small" color="primary" onClick={(e) => details(item)}>
                        Manage
                      </Button>
                      <Button size="small" color="primary" onClick={(e) => ItemDelete(item.Id)}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Page>
  );
}
