import { filter } from 'lodash';
import { forwardRef, useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Card, Button, Table, Stack, Checkbox, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination } from '@mui/material';
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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'uid', label: 'UID', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
];

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sites, setsites] = useState([]);
  // eslint-disable-next-line
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
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
  // const MainUserId = JSON.parse(sessionStorage.AccessToken).UserId

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = sites.map((n) => n.siteurl);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, siteurl) => {
    const selectedIndex = selected.indexOf(siteurl);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, siteurl);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sites.length) : 0;

  const filteredUsers = applySortFilter(sites, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const siteEdit = (Id) => {
    const url = `/subscriptionsdetails/${Id}`;
    history.push(url);
  }

  const createpayment = (params) => {
    history.push('/newpayment');
  }
  
  const loadData = (params) => {
    if (sessionStorage.CurrentCompany) {
      dataProvider.getList("company_site_subscriptions", { pagination: { page: 1, perPage: 10 }, sort: { field: 'id', order: 'ASC' }, filter: { CompanySiteId: 1 } })
        .then(res => {
          const data = res.data;
          const res_data = [];
          for (let i = 0; i < data.length; i++) {
            res_data.push({
              Id: data[i].id,
              name: data[i].Name,
              amount: data[i].Amount,
              UID: data[i].Uid,
              date: data[i].FirstChargeAt,
            })
          }
          setsites(res_data);
        })
    }
    else {
      setAlertMessage("Please Select Company");
      setAlertType("error");
      setAlertOpen(true);

    }
  }
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [])

  return (
    <Page title="Sites | Holest">

      <Snackbar open={AlertOpen} autoHideDuration={6000} onClose={AlertClose}>
        <Alert onClose={AlertClose} severity={AlertType} sx={{ width: '100%' }}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Payment Methods
          </Typography>
          <Button
            variant="outlined"
            onClick={(e) => createpayment()}
            startIcon={<Icon icon={plusFill} />}
          >
            Create PaymentMethod
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
                  rowCount={sites.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, key) => {
                      const { Id, name, amount, UID, date } = row;
                      const isItemSelected = selected.indexOf(Id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={key}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}

                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, Id)}
                            />
                          </TableCell>
                          <TableCell onClick={(e) => siteEdit(Id)} component="th" scope="row">
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </TableCell>
                          <TableCell onClick={(e) => siteEdit(Id)} align="left">{amount}</TableCell>
                          <TableCell align="left" onClick={(e) => siteEdit(Id)}> {UID}</TableCell>
                          <TableCell align="left" onClick={(e) => siteEdit(Id)}>{date}</TableCell>
                          {/* <TableCell align="right">
                            <SiteMore Id={Id} siteEdit={siteEdit} />
                          </TableCell> */}
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sites.length}
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