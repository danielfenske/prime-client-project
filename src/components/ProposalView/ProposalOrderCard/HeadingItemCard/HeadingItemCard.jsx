import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateItemModal from '../CreateItemModal/CreateItemModal';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { PropaneSharp, SettingsPowerRounded } from '@mui/icons-material';
import Modal from '../../../Miscellaneous/Modal/Modal';
import DeleteModal from '../../../Miscellaneous/DeleteModal/DeleteModal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DeleteIcon from '@mui/icons-material/Delete';
import './HeadingItemCard.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function HeadingItemCard({ lineItem, addNewItem }) {
  console.log('Line Item is', lineItem);
  const items = useSelector((store) => store.itemReducer);
  const saveTrigger = useSelector((store) => store.triggerSave);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(lineItem.item_id);
  const [qty, setQty] = useState(lineItem.qty);
  const [measurement, setMeasurement] = useState(lineItem.measurement_per_unit);
  // const [order, setOrder] = useState(lineItem.order);
  const [ft, setFt] = useState(lineItem.ft);
  const [inches, setInches] = useState(lineItem.inches);
  const [message, setMessage] = useState(lineItem.message);
  const [pricePerPricingUnit, setPricePerPricingUnit] = useState(
    lineItem.override_price || lineItem.default_price,
  );

  const isInitialMount = useRef(true);
  useEffect(() => {
    // this will stop the hook from running on the initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    console.log('Saving item');
    updateLineItem();
  }, [saveTrigger]);

  const [open, setOpen] = useState(false);

  // console.log('lineItem is', lineItem);
  // console.log('items are', items);

  const handleItemSelect = (e) => {
    e.preventDefault();
    console.log('in handleItemSelect');
    setSelectedItem(e.target.value);
  };

  const updateLineItem = (e) => {
    e?.preventDefault();
    console.log('in updateLineItem', lineItem);
    if (lineItem.measurement_unit === 'EA') {
      //dispatch 1 as measurement_per_unit when the measurement_unit is EA
      dispatch({
        type: 'UPDATE_HEADING_ITEM',
        payload: {
          heading_item_id: lineItem.id,
          qty: Number(qty),
          measurement_per_unit: 1,
          price_per_pricing_unit: Number(pricePerPricingUnit),
          message: message,
        },
      });
    } else if (lineItem.measurement_unit === 'FT') {
      //dispatch ft and inches when the measurement_unit is FT
      dispatch({
        type: 'UPDATE_HEADING_ITEM_FT_INCHES',
        payload: {
          heading_item_id: lineItem.id,
          qty: Number(qty),
          ft: Number(ft),
          inches: Number(inches),
          price_per_pricing_unit: Number(pricePerPricingUnit),
          message: message,
        },
      });
    } else {
      dispatch({
        type: 'UPDATE_HEADING_ITEM',
        payload: {
          heading_item_id: lineItem.id,
          qty: Number(qty),
          measurement_per_unit: Number(measurement),
          price_per_pricing_unit: Number(pricePerPricingUnit),
          message: message,
        },
      });
    }
  };

  const deleteLineItem = () => {
    console.log('in deleteLineItem');
    dispatch({ type: 'DELETE_HEADING_ITEM', payload: lineItem.id });
    setOpen(false);
  };

  //move a line item up
  // const goUp = () => {
  //   console.log('go Up');
  //   dispatch({
  //     type: 'MOVE_ORDER_UP',
  //     payload: { heading_id: lineItem.heading_id, order: Number(order) },
  //   });
  // };

  // //move a line item down
  // const goDown = () => {
  //   console.log('go Down');
  //   dispatch({
  //     type: 'MOVE_ORDER_DOWN',
  //     payload: { heading_id: lineItem.heading_id, order: Number(order) },
  //   });
  // };

  const secondInitialMount = useRef(true);
  useEffect(() => {
    if (secondInitialMount.current) {
      secondInitialMount.current = false;
      return;
    }

    dispatch({
      type: 'UPDATE_HEADING_ITEM_ITEM_CODE',
      payload: { heading_item_id: lineItem.id, item_id: selectedItem },
    });
  }, [selectedItem]);

  useEffect(() => {
    setPricePerPricingUnit(lineItem.override_price || lineItem.default_price);
  }, [lineItem]);

  /////////////////////////////////////
  // Press Enter Key to add new Item
  /////////////////////////////////////

  const newItemEnter = (e) => {
    // type:'POST_HEADING_ITEM', payload: props.id
    if (e.key === 'Enter') {
      // console.log('you clicked enter');
      // console.log('itemid is:', lineItem.id);
      dispatch({
        type: 'POST_HEADING_ITEM',
        payload: lineItem.heading_id,
      });
    }
  };

  return (
    <>
      <div className='heading-item-card'>
        <div className='item-card-top'>
          <p>
            <strong>Code:</strong> {lineItem.item_code}
          </p>
          <p>
            <strong>Name:</strong> {lineItem.name}
          </p>
          <p>
            {' '}
            <strong>Price per item:</strong> $
            {Number(lineItem.single_item_price).toLocaleString('en-US') || 0}
          </p>
          <p>
            <strong>Total price:</strong> $
            {Number(lineItem.item_price_total).toLocaleString('en-US') || 0}
          </p>
        </div>

        <div className='item-card-bottom'>
          <div className='bottom-left'>
            <FormControl>
              <InputLabel id='demo-simple-select-label'>Item List</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Method'
                value={selectedItem}
                onChange={handleItemSelect}
                size='small'
                style={{ width: 125 }}
              >
                {items.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.id}>
                      {item.item_code}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              variant='text'
              size='small'
              className='add-item-btn'
              onClick={addNewItem}
            >
              New Item <AddCircleOutlineIcon fontSize='small' />
            </Button>
          </div>

          <div className='bottom-middle'>
            <div className='item-measurements'>
              {lineItem?.measurement_unit === 'EA' ? (
                <></>
              ) : (
                <>
                  {lineItem?.measurement_unit === 'FT' ? (
                    <>
                      <TextField
                        id='outlined-basic'
                        type='number'
                        label="FT'"
                        variant='outlined'
                        autoComplete='off'
                        value={ft}
                        onChange={(e) => setFt(e.target.value)}
                        size='small'
                        style={{ width: 75 }}
                      />
                      <div className='measurement-container'>
                        <TextField
                          id='outlined-basic'
                          type='number'
                          label='IN"'
                          variant='outlined'
                          autoComplete='off'
                          value={inches}
                          onChange={(e) => setInches(e.target.value)}
                          size='small'
                          style={{ width: 75 }}
                        />
                        per item
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='measurement-container'>
                        <TextField
                          id='outlined-basic'
                          type='number'
                          label={'LBS'}
                          variant='outlined'
                          autoComplete='off'
                          value={measurement}
                          onChange={(e) => setMeasurement(e.target.value)}
                          size='small'
                          style={{ width: 75 }}
                        />
                        per item
                      </div>
                    </>
                  )}
                </>
              )}
              <TextField
                id='outlined-basic'
                label='Unit Price ($)'
                type='number'
                variant='outlined'
                autoComplete='off'
                value={pricePerPricingUnit}
                onChange={(e) => setPricePerPricingUnit(e.target.value)}
                size='small'
                style={{ width: 125 }}
              />
              <TextField
                id='outlined-basic'
                label='QTY'
                type='number'
                variant='outlined'
                autoComplete='off'
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                onKeyPress={newItemEnter}
                size='small'
                style={{ width: 125 }}
              />
            </div>
            <div className='item-message'>
              <TextField
                id='outlined-basic'
                label='Item Message'
                variant='outlined'
                autoComplete='off'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                size='small'
                fullWidth
              />
            </div>
          </div>

          <div className='bottom-right'>
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        {/* <div className="item-arrows">
            <IconButton onClick={goUp}><ArrowCircleUpIcon/></IconButton>
            <IconButton onClick={goDown}><ArrowCircleDownIcon/></IconButton>
          </div> */}

        {/* <TextField
          id='outlined-basic'
          label='order'
          variant='outlined'
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        /> */}
        {/* <TextField id="outlined-basic" label="item code" variant="outlined" value={lineItem.item_code} /> */}
        {/* <p>Item Code: {lineItem.item_code}</p> */}
        {/* <TextField id="outlined-basic" label="item name" variant="outlined" value={lineItem.name} /> */}
        {/* <p>Item Name: {lineItem.name}</p>
        <p>Item Description: {lineItem.description}</p> */}
        {/* <p> Single line item price: {lineItem.single_unit_price}</p> */}
        {/* <TextField id="outlined-basic" label="single item price" variant="outlined" value={singleUnitPrice} onChange={(e) => setSingleUnitPrice(e.target.value)} /> */}
        {/* <TextField id="outlined-basic" label="description" variant="outlined" value={lineItem.description} /> */}
        {/* <p> Total line item price: {lineItem.total_item_price}</p> */}
        {/* <TextField id="outlined-basic" label="total price" variant="outlined" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} /> */}
        {/* <button onClick={updateQtyMeasurementOrderpricePerPricingUnit}>
          SAVE
        </button>*/}
      </div>

      <Modal open={open} className='modal-container'>
        <DeleteModal />
        <div className='modal-btn-container'>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant='outlined'
          >
            Cancel
          </Button>
          <Button onClick={deleteLineItem} variant='contained'>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default HeadingItemCard;
