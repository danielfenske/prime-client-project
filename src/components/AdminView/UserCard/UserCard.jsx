import { TextField, Select, MenuItem, Autocomplete } from '@mui/material';
import { useState } from 'react';

function UserCard({ user }) {
  // destruct the user object
  const { id, username, first_name, last_name, access_level } = user;

  const access_levels = [
    // null value is a correction for different starting indexes
    null, // database starts at index 1 but js starts at index 0
    'Salesperson',
    'Sales Lead',
    'Administrator',
  ];

  const [accessInput, setAccessInput] = useState(access_level);
  const [usernameInput, setUsernameInput] = useState(username);
  const [firstInput, setFirstInput] = useState(first_name);
  const [lastInput, setLastInput] = useState(last_name);

  console.log(accessInput);
  return (
    <>
      <div className='userCard'>
        <p>User Id: {id}</p>

        <TextField
          label='Username'
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          size='small'
        />

        <TextField
          label='First Name'
          value={firstInput}
          onChange={(e) => setFirstInput(e.target.value)}
          size='small'
        />

        <TextField
          label='Last Name'
          value={lastInput}
          onChange={(e) => setLastInput(e.target.value)}
          size='small'
        />

        <Select
          value={accessInput}
          onChange={(e) => setAccessInput(e.target.value)}
          size='small'
        >
          {access_levels.map((lvl, index) => {
            if (index !== 0) {
              return (
                <MenuItem key={index} value={index}>
                  {lvl}
                </MenuItem>
              );
            }
          })}
        </Select>
      </div>
    </>
  );
}

export default UserCard;
