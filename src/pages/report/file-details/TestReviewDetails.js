/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TestReviewDetails({ file }) {
  const functionsFile = file?.functions ? JSON.parse(file?.functions) : [];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Review name</TableCell>
            <TableCell align="left">Priority</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Time done</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {functionsFile.map((row) => (
            <TableRow key={row.caseName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.caseName}
              </TableCell>
              <TableCell align="left">{row.priority}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
              <TableCell align="left">{moment(row.createDate).format('YYYY-MM-DD')}</TableCell>
              <TableCell align="left">{moment(row.timeDone).format('YYYY-MM-DD')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
