import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import './ProposalPreviewCard.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ProposalPreviewCard() {
  const dispatch = useDispatch();
  const proposals = useSelector((store) => store.proposalEverything);
  const items = useSelector((store) => store.itemReducer);
  const { id } = useParams();

  const proposal = proposals[0];

  const getItem = (id) => {
    return items.filter((i) => i.id === id)[0];
  };

  const getDeliveryMethod = (method) => {
    switch (method) {
      case 1:
        return 'Delivery Only';
      case 2:
        return 'Delivery & Install';
      case 3:
        return 'Pickup';
      default:
        return 'No Method Specified';
    }
  };

  useEffect(() => {
    dispatch({
      type: 'GET_PROPOSAL_EVERYTHING',
      payload: id,
    });

    dispatch({
      type: 'FETCH_ITEM_LIST',
    });
  }, []);

  console.log('Items:', items);
  return (
    <>
      {proposal && (
        <div className='proposal-preview'>
          <div className='pdf-container'>
            <div className='page'>
              {/* HEADER */}
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

              {/* PARTNER INFORMATION */}
              <div className='partner-info'>
                <p>{proposal.name /* This is the partner name */}</p>
                <p>{proposal.address_line_1}</p>
                <p>
                  {proposal.city}, {proposal.state} {proposal.zip}
                </p>
              </div>

              {/* DELIVERY METHOD */}
              <div>
                <p>
                  <b>{getDeliveryMethod(proposal.method)}:</b>{' '}
                  {proposal.method_message}
                </p>
              </div>

              {/* General INFO */}
              <div className='general-info'>
                <p>Community: {proposal.community_name}</p>
                <p>Development Type: {proposal.development_type}</p>
              </div>

              {/* HEADING SECTIONS */}
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
                          const item = getItem(li.item_id);
                          return (
                            <p key={index}>
                              {li.qty} - {item?.name} {li.rounded_measure_unit}
                              {item?.measurement_unit}
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
