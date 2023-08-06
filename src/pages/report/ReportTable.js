/* eslint-disable no-unused-vars */
import React from 'react';
import { TableContainer, Stack, Table, TableRow, Paper, TableCell, TableHead, TableBody, IconButton, Typography } from '@mui/material';
// import DeleteModal from 'components/modal/DeleteModal';
import PropTypes from 'prop-types';
// import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import DownloadIcon from '@mui/icons-material/Download';
import FileService from 'services/file.service';
import { dispatch } from 'store/index';
import { deleteFileById } from 'store/reducers/projects';
import DeleteModal from 'components/modal/DeleteModal';
import UploadFile from './UploadFile';
import matchUser from 'utils/matchUser';
import { useSelector } from 'react-redux';
import { CustomNoRowsOverlay } from 'components/CustomEmptyOverlayGrid';
import UploadReportModal from './UploadReportModal';
import FormExcute from './FormExcute';

const ReportTable = ({ project, type }) => {
  const {
    users: { listUsers },
    auth: { user }
  } = useSelector((state) => state);
  const files = project.files?.filter((item) => item?.fileType === type);
  const handleDeleteFile = async (id, url) => {
    const res = await FileService.deleteFileById(id, url);
    if (res?.data?.result?.affected) {
      dispatch(deleteFileById(id));
    }
  };

  const isHasToDelete = (id) => user?.sub === id;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Typography variant="h5">List file</Typography>
        {/* <AddNewAccount /> */}
        <UploadFile project={project} type={type} />
        {/* <UploadReportModal /> */}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">File name</TableCell>
              <TableCell align="left">User uploaded</TableCell>
              <TableCell align="left">Upoloaded at</TableCell>
              <TableCell align="left">Updated at</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files?.length ? (
              files?.map((file, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {file.fileName || '-----'}
                  </TableCell>
                  <TableCell align="left">{matchUser(listUsers, file.userUpload)}</TableCell>
                  <TableCell align="left">{moment(file.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                  <TableCell align="left">{moment(file.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <IconButton color="primary" aria-label="add to shopping cart" onClick={() => window.open(file.baseUrl + file.url)}>
                        <DownloadIcon />
                      </IconButton>
                      {isHasToDelete(file?.userUpload) && <DeleteModal deleteAction={handleDeleteFile} id={file?.id} url={file?.url} />}
                      {type === 'TEST_CASE' && <UploadReportModal type={type} fileId={file.id} listFuntion={JSON.parse(file?.functions)} />}
                      {type === 'EXCUTE_TEST' && <FormExcute type={type} fileId={file.id} listFuntion={JSON.parse(file?.functions)} />}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <CustomNoRowsOverlay />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

ReportTable.propTypes = {
  project: PropTypes.object,
  type: PropTypes.string
};

export default ReportTable;
