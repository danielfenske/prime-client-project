import { useRef, useState } from 'react';
import './LargeTabs.css';

// mui imports
import { Button } from '@mui/material';

// tabLabels and tabContents should have corresponding indexes
function LargeTabs({ tabLabels, tabContents }) {
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
            className='tab-background'
            style={{ marginTop: selectedTab * 50 + 'px' }}
          ></div>
          {tabLabels.map((tabLabel, index) => {
            // tabs set the selected tab on click
            return (
              <Button
                key={index}
                className={index === selectedTab ? 'tab selected' : 'tab'}
                onClick={() => {
                  setTab(index);
                }}
                style={{
                  color: index === selectedTab ? '#fff' : '#333',
                }}
              >
                {tabLabel}
              </Button>
            );
          })}
        </div>
        <div ref={tabContentContainer} className='tab-content-container'>
          {tabContents.map((tab, index) => {
            if (index === selectedTab) {
              return <span key={index}>{tab}</span>;
            }
          })}
        </div>
      </div>
    </>
  );
}

export default LargeTabs;
