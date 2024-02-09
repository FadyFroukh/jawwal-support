import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableOperations from './TableOperations';

export default function BasicTable({entries,headers,Cell,setAction}) {

  return (
    <TableContainer component={Paper} sx={{textAlign:'right'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              {
                headers?.map((header,index)=>(
                  <TableCell 
                    key={index}
                  >
                    <strong>
                      {header}
                    </strong>
                  </TableCell>
                ))
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            entries?.map((entry,index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <Cell entry={entry}/>
                <TableOperations entry={entry} setAction={setAction}/>
              </TableRow>
            )) 
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}