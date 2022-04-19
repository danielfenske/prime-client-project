import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import './ProposalPreviewCard.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ProposalPreviewCard() {
  const dispatch = useDispatch();
  const proposals = useSelector((store) => store.proposalEverything);
  const { id } = useParams();

  const proposal = proposals[0];

  useEffect(() => {
    dispatch({
      type: 'GET_PROPOSAL_EVERYTHING',
      payload: id,
    });
  }, []);

  return (
    <>
      {proposal && (
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
                <div className='company-info'>
                  <p>Proposal:</p>
                  <p>{proposal.proposal_code}</p>
                  <p>Prepared By:</p>
                  <p>
                    {proposal.first_name} {proposal.last_name}
                  </p>
                </div>
              </header>
              {proposal.headings.map((heading, index) => {
                return (
                  <section key={index}>
                    <p>{heading.name}</p>
                    <div>
                      {proposal?.line_items
                        .filter(
                          (line_item) => line_item?.heading_id === heading.id,
                        )
                        .map((li, index) => {
                          return (
                            <p key={index}>
                              {li.qty} - {li.total_item_price}
                            </p>
                          );
                        })}
                    </div>
                  </section>
                );
              })}
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
      )}
    </>
  );
}

export default ProposalPreviewCard;
