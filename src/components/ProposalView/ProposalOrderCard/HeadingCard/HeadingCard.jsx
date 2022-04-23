import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import HeadingItemCard from '../HeadingItemCard/HeadingItemCard';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import './HeadingCard.css';
import CreateItemModal from '../CreateItemModal/CreateItemModal';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

function HeadingCard(props) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [messageInput, setMessageInput] = useState(props.message);
  const [nameInput, setNameInput] = useState(props.name);
  const [surchargeInput, setSurchargeInput] = useState(props.surcharge);
  const [createItemModalOpen, setCreateItemModalOpen] = useState(false);
  const [checked, setChecked] = useState(props.taxable);

  const allProposal = useSelector((store) => store.proposalEverything);
  const { id } = useParams();


  // console.log('props', props);
  // console.log('proposal id is', props.proposal_id);
  // console.log('heading id is',props.id);
 
  const lineItemList = useSelector(
    (store) => store.headingItemReducer.headingItemWithItemCodeReducer,
  );
  console.log('lineItemList is', lineItemList);

  const sumLineItem = () => {
    let result = 0;
    for (let i = 0; i < lineItemList.length; i++){
      if(props.id === lineItemList[i].heading_id){
      result += Number(lineItemList[i].item_price_total)
      };
    }
    return result;
  }

  const [headingTotal, setHeadingTotal] = useState(sumLineItem()); 
  console.log('result is', sumLineItem());

  useEffect(() => {
    dispatch({ type: 'FETCH_ITEM_LIST' });
    dispatch({ type: 'FETCH_HEADING_ITEMS_WITH_ITEM_CODE', payload: props.id });

    dispatch({
      type: 'GET_PROPOSAL_EVERYTHING',
      payload: id,
    });
  }, []);

  useEffect(() => {
  setHeadingTotal(sumLineItem());
  }, [lineItemList])

  const handleCheckbox = (e) => {
    console.log('checked is', checked);
    setChecked(!checked);
  };

  const addNewHeading = () => {
    console.log('save button clicked');
    dispatch({
      type: 'POST_HEADING',
      payload: {
        name: nameInput,
        message: messageInput,
        proposal_id: props.proposal_id,
        surcharge: surchargeInput,
        taxable: checked,
      },
    });
  };

  const editHeading = () => {
    console.log('edit button clicked');

    // this dispatch will trigger a save on all the items
    dispatch({
      type: 'TRIGGER_ITEM_SAVE',
    });

    dispatch({
      type: 'UPDATE_HEADING',
      payload: {
        name: nameInput,
        message: messageInput,
        proposal_id: props.proposal_id,
        surcharge: surchargeInput,
        taxable: checked,
        heading_id: props.id,
      },
    });
    
   
  };

  const deleteHeading = () => {
    console.log('delete button clicked');
    dispatch({
      type: 'DELETE_HEADING',
      payload: { heading_id: props.id, proposal_id: props.proposal_id },
    });
  };

  const addNewLineItem = () => {
    // console.log('in addNewLineItem');
    // console.log('itemID is', itemId);
    dispatch({ type: 'POST_HEADING_ITEM', payload: props.id });
  };

  const saveHeadingInfo = () => {
    console.log('in saveHeadingInfo');
  };

  const addNewItem = () => {
    // console.log(('in addNewItem'));
    setCreateItemModalOpen(true);
  };

  return (
    <>
      <div className='heading-container' id='heading-card-header'>
        <div className='heading-text-container'>
          <h1>Heading Information</h1>
          <IconButton onClick={deleteHeading}>
            {/* <SaveOutlinedIcon sx={{ color: 'var(--grey-dark)' }} /> */}
            <DeleteIcon />
          </IconButton>

          <div className='save-button-container'>
            <Button variant='contained' size='small' onClick={editHeading}>
              Save Progress
            </Button>
          </div>
        </div>
        <div className='input-container'>
          <div className='left-inputs'>
            <TextField
              id='outlined-basic'
              label='Heading Name'
              variant='outlined'
              autoComplete="off"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              size='small'
              style={{ width: 150 }}
            />
            <TextField
              id='outlined-basic'
              label='Heading Message'
              variant='outlined'
              autoComplete="off"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              size='small'
              style={{ width: 225 }}
            />
            <TextField
              type='number'
              id='outlined-basic'
              label='Surcharge (%)'
              variant='outlined'
              autoComplete="off"
              value={surchargeInput}
              onChange={(e) => setSurchargeInput(e.target.value)}
              size='small'
              style={{ width: 100 }}
            />
          </div>
          <TextField
            // fullWidth
            type='number'
            id='outlined-basic'
            label='Total Price ($)'
            variant='outlined'
            autoComplete="off"
            value={headingTotal}
            size='small'
          />
        </div>

        <FormGroup className='checkbox'>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={checked}
                value={checked}
                onChange={handleCheckbox}
              />
            }
            label='Taxable'
          />
        </FormGroup>
        {/* <label>
          <input
            type='checkbox'
            defaultChecked={checked}
            value={checked}
            onChange={handleCheckbox}
          />
          Taxable
        </label> */}
      </div>
      <div className='card-body'>
        <div className='item-card-section'>
          <div className='item-header-container'>
            <h1>Proposal Items</h1>
            <Button variant='contained' size='small' onClick={addNewLineItem}>
              Add Line Item
            </Button>
          </div>
          <div>
            {lineItemList
              .filter((lineItem) => props.id === lineItem.heading_id)
              .sort((a, b) => a.id - b.id)
              .map((lineItem, index) => {
                return (
                  <HeadingItemCard
                    key={index}
                    lineItem={lineItem}
                    addNewItem={addNewItem}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <CreateItemModal
        open={createItemModalOpen}
        setOpen={setCreateItemModalOpen}
      />
    </>
  );
}

export default HeadingCard;
