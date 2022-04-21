import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeadingItemCard from '../HeadingItemCard/HeadingItemCard';
import CreateItemModal from '../CreateItemModal/CreateItemModal';

function HeadingCard(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [messageInput, setMessageInput] = useState(props.message);
  const [nameInput, setNameInput] = useState(props.name);
  const [surchargeInput, setSurchargeInput] = useState(props.surcharge);
  const [createItemModalOpen, setCreateItemModalOpen] = useState(false);
  const [checked, setChecked] = useState(props.taxable);

  console.log('props', props);
  // console.log('props.id is', props.id);

  useEffect(() => {
    dispatch({type: 'FETCH_ITEM_LIST'});
    dispatch({type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE', payload: props.id})
  }, []);

  // const items = useSelector((store) => store.itemReducer);
  const lineItemList = store.headingItemReducer.headingItemWithItemCodeReducer;
  const handleCheckbox = (e) => {
    console.log('checked is', checked);
    setChecked(!checked);
  }

  const addNewHeading = () => {
    console.log('save button clicked');
    dispatch({type: 'POST_HEADING', 
            payload: {name: nameInput,
                      message: messageInput,
                      proposal_id: props.proposal_id,
                      surcharge: surchargeInput,
                      taxable: checked}})
  }  

  const editHeading = () => {
    console.log('edit button clicked');
    dispatch({type: 'UPDATE_HEADING', 
            payload: {name: nameInput,
                      message: messageInput,
                      proposal_id: props.proposal_id,
                      surcharge: surchargeInput,
                      taxable: checked,
                      heading_id: props.id}})
  }

  const deleteHeading = () => {
    console.log('delete button clicked');
    dispatch({type: 'DELETE_HEADING', payload: {heading_id: props.id, proposal_id: props.proposal_id}}) 
  }

  const addNewLineItem = () => {
    // console.log('in addNewLineItem');
    // console.log('itemID is', itemId);
    dispatch({type:'POST_HEADING_ITEM', payload: props.id})
  }

  const addNewItem = () => {
    // console.log(('in addNewItem'));
    setCreateItemModalOpen(true);
  }
  

  return (
    <>
      <div className='heading-card'>
        <div>
          <h2>Heading Information</h2>

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
            surcharge
            <input
              name='surcharge'
              type='number'
              value={surchargeInput}
              onChange={(e) => setSurchargeInput(e.target.value)}
              placeholder='Surcharge'
            /> %
          </label>

          <label>
          <input
            type='checkbox'
            defaultChecked={checked}
            value={checked}
            onChange={handleCheckbox}
          />
          Taxable
          </label>
          <button onClick={addNewHeading}>SAVE</button>
          <button onClick={editHeading}>EDIT</button>
          <button onClick={deleteHeading}>DELETE</button>
        </div>
        <div>
          <h2>Items</h2>


          <button onClick={addNewLineItem}>Add New Line Item</button>
          <button onClick={addNewItem}>Add New Item</button>
          <CreateItemModal open={createItemModalOpen} setOpen={setCreateItemModalOpen}/>
          <div className='item-container'>
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
