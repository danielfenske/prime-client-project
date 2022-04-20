import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import HeadingItemCard from '../HeadingItemCard/HeadingItemCard';

function HeadingCard(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [messageInput, setMessageInput] = useState(props.message);
  const [nameInput, setNameInput] = useState(props.name);
  const [surchargeInput, setSurchargeInput] = useState(0);
  // const [itemId, setItemId] = useState('');

  // console.log('props', props);
 
  // console.log('props.id is', props.id);

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEM_LIST' });
    //When params is set, use below code instead 
    //dispatch({type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE', payload: Number(id)})
    dispatch({ type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE'});
  }, []);
  const items = useSelector((store) => store.itemReducer);
  const lineItemList = store.headingItemReducer.headingItemWithItemCodeReducer;
  
  

  const addNewLineItem = () => {
    console.log('in addNewLineItem');
    // console.log('itemID is', itemId);
    dispatch({type:'POST_HEADING_ITEM', payload: props.id})
  }

  

  // console.log('lineItemList is', lineItemList);


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

          {/* <select onChange={e => setItemId(e.target.value)}>
            {items.map((item, index) => {
            return <option key={index} value={item.id}>{item.item_code}</option>;
            })}
          </select> */}

          <button onClick={addNewLineItem}>Add Item</button>
          <div className='item-container'>
            {/* this item is a test */}
            {lineItemList.filter(lineItem => props.id === lineItem.heading_id).map((lineItem, index) => {
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
