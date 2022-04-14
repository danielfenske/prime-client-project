import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ItemCard from '../ItemCard/ItemCard';

function HeadingCard(props) {
  const dispatch = useDispatch();

  const [messageInput, setMessageInput] = useState(props.message);
  const [nameInput, setNameInput] = useState(props.name);
  const [surchargeInput, setSurchargeInput] = useState(0);

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEM_LIST' });
  }, []);

  return (
    <>
      <div className='heading-card'>
        <div>
          <h2>Heading Information</h2>
          <p>{JSON.stringify(props)}</p>

          <input
            type='text'
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder='Header Name'
          />

          <input
            type='text'
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder='Message'
          />

          <label htmlFor='surcharge'>
            $
            <input
              name='surcharge'
              type='number'
              value={surchargeInput}
              onChange={(e) => setSurchargeInput(e.target.value)}
              placeholder='Surcharge'
            />
          </label>
        </div>
        <div>
          <h2>Items</h2>
          <button>Add Item</button>
          <div className='item-container'>
            {/* this item is a test */}
            <ItemCard {...{ test: 'Testing' }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadingCard;
