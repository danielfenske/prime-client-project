import SmallTabs from '../../Miscellaneous/SmallTabs/SmallTabs';
import HeadingCard from './HeadingCard/HeadingCard';

function ProposalOrderCard() {
  // **Placeholder data** should be replaced by data from the server ---------
  const placeHolderHeading = [
    {
      id: 1,
      name: 'Franken',
      message: 'Interior Franken trim',
      proposal_id: 1,
      surcharge: 3.33,
      order: 2,
    },
    {
      id: 2,
      name: 'Test',
      message: '',
      proposal_id: 1,
      surcharge: 3.33,
      order: 3,
    },
    {
      id: 2,
      name: 'Bobert',
      message: 'exterior Bobert staircase',
      proposal_id: 1,
      surcharge: 3.33,
      order: 1,
    },
  ];
  // **Placeholder data** should be replaced by data from the server ---------

  return (
    <>
      <SmallTabs
        tabLabels={placeHolderHeading
          .sort((a, b) => a.order - b.order)
          .map((head) => head.name)}
        tabContents={placeHolderHeading
          .sort((a, b) => a.order - b.order)
          .map((head, index) => (
            <HeadingCard key={index} {...head} />
          ))}
      />
    </>
  );
}

export default ProposalOrderCard;
