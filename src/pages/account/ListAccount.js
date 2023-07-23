/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import {
  TableContainer,
  Typography,
  Stack,
  Table,
  TableRow,
  Paper,
  TableCell,
  TableHead,
  TableBody,
  Button,
  IconButton,
  TablePagination,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import InputBase from '@mui/material/InputBase';
import UserService from 'services/user.service';
import { dispatch } from 'store/index';
import { setCurrenUserInfo, setListUsers } from 'store/reducers/users';
import AddNewAccount from './AddNewAccount';
import { useSelector } from 'react-redux';

const ListAccount = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const getAccountInfo = async (id) => {
    const res = await UserService.getUserInfo(id);
    if (res) {
      dispatch(setCurrenUserInfo({ data: res.data.result }));
    }
  };
  const { user: currentUser } = useSelector((state) => state.auth);
  const {
    users: { listUsers }
  } = useSelector((state) => state);

  useEffect(() => {
    try {
      const getListUsers = async () => {
        const response = await UserService.getAllUsers({
          page,
          limit: rowsPerPage,
          search
        });
        dispatch(setListUsers({ data: response.data?.result }));
      };
      if (currentUser) {
        getListUsers();
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUser, page, rowsPerPage, search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    listUsers && (
      <Box>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Typography variant="h5">List account</Typography>
          <AddNewAccount />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={1}>
                  <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                    <InputBase
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search"
                      // inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </TableCell>
                <TableCell colSpan={4}>{/* <Typography variant="h5">List account</Typography> */}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="left">Created at</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listUsers?.map((user, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.role}</TableCell>
                  <TableCell align="left">{moment(user.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<ModeEditIcon />}
                        onClick={() => {
                          getAccountInfo(user?.id);
                          navigate(`/account/${user?.id}`);
                        }}
                      >
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={listUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    )
  );
};

export default ListAccount;
