import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';

import './ProposalPreviewCard.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const logo = './RFLogo.png';

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

  const calcHeadingTotal = (headingTotal, heading, proposal) => {
    let finalTotal = 0;

    let numbers = {};

    /*
      Example Equations:
        headingTotal = 106,374.33

    */

    // heading total
    finalTotal += headingTotal;
    console.log('finalTotal', finalTotal);

    // surcharge
    finalTotal += headingTotal * Number(heading.surcharge * 0.01);
    console.log('finalTotal', finalTotal);

    numbers = {
      ...numbers,
      heading: finalTotal.toLocaleString('en-US'),
    };

    // tax rate
    if (heading.taxable === true) {
      finalTotal += headingTotal * Number(proposal.tax_rate * 0.01);
    }
    console.log('finalTotal', finalTotal);

    numbers = {
      ...numbers,
      tax: (headingTotal * Number(proposal.tax_rate * 0.01)).toLocaleString(
        'en-US',
      ),
      total: finalTotal.toLocaleString('en-US'),
    };

    return (
      <>
        {/* <p>Heading: ${numbers.heading}</p>
        <p>Tax: ${numbers.tax}</p> */}
        <p>Total: ${numbers.total}</p>
      </>
    );
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
                <div className='logo-1'>{/* <h1>LOGO</h1> */}</div>
                <div className='title'>
                  {/* <h1>R & F Metals</h1> */}
                  <img className='logo' src={logo} alt='R & F Metals' />
                </div>
                <div className='company-info'>
                  <p>
                    <b>{new Date(proposal.date).toLocaleDateString()}</b>
                  </p>
                  <p>Proposal</p>
                  <p>{proposal.proposal_code}</p>
                  <div className='sales-person'>
                    <p>Prepared By</p>
                    <p>
                      {proposal.first_name} {proposal.last_name}
                    </p>
                  </div>
                </div>
              </header>

              {/* PARTNER INFORMATION */}
              <section className='partner-info'>
                <p>{proposal.name /* This is the partner name */}</p>
                <p>{proposal.address_line_1}</p>
                <p>
                  {proposal.city}, {proposal.state} {proposal.zip}
                </p>
              </section>

              {/* General INFO */}
              <section className='general-info'>
                <p>Community: {proposal.community_name}</p>
                <p>Development Type: {proposal.development_type}</p>
              </section>

              {/* DELIVERY METHOD */}
              <section className='delivery'>
                <p>
                  <b>{getDeliveryMethod(proposal.method)}:</b>{' '}
                  {proposal.method_message}
                </p>
              </section>

              {/* HEADING SECTIONS */}
              {proposal.headings
                .reduce((total, heading) => {
                  if (total.filter((e) => e.id === heading.id).length < 1) {
                    // total.push(heading);
                    return [...total, heading];
                  } else {
                    return total;
                  }
                }, [])
                .map((heading, index) => {
                  if (!heading) return;
                  return (
                    <section key={index} className='heading-section'>
                      <p className='title'>
                        <b>{heading.name}:</b>
                      </p>
                      <div>
                        {proposal?.line_items
                          .filter(
                            (line_item) => line_item?.heading_id === heading.id,
                          )
                          .map((li, index) => {
                            const item = getItem(li.item_id);
                            return (
                              <p key={index} className='line-item'>
                                <span className='first-container'>
                                  <span className='item-qty'>{li.qty}</span>-
                                  <span className='item-name'>
                                    {item?.name}
                                  </span>
                                </span>
                                <span className='item_measure'>
                                  {li.ft ? (
                                    <>
                                      {li.ft}' {li.inches}"
                                    </>
                                  ) : (
                                    <>
                                      {li.measure_unit}
                                      {item?.measurement_unit}
                                    </>
                                  )}
                                </span>
                                <span className='item_description'>
                                  {item?.description}
                                </span>
                              </p>
                            );
                          })}
                      </div>
                      <div className='total-price'>
                        {calcHeadingTotal(
                          proposal?.line_items.reduce((total, item) => {
                            if (item.heading_id === heading.id) {
                              return total + Number(item.total_item_price);
                            }
                            return total;
                          }, 0),
                          heading,
                          proposal,
                        )}
                      </div>
                    </section>
                  );
                })}
              <section className='field-weld'>
                <p>
                  Field Weld: $
                  {Number(proposal.field_weld_charge).toLocaleString('en-US')}
                </p>
              </section>
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
