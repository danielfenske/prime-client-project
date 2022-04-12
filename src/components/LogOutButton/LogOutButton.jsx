import React from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: 'LOGOUT' })}
      endIcon={<LogoutIcon />}
      variant='outlined'
      color='secondary'
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
