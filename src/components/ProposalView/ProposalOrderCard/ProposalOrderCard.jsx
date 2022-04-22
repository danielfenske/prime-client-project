import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SmallTabs from '../../Miscellaneous/SmallTabs/SmallTabs';
import HeadingCard from './HeadingCard/HeadingCard';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function ProposalOrderCard() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const headings = store.headingReducer;
  const { id } = useParams();

  const addHeading = () => {
    dispatch({
      type: 'POST_HEADING',
      payload: {
        name: 'New Tab',
        message: '',
        proposal_id: id,
        surcharge: 0.0,
        taxable: true,
      },
    });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_HEADING_LIST', payload: id });
  }, []);

  return (
    <>
      <SmallTabs
        tabLabels={headings
          // .sort((a, b) => a.order - b.order)
          .map((head) => head.name)}
        tabContents={headings
          // .sort((a, b) => a.order - b.order)
          .map((head, index) => {
            return <HeadingCard key={index} {...head} />;
          })}
        tab_extras={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton onClick={addHeading}>
              <AddIcon />
            </IconButton>
          </div>
        }
      />
    </>
  );
}

export default ProposalOrderCard;
