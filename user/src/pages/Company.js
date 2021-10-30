import { forwardRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Page from '../components/Page';
import { ProductSort } from '../components/_dashboard/products';
import { Button, Container, Stack, Typography, CardActions } from '@mui/material';
import { useHistory } from 'react-router-dom';
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Label from '../components/Label';
import SelecetCompany from './SelecetCompany';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
  const [AlertMessage, setAlertMessage] = useState("success");
  const [AlertType, setAlertType] = useState("success");
  const [AlertOpen, setAlertOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const AlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const details = (item) => {
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
          setAlertMessage("Please create New Company");
          setAlertType("info");
          setAlertOpen(true);
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
      <Snackbar open={AlertOpen} autoHideDuration={6000} anchorOrigin = {{vertical : "top", horizontal : "right"}} onClose={AlertClose}>
        <Alert onClose={AlertClose} severity={AlertType}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Company
          </Typography>
          <Typography variant="h5" gutterBottom>
            Current Company : {sessionStorage.CurrentCompany ? JSON.parse(sessionStorage.CurrentCompany).name : "No selected"}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={(e) => dialogCompany()}
            startIcon={<CheckBoxIcon />}
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
            startIcon={<AddTaskIcon />}
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
            <ProductSort />
          </Stack>
        </Stack>
        <Grid container spacing={2}>

          {
            Companydata.map((subitem, key) => (
              <Grid item xs={4} paddingRight={2} paddingBottom={5} key={key}>
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

                    <CardMedia
                      component="img"
                      height="200"
                      image="/static/default.png"
                      alt="Paella dish"
                      onClick={(e) => details(subitem)}
                    />
                    <CardContent>
                      <Typography variant="h3" style={{ justifyContent: "center", display: "flex" }} color="text.secondary">
                        {subitem.Name}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites" onClick={(e) => details(subitem)}>
                        <RemoveRedEyeIcon />
                      </IconButton>
                      <IconButton aria-label="share" onClick={(e) => ItemDelete(subitem.Id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Label variant="ghost" color={'success'}>Address</Label>
                          <Label variant="ghost" color={'success'}>{subitem.Address}</Label>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Label variant="ghost" color={'error'}>RegNo</Label>
                          <Label variant="ghost" color={'error'}>{subitem.RegNo}</Label>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Label variant="ghost" color={'info'}>TaxNo</Label>
                          <Label variant="ghost" color={'info'}>{subitem.TaxNo}</Label>
                        </Typography>
                      </CardContent>
                    </Collapse>
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
