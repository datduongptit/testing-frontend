/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Typography, Stack, Table, TableRow, Paper, TableCell, TableHead, TableBody, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UserService from 'services/user.service';
import { dispatch } from 'store/index';
import { setCurrenUserInfo } from 'store/reducers/users';
import AddNewAccount from './AddNewAccount';

const ListAccount = ({ users }) => {
  const navigate = useNavigate();
  const getAccountInfo = async (id) => {
    const res = await UserService.getUserInfo(id);
    if (res) {
      dispatch(setCurrenUserInfo({ data: res.data.result }));
    }
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Typography variant="h5">List account</Typography>
        <AddNewAccount />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Created at</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
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
      </TableContainer>
    </div>
  );
};

export default ListAccount;
