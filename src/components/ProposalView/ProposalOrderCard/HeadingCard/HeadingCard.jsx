import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeadingItemCard from '../HeadingItemCard/HeadingItemCard';

function HeadingCard(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [messageInput, setMessageInput] = useState(props.message);
  const [nameInput, setNameInput] = useState(props.name);
  const [surchargeInput, setSurchargeInput] = useState(0);
  

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEM_LIST' });
    // dispatch({ type: 'FETCH_HEADING_ITEM_LIST' });
    dispatch({ type: 'FETCH_HEADING_ITEM_WITH_ITEM_CODE'});
  }, []);

  const lineItemList = store.headingItemReducer.headingItemWithItemCodeReducer;


  console.log('lineItemList is', lineItemList);


  return (
    <>
      <div className='heading-card'>
        <div>
          <h2>Heading Information</h2>
          {/* <p>{JSON.stringify(props)}</p> */}

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
            {lineItemList.map((lineItem, index) => {
              return <div key={index}>
               <HeadingItemCard lineItem={lineItem} />
              </div>
            })}
          
          </div>
        </div>
      </div>
    </>
  );
}

export default HeadingCard;
