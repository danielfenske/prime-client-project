import { useState } from 'react';
import ItemCard from '../ItemCard/ItemCard';

function HeadingCard(props) {
  const [messageInput, setMessageInput] = useState(props.message);
  const [nameInput, setNameInput] = useState(props.name);
  const [surchargeInput, setSurchargeInput] = useState(0);

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
            {item_headingPlaceholder.map((item, index) => {
              return <ItemCard key={index} {...item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadingCard;

const item_headingPlaceholder = [
  {
    id: 1,
    heading_id: 1,
    item_id: 1,
    order: 1,
    item_price: 3.33,
    qty_price_unit: 36,
    qty_measure_unit: 13.33,
    total_adj_price: 53.23,
  },
  {
    id: 2,
    heading_id: 1,
    item_id: null,
    order: null,
    item_price: null,
    qty_price_unit: null,
    qty_measure_unit: null,
    total_adj_price: null,
  },
];
