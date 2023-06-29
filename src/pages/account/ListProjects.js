/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableContainer, Stack, Table, TableRow, Paper, TableCell, TableHead, TableBody, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const ListProjects = ({ projects }) => {
  const navigate = useNavigate();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Project name</TableCell>
              <TableCell align="left">Project manager</TableCell>
              <TableCell align="left">Customers</TableCell>
              <TableCell align="left">Users Assigned</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects?.map((project, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {project.name}
                </TableCell>
                <TableCell align="left">{project.manager}</TableCell>
                <TableCell align="left">{project.customer}</TableCell>
                <TableCell align="left">{project.usersAssigned?.map((item) => item.name)?.join(', ')}</TableCell>
                <TableCell align="left">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      startIcon={<ModeEditIcon />}
                      onClick={() => {
                        // getAccountInfo(project?.id);
                        navigate(`/project/${project?.projectId}`);
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

export default ListProjects;