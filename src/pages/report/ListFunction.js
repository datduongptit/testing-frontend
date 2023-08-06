/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import UploadReportModal from './UploadReportModal';
import UpdateFunction from './EditFunction';

const ListFuntion = ({ files }) => {
  const reportFiles = files.filter((file) => file.fileType === 'TEST_CASE');
  const listFunc = [];
  for (let i = 0; i < reportFiles.length; i++) {
    const functions = JSON.parse(reportFiles[i].functions);
    listFunc.push(...functions);
  }
  const [listFunction, setListFunction] = useState(listFunc || []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Function name</TableCell>
            <TableCell align="right">Priority</TableCell>
            <TableCell align="right">Test case</TableCell>
            <TableCell align="right">Environment</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Passed rate</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listFunction.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.priority}</TableCell>
              <TableCell align="right">{row.testcase}</TableCell>
              <TableCell align="right">{row.env}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{((row.casePassed / row.testcase) * 100).toFixed(2)}</TableCell>
              <TableCell align="right">
                {/* <Stack direction="row" spacing={1}> */}
                <UpdateFunction func={row} fileId={row.id} reportFiles={reportFiles} />
                {/* </Stack> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListFuntion;
