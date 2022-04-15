import { useEffect, useRef, useState } from 'react';
import './SmallTabs.css';

// mui imports
import { Button } from '@mui/material';

// tabLabels and tabContents should have corresponding indexes
function SmallTabs({ tabLabels, tabContents }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabContentContainer = useRef();

  const setTab = (index) => {
    tabContentContainer.current.classList.toggle('hidden');

    setTimeout(() => {
      setSelectedTab(index);
      tabContentContainer.current.classList.toggle('hidden');
    }, 200);
  };

  return (
    <>
      <div className='tab-container'>
        <div className='tab-label-container'>
          <div
            className='small-tab-background'
            style={{ marginTop: selectedTab * 40 + 'px' }}
          ></div>
          {tabLabels.map((tabLabel, index) => {
            // tabs set the selected tab on click
            return (
              <Button
                key={index}
                className={
                  index === selectedTab ? 'small-tab selected' : 'small-tab'
                }
                onClick={() => {
                  setTab(index);
                }}
                style={{
                  color: index === selectedTab ? '#fff' : '#333',
                  paddingRight: '20px',
                }}
              >
                {tabLabel}
              </Button>
            );
          })}
        </div>
        <div ref={tabContentContainer} className='tab-content-container'>
          {tabContents.map((tab, index) => {
            return (
              <span
                key={index}
                style={{
                  display: index === selectedTab ? 'grid' : 'none',
                }}
              >
                {tab}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SmallTabs;
