/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Alert,
  Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography,
} from '@mui/material';
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
  const [isOpenSneckBar, setIsOpenSneckBar] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  const handleClick = () => {
    setIsOpenSneckBar(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpenSneckBar(false);
  };

  const isUserInfoFull = (userName !== '') && (userLastName !== '') && (gender !== '')
    && (userPhone !== '') && (userEmail !== '' && /\S+@\S+\.\S+/.test(userEmail));
  const isInfoToClear = (userName !== '') || (userLastName !== '') || (gender !== '')
  || (userPhone !== '') || (userEmail !== '');

  const clearInputs = () => {
    setUserName('');
    setUserLastName('');
    setUserPhone('');
    setUserEmail('');
    setGender('');
  };

  return (
    <div className="container">
      <Button
        sx={{ m: 2 }}
        type="button"
        variant="contained"
        onClick={() => setIsAddingUser(prev => !prev)}
      >
        {isAddingUser
          ? 'Cancel adding users'
          : 'Add new user'}
      </Button>
      {isAddingUser && (
        <div className="userData">
          <Typography variant="h6" gutterBottom>
            Please, fill in the info about yourself:
          </Typography>
          <div className="userData__input">
            <TextField
              error={userName === ''}
              id="outlined-error"
              type="text"
              label="Name"
              helperText="Enter your name"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="userData__input">
            <TextField
              error={userLastName === ''}
              id="outlined-error"
              type="text"
              label="Last Name"
              placeholder="Last Name"
              helperText="Enter your last name"
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
            />
          </div>
          <div className="userData__input">
            <TextField
              error={userPhone === ''}
              id="outlined-error"
              type="text"
              label="Phone"
              placeholder="Phone"
              helperText="Enter your phone number"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>
          <div className="userData__input">
            <div>
              <TextField
                error={(userEmail === '') || !(/\S+@\S+\.\S+/.test(userEmail))}
                id="outlined-error"
                type="email"
                label="Email"
                placeholder="Email"
                helperText="Enter your e-mail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="userData__input">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                error={gender === ''}
                value={gender}
                label="Gender"
                onChange={(event) => setGender(event.target.value)}
              >
                <MenuItem value="">Chose your gender</MenuItem>
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button
              sx={{ m: 2 }}
              variant="contained"
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
                handleClick();
              }}
            >
              Add user
            </Button>
            <Button
              sx={{ m: 2 }}
              type="submit"
              variant="outlined"
              onClick={clearInputs}
              disabled={!isInfoToClear}
            >
              Clear form
            </Button>
            <Snackbar
              open={isOpenSneckBar}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%' }}
              >
                The new User was successfully added!
              </Alert>
            </Snackbar>
          </div>
        </div>
      )}
    </div>
  );
};
