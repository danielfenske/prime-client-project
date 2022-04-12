import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

// import tab
import LargeTabs from '../Miscellaneous/LargeTabs/LargeTabs';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className='container'>
      <LargeTabs
        tabLabels={['User', 'Misc']}
        tabContents={[
          <div>
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <LogOutButton className='btn' />
          </div>,
          <div>
            <h1>This is Misc</h1>
          </div>,
        ]}
      />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
