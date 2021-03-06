import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Nav() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const goBackHome = () => {
    history.push('/');
  };

  return (
    <div className='nav'>
      {/* this is used to make sure that the logo is centered always */}
      <div className='left-nav'>
        {user.id && (
          <Button
            id='home-button'
            startIcon={<HomeIcon />}
            onClick={goBackHome}
          >
            Opportunities
          </Button>
        )}
      </div>

      <h2 className='app-title'>R & F Metals</h2>

      <div className='right-nav'>
        {!user.id && (
          <div>
            {/* If no user is logged in, show these links */}
            {/* // If there's no user, show login/registration links */}
            <Button id='login-button'>
              <Link to='/login'>Login / Register</Link>
            </Button>
          </div>
        )}

        {/* If a user is logged in, show the logout button */}
        {user.id && (
          <div>
            <span className='username'>{user.username}</span>
            <LogOutButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
