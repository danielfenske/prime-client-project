import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SmallTabs from '../../Miscellaneous/SmallTabs/SmallTabs';
import HeadingCard from './HeadingCard/HeadingCard';

function ProposalOrderCard() {
  useEffect(() => {
    dispatch({ type: 'FETCH_HEADING_LIST' });
  }, []);

  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const headings = store.headingReducer;
  console.log('headings', headings);
  
  // **Placeholder data** should be replaced by data from the server ---------
  // const placeHolderHeading = [
  //   {
  //     id: 1,
  //     name: 'Franken',
  //     message: 'Interior Franken trim',
  //     proposal_id: 1,
  //     surcharge: 3.33,
  //     order: 2,
  //   },
  //   {
  //     id: 2,
  //     name: 'Test',
  //     message: '',
  //     proposal_id: 1,
  //     surcharge: 3.33,
  //     order: 3,
  //   },
  //   {
  //     id: 2,
  //     name: 'Bobert',
  //     message: 'exterior Bobert staircase',
  //     proposal_id: 1,
  //     surcharge: 3.33,
  //     order: 1,
  //   },
  // ];
  // **Placeholder data** should be replaced by data from the server ---------



  return (
    <>
      <SmallTabs
        tabLabels={headings
          .sort((a, b) => a.order - b.order)
          .map((head) => head.name)}
        tabContents={headings
          .sort((a, b) => a.order - b.order)
          .map((head, index) => {
            return <HeadingCard key={index} {...head} />
          })}
      />
    </>
  );
}

export default ProposalOrderCard;
