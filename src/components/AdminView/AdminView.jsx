import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserCard from './UserCard/UserCard';

function AdminView() {
  const dispatch = useDispatch();
  const allUsers = useSelector((store) => store.allUsers);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USERS' });
  }, []);

  return (
    <>
      <div>
        <Button variant='contained'>Add User</Button>
        <h1>Hello From the Admin View</h1>
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
