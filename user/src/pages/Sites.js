import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import {Card, Table, Stack, Button, Checkbox, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
import TextField from '@mui/material/TextField';
import SiteMore from './sitesbuttons'
import configData from "../config.json";
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import SelectSite from './SelectSite'

const TABLE_HEAD = [
  { id: 'siteurl', label: 'Site Url', alignRight: false },
  { id: 'siteurls', label: 'Site Urls', alignRight: false },
  { id: 'companyname', label: 'Company Name', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
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
    return filter(array, (_user) => _user.siteurl.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('siteurl');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [opensite, setopensite] = useState(false);
  const [siteurl, setsiteurl] = useState("");
  const [siteurls, setsiteurls] = useState("");
  const [sites, setsites] = useState([]);
  // eslint-disable-next-line
  const [isOpen, setIsOpen] = useState(false);

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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenSelect = (params) => {
    setopensite(true);
  }

  const handleClose = () => {
    setOpen(false);
    setopensite(false);
  };

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

  const siteDelete = (Id) => {
    dataProvider.delete("company_sites", { id: Id })
      .then(res => {
        console.log(res);
        alert("Success");
        setIsOpen(false)
        loadData();
      })
  }

  const siteEdit = (Id) => {

  }


  const save = (params) => {
    setOpen(false);
    dataProvider.create("company_sites", { data: { Url: siteurl, Urls: siteurls, CompanyId: JSON.parse(sessionStorage.CurrentCompany).id } })
      .then(res => {
        // console.log(res);
        loadData();
        alert("Site is added in the company")
      })
  }

  const loadData = (params) => {
    if (sessionStorage.CurrentCompany) {
      console.log(JSON.parse(sessionStorage.CurrentCompany).id)
      dataProvider.getList("company_sites", { pagination: { page: 1, perPage: 10 }, sort: { field: 'url', order: 'ASC' }, filter: { CompanyId: JSON.parse(sessionStorage.CurrentCompany).id } })
        .then(res => {
          console.log(res);
          const data = res.data;
          const res_data = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].CompanyId === JSON.parse(sessionStorage.CurrentCompany).id) {
              res_data.push({
                Id: data[i].id,
                siteurl: data[i].Url,
                siteurls: data[i].Urls,
                companyname: JSON.parse(sessionStorage.CurrentCompany).name,
                date: data[i].CreatedAt,
              })
            }
          }
          setsites(res_data);
          console.log(res_data);
        })
    }
    else {
      alert("Please Select Company")
    }
  }
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [])

  return (
    <Page title="Sites | Holest">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Sites
          </Typography>
          <Typography variant="h7" gutterBottom>
            Current Company : {sessionStorage.CurrentCompany ? JSON.parse(sessionStorage.CurrentCompany).name : "No selected"}
          </Typography>
          <Typography variant="h7" gutterBottom>
            Current Site : {sessionStorage.CurrentSite ? JSON.parse(sessionStorage.CurrentSite).name : "No selected"}
          </Typography>
          <Button
            variant="outlined"
            onClick={(e) => handleOpenSelect()}
            startIcon={<Icon icon={plusFill} />}
          >
            Select Site
          </Button>

          <Dialog open={opensite} onClose={handleClose} fullWidth={true} maxWidth="md">
            <DialogTitle>Please select Site</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <SelectSite sites={sites} />
              </DialogContentText>
            </DialogContent>
          </Dialog>

          <Button
            // variant="contained"
            variant="outlined"
            onClick={handleClickOpen}
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Site
          </Button>

          <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
            <DialogTitle>New Site</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please add sites in the Company
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Site url!"
                type="text"
                fullWidth
                variant="standard"
                value={siteurl}
                onChange={(e) => setsiteurl(e.target.value)}
              />

              <TextField
                autoFocus
                margin="dense"
                label="Site urls!"
                type="text"
                fullWidth
                variant="standard"
                value={siteurls}
                onChange={(e) => setsiteurls(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => save()}>Save</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
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
                      const { Id, siteurl, siteurls, companyname, date } = row;
                      const isItemSelected = selected.indexOf(siteurl) !== -1;

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
                              onChange={(event) => handleClick(event, siteurl)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Typography variant="subtitle2" noWrap>
                              {siteurl}
                            </Typography>
                          </TableCell>
                          <TableCell align="left">{siteurls}</TableCell>
                          <TableCell align="left">{companyname}</TableCell>
                          <TableCell align="left">{date}</TableCell>
                          <TableCell align="right">
                            <SiteMore Id={Id} siteDelete={siteDelete} siteEdit={siteEdit} />
                          </TableCell>
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