import LargeTabs from '../Miscellaneous/LargeTabs/LargeTabs';
import { useParams } from 'react-router-dom';
import ProposalOrderCard from './ProposalOrderCard/ProposalOrderCard';
import ProposalGeneralCard from './ProposalGeneralCard/ProposalGeneralCard';
import ProposalPreviewCard from './ProposalPreviewCard/ProposalPreviewCard';


function ProposalView() {
  return (
    <>
      <LargeTabs
        tabLabels={['General', 'Order', 'Preview']}
        tabContents={[
          <ProposalGeneralCard />,
          <ProposalOrderCard />,
          <ProposalPreviewCard />,
        ]}
      />
    </>
  );
}

export default ProposalView;
