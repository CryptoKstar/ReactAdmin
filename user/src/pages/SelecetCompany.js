import { filter } from 'lodash';
import { forwardRef, useState } from 'react';
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, CompanyTool } from '../components/_dashboard/user';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import configData from "../config.json";
import { useEffect } from 'react';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const TABLE_HEAD = [
  { id: 'Id', label: 'ID', alignRight: false },
  { id: 'Name', label: 'Company Name', alignRight: false },
  { id: 'RegNo', label: 'ResNo', alignRight: false },
  { id: 'TaxNo', label: 'TaxNo', alignRight: false },
  { id: 'Address', label: 'Address', alignRight: false },
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
    return filter(array, (_user) => _user.Name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function SelecetCompany({ handleOpenSelect, load }) {
  // eslint-disable-next-line
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('Name');
  const [filterName, setFilterName] = useState('');
  // eslint-disable-next-line
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const [AlertMessage, setAlertMessage] = useState("success");
  const [AlertType, setAlertType] = useState("success");
  const [AlertOpen, setAlertOpen] = useState(false);
  const [Companydata, setCompanydata] = useState([]);

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

  const AlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = Companydata.map((n) => n.Id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const manage = (Id) => {
    setAlertMessage("Please select one company!");
    setAlertType("success");
    setAlertOpen(true);
    let name = "";
    for (let i = 0; i < Companydata.length; i++) {
      if (Companydata[i].Id === Id) {
        name = Companydata[i].Name;
      }
    }
    sessionStorage.CurrentCompany = JSON.stringify({ id: Id, name: name })
    load('default');
    handleOpenSelect()
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Companydata.length) : 0;

  const filteredUsers = applySortFilter(Companydata, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
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
          sessionStorage.CurrentCompany = JSON.stringify({ id: "", name: "No Select" })
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
    <Container>
      <Snackbar open={AlertOpen} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={AlertClose}>
        <Alert onClose={AlertClose} severity={AlertType} sx={{ width: '100%' }}>
          {AlertMessage}
        </Alert>
      </Snackbar>

      <Card style={{ boxShadow: "none" }}>
        <CompanyTool
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
                rowCount={Companydata.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { Id, Name, RegNo, TaxNo, Address } = row;
                    const isItemSelected = selected.indexOf(Id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={Id}
                        tabIndex={-1}
                        onClick={(e) => manage(Id)}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}

                      >
                        <TableCell align="left">{Id}</TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Typography variant="subtitle2" noWrap>
                            {Name}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">{RegNo}</TableCell>
                        <TableCell align="left">{TaxNo}</TableCell>
                        <TableCell align="left">{Address}</TableCell>
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
      </Card>
    </Container>
  );
}
