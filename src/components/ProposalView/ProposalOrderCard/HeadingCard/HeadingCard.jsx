import { useState } from 'react';
import ItemCard from '../ItemCard/ItemCard';

function HeadingCard(props) {
  const [messageInput, setMessageInput] = useState(props.message);

  return (
    <>
      <div className='heading-card'>
        <div>
          <h2>Heading Information</h2>
          <p>{JSON.stringify(props)}</p>
          <input
            type='text'
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder='Message'
          />
        </div>
      </div>
    </>
  );
}

export default HeadingCard;
