import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateItemModal from '../CreateItemModal/CreateItemModal';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { SettingsPowerRounded } from '@mui/icons-material';
import Modal from '../../../Miscellaneous/Modal/Modal';
import DeleteModal from '../../../Miscellaneous/DeleteModal/DeleteModal';
import Button from '@mui/material/Button';

function HeadingItemCard({ lineItem }) {
  const items = useSelector((store) => store.itemReducer);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(lineItem.item_id);
  const [qty, setQty] = useState(lineItem.qty);
  const [measurement, setMeasurement] = useState(lineItem.measure_unit);
  const [order, setOrder] = useState(lineItem.order);
  const [ft, setFt] = useState(lineItem.ft);
  const [inches, setInches] = useState(lineItem.inches);
  const [pricePerPriceUnit, setPricePerPriceUnit] = useState(
    lineItem.override_price || lineItem.default_price,
  );

  const [open, setOpen] = useState(false);

  // console.log('lineItem is', lineItem);
  // console.log('items are', items);

  const handleItemSelect = (e) => {
    e.preventDefault();
    console.log('in handleItemSelect');
    setSelectedItem(e.target.value);
  };

  const updateQtyMeasurementOrderPricePerPriceUnit = (e) => {
    e.preventDefault();
    console.log('in updateQtyAndMeasurement');
    if (lineItem.measurement_unit === 'EA') {
      dispatch({
        type: 'UPDATE_HEADING_ITEM',
        payload: {
          heading_item_id: lineItem.id,
          qty: Number(qty),
          measure_unit: 1,
          order: Number(order),
          price_per_price_unit: Number(pricePerPriceUnit),
        },
      });
    } else if (lineItem.measurement_unit === 'FT') {
      dispatch({
        type: 'UPDATE_HEADING_ITEM_FT_INCHES',
        payload: {
          heading_item_id: lineItem.id,
          qty: Number(qty),
          ft: Number(ft),
          inches: Number(inches),
          order: Number(order),
          price_per_price_unit: Number(pricePerPriceUnit),
        },
      });
    } else {
      dispatch({
        type: 'UPDATE_HEADING_ITEM',
        payload: {
          heading_item_id: lineItem.id,
          qty: Number(qty),
          measure_unit: Number(measurement),
          order: Number(order),
          price_per_price_unit: Number(pricePerPriceUnit),
        },
      });
    }
  };

  const deleteLineItem = () => {
    console.log('in deleteLineItem');
    dispatch({ type: 'DELETE_HEADING_ITEM', payload: lineItem.id });
  };

  //move a line item up
  const goUp = () => {
    console.log('go Up');
    dispatch({
      type: 'MOVE_ORDER_UP',
      payload: { heading_id: lineItem.heading_id, order: Number(order) },
    });
  };

  //move a line item down
  const goDown = () => {
    console.log('go Down');
    dispatch({
      type: 'MOVE_ORDER_DOWN',
      payload: { heading_id: lineItem.heading_id, order: Number(order) },
    });
  };

  useEffect(() => {
    dispatch({
      type: 'UPDATE_HEADING_ITEM_ITEM_CODE',
      payload: { heading_item_id: lineItem.id, item_id: selectedItem },
    });
  }, [selectedItem]);

  useEffect(() => {
    setPricePerPriceUnit(lineItem.override_price || lineItem.default_price);
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

  // useEffect(() => {
  //   console.log('ft is', ft);
  //   console.log('inches is', inches);
  //   let convertedMeasure = Number(ft) + Number(inches) * 0.0833333;
  //   console.log(convertedMeasure);
  //   setMeasurement(convertedMeasure);
  //   console.log('measurement is', measurement);
  // }, [ft, inches])

  //  console.log('items', items);
  // //   console.log('selectedItem is', selectedItem);
  // console.log('line item', lineItem);

  return (
    <>
      <div className='heading-item-card'>
        <select value={selectedItem} onChange={handleItemSelect}>
          <option>CREATE NEW</option>
          {items.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.item_code}
              </option>
            );
          })}
        </select>
        <button onClick={goUp}>upward arrow</button>
        <button onClick={goDown}>downward arrow</button>

        <TextField
          id='outlined-basic'
          label='order'
          variant='outlined'
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
        {/* <TextField id="outlined-basic" label="item code" variant="outlined" value={lineItem.item_code} /> */}
        <p>Item Code: {lineItem.item_code}</p>
        {/* <TextField id="outlined-basic" label="item name" variant="outlined" value={lineItem.name} /> */}
        <p>Item Name: {lineItem.name}</p>
        <p>Item Description: {lineItem.description}</p>

        {lineItem?.measurement_unit === 'EA' ? (
          <></>
        ) : (
          <>
            {lineItem?.measurement_unit === 'FT' ? (
              <>
                <TextField
                  id='outlined-basic'
                  label='FT'
                  variant='outlined'
                  value={ft}
                  onChange={(e) => setFt(e.target.value)}
                />{' '}
                and
                <TextField
                  id='outlined-basic'
                  label='IN'
                  variant='outlined'
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                />{' '}
                per item
              </>
            ) : (
              <>
                <TextField
                  id='outlined-basic'
                  label={lineItem.measurement_unit + ' per item'}
                  variant='outlined'
                  value={measurement}
                  onChange={(e) => setMeasurement(e.target.value)}
                />
              </>
            )}
          </>
        )}

        <TextField
          id='outlined-basic'
          label='unit price'
          variant='outlined'
          value={pricePerPriceUnit}
          onChange={(e) => setPricePerPriceUnit(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='quantity'
          variant='outlined'
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          onKeyPress={newItemEnter}
        />
        <p> Single line item price: {lineItem.single_unit_price}</p>
        {/* <TextField id="outlined-basic" label="single item price" variant="outlined" value={singleUnitPrice} onChange={(e) => setSingleUnitPrice(e.target.value)} /> */}
        {/* <TextField id="outlined-basic" label="description" variant="outlined" value={lineItem.description} /> */}
        <p> Total line item price: {lineItem.total_item_price}</p>
        {/* <TextField id="outlined-basic" label="total price" variant="outlined" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} /> */}
        <button onClick={updateQtyMeasurementOrderPricePerPriceUnit}>
          SAVE
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          DELETE
        </button>
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
