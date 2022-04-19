import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

import './ProposalPreviewCard.css';

function ProposalPreviewCard() {
  const store = useSelector((store) => store);

  const {} = store;

  console.log('All PDF Information', store);
  return (
    <>
      <div className='proposal-preview'>
        <div className='pdf-container'>
          <div className='page'>
            <header>
              <div className='logo-1'>
                <h1>LOGO</h1>
              </div>
              <div className='title'>
                <h1>R & F Metals</h1>
              </div>
              <div className='company-info'></div>
            </header>
          </div>
        </div>
        <Button
          variant='contained'
          onClick={() => {
            window.print();
          }}
        >
          Print
        </Button>
      </div>
    </>
  );
}

export default ProposalPreviewCard;
