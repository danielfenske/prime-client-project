import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HeadingItemCard from '../HeadingItemCard/HeadingItemCard';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import './HeadingCard.css';

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
    dispatch({ type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE' });
  }, []);
  const items = useSelector((store) => store.itemReducer);
  const lineItemList = store.headingItemReducer.headingItemWithItemCodeReducer;



  const addNewLineItem = () => {
    console.log('in addNewLineItem');
    // console.log('itemID is', itemId);
    dispatch({ type: 'POST_HEADING_ITEM', payload: props.id })
  }

  const saveHeadingInfo = () => {
    console.log('in saveHeadingInfo');
  }


  // console.log('lineItemList is', lineItemList);


  return (
    <>
      <div className="card-header" id='heading-card-header'>
        <div className="heading-header-container">
          <div className="heading-text-container">
            <h1>Heading Information</h1>
            <div>
              <IconButton><SaveOutlinedIcon sx={{ color: 'var(--grey-dark)' }} /></IconButton>
              <Button>Save Progress</Button>
            </div>
          </div>
          <div className="form-container" id="heading-form-container">
            <TextField
              id='outlined-basic'
              label='Heading Name'
              variant='outlined'
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              size='small'
              style={{ width: 150 }}
            />
            <TextField
              id='outlined-basic'
              label='Heading Message'
              variant='outlined'
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              size='small'
              style={{ width: 225 }}
            />
            <TextField
              type="number"
              id='outlined-basic'
              label='Surcharge (%)'
              variant='outlined'
              value={surchargeInput}
              onChange={(e) => setSurchargeInput(e.target.value)}
              size='small'
              style={{ width: 100 }}
            />
          </div>
        </div>
        <div className="heading-header-container" id="price-container">
          <h1><span className="heading-price">Heading Price</span></h1>
          <TextField
            fullWidth
            type="number"
            id='outlined-basic'
            label='Total Price ($)'
            variant='outlined'
            value={surchargeInput}
            onChange={(e) => setSurchargeInput(e.target.value)}
            size='small'
          />
        </div>
      </div>
      <div className='card-body'>
        <div className="card-section">
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
