import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


function HeadingItemCard({ lineItem }) {
  const items = useSelector((store) => store.itemReducer);
  const dispatch = useDispatch();

  console.log('lineItem is', lineItem);
  console.log('items are', items);

  const handleItemSelect = () => {
    console.log('in handleItemSelect');

  }

  return (
    <div className='heading-item-card'>

      <select onChange={handleItemSelect}>
        {items.map((item, index) => {
          return <option key={index} value={item.id}>{item.item_code}</option>;
        })}
      </select>

      <TextField id="outlined-basic" label="item code" variant="outlined" value={lineItem.item_code} />
      <TextField id="outlined-basic" label="item name" variant="outlined" value={lineItem.name} />
      <TextField id="outlined-basic" label="measurement" variant="outlined" value={lineItem.measure_unit} />{lineItem.measurement_unit}
      <TextField id="outlined-basic" label="single item price" variant="outlined" value={lineItem.single_unit_price} />
      <TextField id="outlined-basic" label="description" variant="outlined" value={lineItem.description} />
      <TextField id="outlined-basic" label="quantity" variant="outlined" value={lineItem.qty} />
      <TextField id="outlined-basic" label="total price" variant="outlined" value={lineItem.total_item_price} />





      {/* {JSON.stringify(props)} */}
    </div>
  );
}

export default HeadingItemCard;
