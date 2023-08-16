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
  TablePagination,
  Chip
} from '@mui/material';
import moment from 'moment';
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
import HistoriesService from 'services/histories.service';
import { setHistories } from 'store/reducers/histories';
import matchUser from 'utils/matchUser';

const History = ({ userId, type }) => {
  const navigate = useNavigate();
  const {
    histories: { histories, total },
    users: { listUsers }
  } = useSelector((state) => state);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');

  const getHistories = async (search) => {
    const res = await HistoriesService.getHistories({ page: page + 1, limit: rowsPerPage, search });
    if (res) {
      dispatch(setHistories({ data: res.data?.result?.result, total: res.data?.result?.total }));
    }
  };

  const debounced = useCallback(_debounce(getHistories, 500), []);
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    debounced(e.target.value);
  };

  useEffect(() => {
    getHistories();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function capitalizeFirstLetter(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const renderActions = (type) => {
    const color = type === 'CREATE' ? 'success' : type === 'UPDATE' ? 'primary' : 'error';
    return <Chip label={capitalizeFirstLetter(type)} color={color} />;
  };

  return (
    histories &&
    listUsers && (
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
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Action</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Deleted at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histories?.map((history, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {matchUser(listUsers, history.userId)}
                  </TableCell>
                  <TableCell align="left">{capitalizeFirstLetter(history.type)}</TableCell>
                  <TableCell align="left">{renderActions(history.action)}</TableCell>
                  <TableCell align="left">{history.description}</TableCell>
                  <TableCell align="left">{moment(history.deletedTime).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
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

export default History;
