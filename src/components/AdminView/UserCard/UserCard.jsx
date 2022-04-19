import { TextField, Select, MenuItem, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();
  const [accessInput, setAccessInput] = useState(access_level);
  const [usernameInput, setUsernameInput] = useState(username);
  const [firstInput, setFirstInput] = useState(first_name);
  const [lastInput, setLastInput] = useState(last_name);
  const handleDisable = () => {
    let payload = {
      id
    }
    dispatch({
      type: 'DISABLE_USER', payload: payload
    })
  }
  const handlePut = () => {
    let payload = {
      id,
      accessInput,
      usernameInput,
      firstInput,
      lastInput
    }
    dispatch({
      type: 'UPDATE_USER_VIA_ADMIN', payload: payload
    })
  }
  console.log(accessInput);
  return (
    <>
      <div className='userCard'>
        <p>User Id: {id}</p>

        <div>
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

        <div className='card-section-3'>
          {(username !== usernameInput ||
            first_name !== firstInput ||
            last_name !== lastInput ||
            access_level !== accessInput) && (
            <Button onClick={handlePut}  variant='contained' color='secondary'>
              Save
            </Button>
          )}
          <IconButton onClick={handleDisable}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default UserCard;
