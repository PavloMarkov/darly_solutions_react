/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { client } from '../api/fetch';
import { User } from '../types/User';

type Props = {
  addUser: (user: User) => void;
};

export const InputArea: React.FC<Props> = (props) => {
  const { addUser } = props;

  const [userName, setUserName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [gender, setGender] = useState('');

  const isUserInfoFull = (userName !== '') && (userLastName !== '') && (gender !== '')
    && (userPhone !== '') && (userEmail !== '');

  const clearInputs = () => {
    setUserName('');
    setUserLastName('');
    setUserPhone('');
    setUserEmail('');
    setGender('');
  };

  return (
    <div className="userData">
      <div className="userData__name">
        <label htmlFor="userName">
          Name:
        </label>
        <input
          type="text"
          className="error"
          value={userName}
          id="userName"
          placeholder="Name"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="userData__lastName">
        <label htmlFor="userLastName">
          Last Name:
        </label>
        <input
          type="text"
          value={userLastName}
          id="userLastName"
          placeholder="Last Name"
          onChange={(e) => setUserLastName(e.target.value)}
        />
      </div>
      <div className="userData__userPhone">
        <label htmlFor="userPhone">
          Phone number:
        </label>
        <input
          type="text"
          value={userPhone}
          id="userPhone"
          placeholder="Phone"
          onChange={(e) => setUserPhone(e.target.value)}
        />
      </div>
      <div className="userData__userEmail">
        <label htmlFor="userEmail">
          user Email:
        </label>
        <input
          type="email"
          value={userEmail}
          className={/\S+@\S+\.\S+/.test(userEmail) ? '' : 'error'}
          id="userEmail"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      <div className="userData__gender">
        <label htmlFor="userGender">
          user gender:
        </label>
        <select
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">
          </option>
          <option value="M">
            Male
          </option>
          <option value="F">
            Female
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!isUserInfoFull}
        onClick={(event) => {
          event.preventDefault();
          client.post<User>('/', {
            first_name: userName,
            last_name: userLastName,
            phone: userPhone,
            email: userEmail,
            gender,
          }).then(res => addUser(res));
          clearInputs();
        }}
      >
        Add user
      </button>
    </div>
  );
};
