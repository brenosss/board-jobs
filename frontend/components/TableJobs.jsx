import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from "@material-ui/core/styles";
import { styles } from './Style'

const useStyle = makeStyles(styles)

function TableContent({rows, search}){
  return (
    rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row"> {row.title}</TableCell>
        <TableCell>{row.company}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.location}</TableCell>
      </TableRow>
    ))
  )
}
export function TableJobs({rows}){
  const headerCells = ['Title', 'Company', 'Type', 'Location']
  const classes = useStyle()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headerCells.map(headerCell => (
              <TableCell key={headerCell}>{headerCell}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableContent rows={rows}/>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
