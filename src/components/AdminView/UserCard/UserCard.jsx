import { TextField, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

function UserCard({ user }) {
  // destruct the user object
  const { id, username, first_name, last_name, access_level } = user;

  const access_levels = ['', 'Salesperson', 'Sales Lead', 'Administrator'];

  const [accessInput, setAccessInput] = useState(access_level);
  const [usernameInput, setUsernameInput] = useState(username);
  const [firstInput, setFirstInput] = useState(first_name);
  const [lastInput, setLastInput] = useState(last_name);

  return (
    <>
      <div className='userCard'>
        <p>User Id: {id}</p>

        <TextField
          label='Username'
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
        />

        <TextField
          label='First Name'
          value={firstInput}
          onChange={(e) => setFirstInput(e.target.value)}
        />

        <TextField
          label='Last Name'
          value={lastInput}
          onChange={(e) => setLastInput(e.target.value)}
        />

        <Select
          value={accessInput}
          onChange={(e) => setAccessInput(e.target.value)}
        >
          {access_levels.map((lvl, index) => {
            if (index === 0) return;

            return (
              <MenuItem key={index} value={index}>
                {lvl}
              </MenuItem>
            );
          })}
        </Select>
      </div>
    </>
  );
}

export default UserCard;
