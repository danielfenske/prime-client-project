import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserCard from './UserCard/UserCard';

import './AdminView.css';

function AdminView() {
  const dispatch = useDispatch();
  const allUsers = useSelector((store) => store.allUsers);

  const addNewUser = () => {
    console.log('In Add New User');
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USERS' });
  }, []);

  return (
    <>
      <div className='admin-container'>
        <Button variant='contained' onClick={addNewUser}>
          Add User
        </Button>
        <div className='user-card-holder'>
          {allUsers.map((user, index) => {
            return <UserCard key={index} user={user} />;
          })}
        </div>
      </div>
    </>
  );
}

export default AdminView;
