import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateItemModal from '../CreateItemModal/CreateItemModal';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { SettingsPowerRounded } from '@mui/icons-material';


function HeadingItemCard({ lineItem }) {
  const items = useSelector((store) => store.itemReducer);
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(1);
  const [qty, setQty] = useState(lineItem.qty);
  const [measurement, setMeasurement] = useState(lineItem.measure_unit);
  const [order, setOrder] = useState(lineItem.order);
 

  console.log('lineItem is', lineItem);
  console.log('items are', items);

  const handleItemSelect = (e) => {
    e.preventDefault();
    console.log('in handleItemSelect');
    setSelectedItem(e.target.value);
   
  }
 
  const updateQtyMeasurementOrder = (e) => {
    e.preventDefault();
    console.log('in updateQtyAndMeasurement');
    dispatch({type: 'UPDATE_HEADING_ITEM', payload: {heading_item_id: lineItem.id, qty:Number(qty), measure_unit:Number(measurement), order: Number(order)}})
  }

  const deleteLineItem = () => {
    console.log('in deleteLineItem');
    dispatch({type: 'DELETE_HEADING_ITEM', payload: lineItem.id});
  }

  const goUp = () => {
    console.log('go Up');
    dispatch({type: 'MOVE_ORDER_UP', payload: {heading_id: lineItem.heading_id, order: Number(order)}})
  }
  const goDown = () => {
    console.log('go Down');
    dispatch({type: 'MOVE_ORDER_DOWN', payload: {heading_id: lineItem.heading_id, order: Number(order)}})
  }

  useEffect(() => {
    if(selectedItem !== 'create new'){
    dispatch({type:'UPDATE_HEADING_ITEM_ITEM_CODE', payload: {heading_item_id: lineItem.id, item_id: selectedItem }})
    }
  }, [selectedItem])

  console.log('selectedItem is', selectedItem);
console.log('line item', lineItem);
 
  return (
    <div className='heading-item-card'>

      <select value={selectedItem} onChange={handleItemSelect}>
      <option value="create new">CREATE NEW</option>
        {items.map((item, index) => {
          return <option key={index} value={item.id}>{item.item_code}</option>;
        })}
      </select>
      <button onClick={goUp}>upward arrow</button>
      <button  onClick={goDown}>downward arrow</button>
    
      <TextField id="outlined-basic" label="order" variant="outlined" value={order}  onChange={e => setOrder(e.target.value)} />
      <TextField id="outlined-basic" label="item code" variant="outlined" value={lineItem.item_code} />
      <TextField id="outlined-basic" label="item name" variant="outlined" value={lineItem.name} />
      <TextField id="outlined-basic" label="measurement" variant="outlined" value={measurement} onChange={e => setMeasurement(e.target.value)}/>{lineItem.measurement_unit}
      <TextField id="outlined-basic" label="single item price" variant="outlined" value={lineItem.single_unit_price} />
      <TextField id="outlined-basic" label="description" variant="outlined" value={lineItem.description} />
      <TextField id="outlined-basic" label="quantity" variant="outlined" value={qty} onChange={e => setQty(e.target.value)} />
      <TextField id="outlined-basic" label="total price" variant="outlined" value={lineItem.total_item_price} />
      <button onClick={updateQtyMeasurementOrder}>SAVE</button>
      <button onClick={deleteLineItem}>DELETE</button>

 


    </div>
  );
}

export default HeadingItemCard;
