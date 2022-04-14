import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserCard from './UserCard/UserCard';
import Modal from '../Miscellaneous/Modal/Modal';

import './AdminView.css';

function AdminView() {
  const dispatch = useDispatch();
  const allUsers = useSelector((store) => store.allUsers);

  const [newUsername, setNewUsername] = useState('');

  // used for opening the new user modal
  const [open, setOpen] = useState(false);
  const openNewUserModal = () => {
    setOpen(true);
  };

  const addNewUser = (e) => {
    e.preventDefault();
    // console.log('In Add New User');

    // use built in register route to create a new User
    dispatch({
      type: 'REGISTER',
      payload: {
        username: newUsername,
        password: 'password',
      },
    });

    setOpen(false);
  };

  const cancelNewUser = () => {
    setNewUsername('');
    setOpen(false);
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_USERS' });
  }, []);

  return (
    <>
      <div className='admin-container'>
        <Button variant='contained' onClick={openNewUserModal}>
          Add User
        </Button>
        <div className='user-card-holder'>
          {allUsers.map((user, index) => {
            return <UserCard key={index} user={user} />;
          })}
        </div>
      </div>

      {/* modal is for adding a new user */}
      <Modal open={open}>
        <h1>Add User</h1>
        <form onSubmit={addNewUser}>
          <div>
            <TextField
              label='username'
              size='small'
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required={true}
            />
            <p>All new users are added with the password: "password"</p>
          </div>
          <div className='admin-modal-button-container'>
            <Button variant='contained' type='submit'>
              Add User
            </Button>
            <Button onClick={cancelNewUser}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AdminView;
