import LargeTabs from '../Miscellaneous/LargeTabs/LargeTabs';

import ProposalOrderCard from './ProposalOrderCard/ProposalOrderCard';
import ProposalGeneralCard from './ProposalGeneralCard/ProposalGeneralCard';

function ProposalView() {
  return (
    <>
      <LargeTabs
        tabLabels={['General', 'Order', 'Preview']}
        tabContents={[<ProposalGeneralCard />, <ProposalOrderCard />, '']}
      />
    </>
  );
}

export default ProposalView;
