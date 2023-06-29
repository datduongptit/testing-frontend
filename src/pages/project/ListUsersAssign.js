import React from 'react';
import { TableContainer, Stack, Typography, Table, TableRow, Paper, TableCell, TableHead, TableBody, Button } from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUserAssign from './AddUserAssign';
import { useSelector } from 'react-redux';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';

const ListUsersAssign = ({ project }) => {
  let usersAssigned = project?.usersAssigned;
  usersAssigned = usersAssigned ? JSON.parse(usersAssigned) : [];
  const {
    users: { listUsers }
  } = useSelector((state) => state);
  return (
    <div>
      <div style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Tester assigned</Typography>
        {listUsers && <AddUserAssign listUsers={listUsers} usersAssigned={usersAssigned} />}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersAssigned?.map((user, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user?.username}
                </TableCell>
                <TableCell align="left">{user?.email}</TableCell>
                <TableCell align="left">{user?.role}</TableCell>
                <TableCell align="left">
                  <Stack direction="row" spacing={2}>
                    {/* <Button
                      variant="outlined"
                      startIcon={<ModeEditIcon />}
                      onClick={() => {
                        // getAccountInfo(project?.id);
                        // navigate(`/project/${project?.projectId}`);
                      }}
                    >
                      Edit
                    </Button> */}
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

ListUsersAssign.propTypes = {
  project: PropTypes.object
};

export default ListUsersAssign;