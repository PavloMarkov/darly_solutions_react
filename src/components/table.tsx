import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { useColorScheme } from '@mui/material';
import { User } from '../types/User';

type Props = {
  users: User[];
};

export const TableData: React.FC<Props> = (props) => {
  const { users } = props;

  function createData(
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    gender: 'M' | 'F' | '',
  ) {
    return {
      id, first_name, last_name, phone, email, gender,
    };
  }

  const rows: User[] = [];

  users.forEach(user => {
    rows.push(
      createData(user.id, user.first_name, user.last_name, user.phone, user.email, user.gender),
    );
  });

  return (
    <div className="container">
      <TableContainer
        component={Paper}
        elevation={3}
      >
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Lastname</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">
                  {row.first_name}
                </TableCell>
                <TableCell align="right">{row.last_name}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <table>
        <thead>
          <tr>
            <th>
              number
            </th>
            <th>
              name
            </th>
            <th>
              lastname
            </th>
            <th>
              phone
            </th>
            <th>
              e-mail
            </th>
            <th>
              gender
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user.id}
            >
              <td>
                {user.id}
              </td>
              <td>
                {user.first_name}
              </td>
              <td>
                {user.last_name}
              </td>
              <td>
                {user.phone}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.gender}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};
