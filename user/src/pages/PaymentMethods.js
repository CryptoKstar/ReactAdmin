import { filter } from 'lodash';
import { forwardRef, useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Card, Button, Table, Stack, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination } from '@mui/material';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Icon } from '@iconify/react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SelectSite from './SelectSite'
import { useTranslation } from 'react-i18next';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  // eslint-disable-next-line
  const [sitepaymentmethods, setsitepaymentmethods] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  // eslint-disable-next-line
  const history = useHistory();
  const [AlertMessage, setAlertMessage] = useState("success");
  const [AlertType, setAlertType] = useState("success");
  const [AlertOpen, setAlertOpen] = useState(false);
  const { t } = useTranslation();

  const TABLE_HEAD = [
    { id: 'name', label: t('Payment Method Name'), alignRight: false },
    { id: 'date', label: t('Date'), alignRight: false },
    { id: 'action', label: t('Action'), alignRight: false },
  ];

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = sitepaymentmethods.map((n) => n.siteurl);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sitepaymentmethods.length) : 0;

  const filteredUsers = applySortFilter(sitepaymentmethods, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const siteEdit = (Id) => {
    const url = `/paymentdetails/${Id}`;
    history.push(url);
  }

  const createpayment = (params) => {
    history.push('newpayment')
  }


  const paymentMethodsDelete = (id) => {
    dataProvider.delete('company_site_payment_methods', { id: id })
      .then(res => {
        setAlertMessage(t("Selected Payment method is deleted correctly"));
        setAlertType("success");
        setAlertOpen(true);
        loadData();
      })
      .catch(error => {
        console.log(error)
      })
  }

  const loadData = (params) => {
    if (sessionStorage.CurrentCompany) {
      let payment_methods = [];
      dataProvider.getList("payment_methods", { pagination: { page: 1, perPage: 10 }, sort: { field: 'id', order: 'ASC' }, filter: {} })
        .then(res => {
          payment_methods = res.data;
          const methods = [];
          for (let i = 0; i < payment_methods.length; i++) {
            methods.push({
              label: payment_methods[i].Name,
              value: payment_methods[i].id,
              data: payment_methods[i],
            })
          }
          dataProvider.getList('company_site_payment_methods', { pagination: { page: 1, perPage: 10 }, sort: { field: 'id', order: 'ASC' }, filter: {} })
            .then(res => {
              const data = res.data;
              const res_data = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].CompanySiteId === JSON.parse(sessionStorage.CurrentSite).id) {
                  res_data.push({
                    id: data[i].id,
                    name: payment_methods[data[i].PaymentMethodId - 1].Name,
                    data: data[i].Data,
                    date: data[i].UpdatedAt,
                    PaymentMethodsId: data[i].PaymentMethodId,
                  })
                }
              }
              setsitepaymentmethods(res_data);
            })
            .catch(error => {
              console.log(error)
            })
        })
    }
    else {
      setAlertMessage(t("Please Select Sites"));
      setAlertType("error");
      setAlertOpen(true);

    }
  }
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [])

  return (
    <Page title="Payment Methods | Holest">

      <Snackbar open={AlertOpen} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={AlertClose}>
        <Alert onClose={AlertClose} severity={AlertType} sx={{ width: '100%' }}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {t("Payment Methods")}
          </Typography>
          <SelectSite reload={loadData} />
          <Button
            variant="contained"
            onClick={(e) => createpayment()}
            startIcon={<Icon icon={plusFill} />}
            color="secondary"
          >
            {t("Add PaymentMethod")}
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={sitepaymentmethods.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, key) => {
                      // eslint-disable-next-line
                      const { id, name, data, date } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;
                      return (
                        <TableRow
                          hover
                          key={key}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}

                        >
                          <TableCell onClick={(e) => siteEdit(id)} component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </TableCell>
                          <TableCell align="left" onClick={(e) => siteEdit(id)}>{date}</TableCell>
                          <TableCell align="left" ><DeleteForeverIcon onClick={(e) => paymentMethodsDelete(id)} /></TableCell>

                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={sitepaymentmethods.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
