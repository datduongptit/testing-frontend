/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import matchUser from 'utils/matchUser';

export default function ExcuteDetails({ file }) {
  const {
    users: { listUsers }
  } = useSelector((state) => state);
  const functionsFile = file?.functions ? JSON.parse(file?.functions) : [];
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Case passed</TableCell>
                  <TableCell align="left">Excuter</TableCell>
                  <TableCell align="left">Created at</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {functionsFile?.passedCase?.map((row) => (
                  <TableRow key={row.caseName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.caseName}
                    </TableCell>
                    <TableCell align="left">{matchUser(listUsers, row?.excuter)}</TableCell>
                    <TableCell align="left">{row.priority}</TableCell>
                    <TableCell align="left">{row.timeCreated ? moment(row.timeCreated).format('YYYY-MM-DD') : ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Case failed</TableCell>
                  <TableCell align="left">Dev assigned</TableCell>
                  <TableCell align="left">Excuter</TableCell>
                  <TableCell align="left">Error code</TableCell>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="left">Time done</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {functionsFile?.failed?.map((row) => (
                  <TableRow key={row.caseName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.caseName}
                    </TableCell>
                    <TableCell align="left">{row.devAssign}</TableCell>
                    <TableCell align="left">{matchUser(listUsers, row?.excuter)}</TableCell>
                    <TableCell align="left">{row.errorCode}</TableCell>
                    <TableCell align="left">{row.time ? moment(row.time).format('YYYY-MM-DD') : ''}</TableCell>
                    <TableCell align="left">{row.timeDone ? moment(row.timeDone).format('YYYY-MM-DD') : ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
