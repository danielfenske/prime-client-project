import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SmallTabs from '../../Miscellaneous/SmallTabs/SmallTabs';
import HeadingCard from './HeadingCard/HeadingCard';
import {useParams} from 'react-router-dom';

function ProposalOrderCard() {

  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const headings = store.headingReducer;
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_HEADING_LIST', payload: id });
  }, []);



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
