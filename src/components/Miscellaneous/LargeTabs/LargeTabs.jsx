import { useRef, useState } from 'react';
import './LargeTabs.css';

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
          {tabLabels.map((tabLabel, index) => {
            // tabs set the selected tab on click
            return (
              <div
                className='tab'
                onClick={() => {
                  setTab(index);
                }}
              >
                {tabLabel}
              </div>
            );
          })}
        </div>
        <div ref={tabContentContainer} className='tab-content-container'>
          {tabContents[selectedTab]}
        </div>
      </div>
    </>
  );
}

export default LargeTabs;
