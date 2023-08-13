/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TestcaseDetails({ file }) {
  const functionsFile = file?.functions ? JSON.parse(file?.functions) : [];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Function name</TableCell>
            <TableCell align="left">Testcase</TableCell>
            <TableCell align="left">Priority</TableCell>
            <TableCell align="left">Environment</TableCell>
            <TableCell align="left">Total bugs</TableCell>
            <TableCell align="left">Case passed</TableCell>
            <TableCell align="left">Case failed</TableCell>
            <TableCell align="left">Case untested</TableCell>
            <TableCell align="left">Bug remaining</TableCell>
            <TableCell align="left">Bug reject</TableCell>
            <TableCell align="left">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {functionsFile.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.testcase}</TableCell>
              <TableCell align="left">{row.priority}</TableCell>
              <TableCell align="left">{row.env}</TableCell>
              <TableCell align="left">{row.totalBug}</TableCell>
              <TableCell align="left">{row.casePassed}</TableCell>
              <TableCell align="left">{row.caseFailed}</TableCell>
              <TableCell align="left">{row.caseUntested}</TableCell>
              <TableCell align="left">{row.bugRemaining}</TableCell>
              <TableCell align="left">{row.bugReject}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
