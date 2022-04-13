import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

// import tab
import LargeTabs from '../Miscellaneous/LargeTabs/LargeTabs';
import SmallTabs from '../Miscellaneous/SmallTabs/SmallTabs';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <LargeTabs
        tabLabels={['User', 'Misc', 'Small Tabs']}
        tabContents={[
          <div>
            <h2>Welcome, {user.username}!</h2>
            <p>Your ID is: {user.id}</p>
            <LogOutButton className='btn' />
          </div>,
          <div>
            <h1>This is Misc</h1>
            <h1>It is an important page</h1>
            <p>I want to test what happens when there is a lot of content</p>
            <h1>This is Misc</h1>
            <h1>It is an important page</h1>
            <p>I want to test what happens when there is a lot of content</p>
            <h1>This is Misc</h1>
            <h1>It is an important page</h1>
            <p>I want to test what happens when there is a lot of content</p>
            <h1>This is Misc</h1>
            <h1>It is an important page</h1>
            <p>I want to test what happens when there is a lot of content</p>
            <h1>This is Misc</h1>
            <h1>It is an important page</h1>
            <p>I want to test what happens when there is a lot of content</p>
            <h1>This is Misc</h1>
            <h1>It is an important page</h1>
            <p>I want to test what happens when there is a lot of content</p>
            <h1>This is Misc</h1>
            <h1>It is an important page</h1>
            <p>I want to test what happens when there is a lot of content</p>
            <h1>This is Misc</h1>
            <h1>It is an important page</h1>
            <p>I want to test what happens when there is a lot of content</p>
            <h1>This is Misc</h1>
            <h1>It is an important page</h1>
            <p>I want to test what happens when there is a lot of content</p>
          </div>,
          <SmallTabs
            tabLabels={['Test', 'Second Test Label']}
            tabContents={[<div>Content 1</div>, <div>Content 2</div>]}
          />,
        ]}
      />
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
