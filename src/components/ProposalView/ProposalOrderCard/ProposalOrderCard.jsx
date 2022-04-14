import SmallTabs from '../../Miscellaneous/SmallTabs/SmallTabs';
import HeadingCard from './HeadingCard/HeadingCard';

function ProposalOrderCard() {
  const placeHolderHeading = {
    id: 1,
    name: 'frank',
    message: 'exterior staircase railing',
    proposal_id: 1,
    surcharge: 3.33,
    order: 4,
  };

  return (
    <>
      <SmallTabs
        tabLabels={['Placeholder Heading']}
        tabContents={[<HeadingCard {...placeHolderHeading} />]}
      />
    </>
  );
}

export default ProposalOrderCard;
