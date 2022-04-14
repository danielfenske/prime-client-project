import ItemCard from '../ItemCard/ItemCard';

function HeadingCard({ id, name, message, proposal_id, surcharge, order }) {
  return (
    <>
      <div className='heading-card'>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default HeadingCard;
