import LargeTabs from '../Miscellaneous/LargeTabs/LargeTabs';
import OpportunityProposalListCard from './OpportunityProposalListCard/OpportunityProposalListCard';
import OpportunityGeneralCard from './OpportunityGeneralCard/OpportunityGeneralCard';

function OpportunityView() {
  return (
    <>
      <LargeTabs
        tabLabels={['General', 'Proposals']}
        tabContents={[
          <OpportunityGeneralCard />,
          <OpportunityProposalListCard />,
        ]}
      />
    </>
  );
}

export default OpportunityView;
