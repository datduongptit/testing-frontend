/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TableContainer,
  Stack,
  Table,
  TableRow,
  Paper,
  TableCell,
  TableHead,
  TableBody,
  Button,
  IconButton,
  TablePagination
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ProjectService from 'services/project.service';
import { dispatch } from 'store/index';
import { deleteProject, setListProjects } from 'store/reducers/projects';
import DeleteModal from 'components/modal/DeleteModal';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import _debounce from 'lodash/debounce';

const ListProjects = ({ userId, type }) => {
  const navigate = useNavigate();
  const {
    projects: { listProjects: projects, total }
  } = useSelector((state) => state);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');

  const getListProjectByUserId = async (search) => {
    const res = await ProjectService.getProjectByUserId(userId, { page: page + 1, limit: rowsPerPage, search });
    if (res) {
      dispatch(setListProjects({ data: res.data.result.listUsersAssigned, total: res.data.result.total }));
    }
  };

  const debounced = useCallback(_debounce(getListProjectByUserId, 500), []);
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    debounced(e.target.value);
  };

  useEffect(() => {
    getListProjectByUserId();
  }, [page, rowsPerPage]);

  const handleDeleteProject = async (id) => {
    try {
      const response = await ProjectService.deleteProjectById(id);
      if (response?.data?.result?.affected) {
        dispatch(deleteProject(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    projects && (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={1}>
                  <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                    <InputBase
                      value={search}
                      onChange={handleChangeSearch}
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
                        startIcon={<RemoveRedEyeIcon />}
                        onClick={() => {
                          // getAccountInfo(project?.id);
                          navigate(`/${type === 'report' ? 'report' : 'project'}/${project?.projectId}`);
                        }}
                      >
                        View
                      </Button>
                      <DeleteModal deleteAction={handleDeleteProject} id={project?.projectId} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    )
  );
};

export default ListProjects;
