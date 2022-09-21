import React from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
};

export const TableData: React.FC<Props> = (props) => {
  const { users } = props;

  return (
    <div className="container">
      <table>
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
              sex
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
      </table>
    </div>
  );
};
