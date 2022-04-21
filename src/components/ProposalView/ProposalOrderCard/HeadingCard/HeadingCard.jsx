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
import CreateItemModal from '../CreateItemModal/CreateItemModal';
import { LockTwoTone } from '@mui/icons-material';

function HeadingCard(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [messageInput, setMessageInput] = useState(props.message);
  const [nameInput, setNameInput] = useState(props.name);
  const [surchargeInput, setSurchargeInput] = useState(props.surcharge);
  const [createItemModalOpen, setCreateItemModalOpen] = useState(false);
  const [checked, setChecked] = useState(props.taxable);


  // console.log('props', props);
  // console.log('props.id is', props.id);

  const lineItemList = store.headingItemReducer.headingItemWithItemCodeReducer;
  // console.log('lineItemList is', Number(lineItemList[0].total_item_price));

  // const sumLineItem = () => {
  //   let result = 0;
  //   for (let i = 0; i < lineItemList.length; i++){
  //     result += Number(lineItemList[i].total_item_price);
  //   }

  //   return result;
  // }

  // console.log('result is', sumLineItem());

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEM_LIST' });
    dispatch({ type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE', payload: props.id })
    // sumLineItem();
  }, []);

  // useEffect(() => {
  //  sumLineItem();
  // }, [lineItemList])


  const handleCheckbox = (e) => {
    console.log('checked is', checked);
    setChecked(!checked);
  }

  const addNewHeading = () => {
    console.log('save button clicked');
    dispatch({
      type: 'POST_HEADING',
      payload: {
        name: nameInput,
        message: messageInput,
        proposal_id: props.proposal_id,
        surcharge: surchargeInput,
        taxable: checked
      }
    })
  }

  const editHeading = () => {
    console.log('edit button clicked');
    dispatch({
      type: 'UPDATE_HEADING',
      payload: {
        name: nameInput,
        message: messageInput,
        proposal_id: props.proposal_id,
        surcharge: surchargeInput,
        taxable: checked,
        heading_id: props.id
      }
    })
  }

  const deleteHeading = () => {
    console.log('delete button clicked');
    dispatch({ type: 'DELETE_HEADING', payload: { heading_id: props.id, proposal_id: props.proposal_id } })
  }

  const addNewLineItem = () => {
    // console.log('in addNewLineItem');
    // console.log('itemID is', itemId);
    dispatch({ type: 'POST_HEADING_ITEM', payload: props.id })
  }

  const saveHeadingInfo = () => {
    console.log('in saveHeadingInfo');
  }

  const addNewItem = () => {
    // console.log(('in addNewItem'));
    setCreateItemModalOpen(true);
  }

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
          <label>
            <input
              type='checkbox'
              defaultChecked={checked}
              value={checked}
              onChange={handleCheckbox}
            />
            Taxable
          </label>
        </div>
      </div>
      <div className='card-body'>
        <div className="item-card-section">
          <div className="item-header-container">
              <h1>Proposal Items</h1>
              <Button variant="contained" size='small' onClick={addNewLineItem}>Add Line Item</Button>
          </div>
          <div>
            {lineItemList.filter(lineItem => props.id === lineItem.heading_id).map((lineItem, index) => {
              return <HeadingItemCard key={index} lineItem={lineItem} addNewItem={addNewItem} />;
            })}
          </div>
        </div>
      </div>
      <CreateItemModal open={createItemModalOpen} setOpen={setCreateItemModalOpen} />
    </>
  );
}

export default HeadingCard;
