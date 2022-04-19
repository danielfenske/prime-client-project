import React, { useState, useEffect } from 'react';
import Modal from '../../../Miscellaneous/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


function CreateItemModal( {show}) {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [unitWeight, setUnitWeight] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_UNIT_TYPE_LIST" })
  }, [])


  const unitTypeList = store.unitTypeReducer.unitTypeListReducer;

  //create an object to reflect multiple states onChange
  const initialValues = {
    item_code: "",
    name: "",
    description: "",
    price_per_price_unit: "",
    unit_type_id: ""
  }

  const [values, setValues] = useState(initialValues);

  //when a user enters input, the properties of the item object change
  const handleInputChange = (name, event) => {

    const { value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  //the unit_type_id property of the item object is set when a user selects one of the dropdown options 
  const [unitInput, setUnitInput] = useState("1");

  const setUnitPair = (event) => {
    setUnitInput(event.target.value)
  }

  const handleTwoCalls = (event) => {
    handleInputChange("unit_type_id", event);
    setUnitPair(event);
  }

  //dispatch unit_weight data along with the item object if unit_weight has a value, 
  //dispatch 0.01 for unit_weight if the measurement unit is LBS and the pricing unit is CWT,
  //dispatch 1 for unit_weight if the measurement unit and the pricing unit are the same
  const handleSubmit = (event) => {
    event.preventDefault();

    if (unitWeight != 0) {
      dispatch({
        type: 'POST_ITEM',
        payload: {
          ...values,
          unit_weight: unitWeight
        }
      })

      setValues(initialValues);
      setUnitWeight('');
    } else if (values.unit_type_id === 6) {
      dispatch({
        type: 'POST_ITEM',
        payload: {
          ...values,
          unit_weight: 0.01
        }
      })
      setValues(initialValues);
    } else {
      dispatch({
        type: 'POST_ITEM',
        payload: {
          ...values,
          unit_weight: 1
        }
      })
      setValues(initialValues);
    }
  }

  //set all values to empty strings when the user clicks on the cancel button
  const handleClick = () => {
    setValues(initialValues);
    setUnitWeight('');
  }

  console.log('unitTypeList is', unitTypeList);
  console.log('unitInput is', unitInput);
  console.log('values', values);
  console.log('unitWeight', unitWeight);
  return (
    <Modal open={open}>
      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit}>
        <TextField id="outlined-basic" label="item code" variant="outlined" value={values.item_code} onChange={(e) => handleInputChange("item_code", e)} />
        <TextField id="outlined-basic" label="name" variant="outlined" value={values.name} onChange={(e) => handleInputChange("name", e)} />
        <TextField id="outlined-basic" label="description" variant="outlined" value={values.description} onChange={(e) => handleInputChange("description", e)} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">measurement unit, pricing unit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select" value={unitInput} onChange={handleTwoCalls}>
            {unitTypeList.map((type, index) => {
              return <MenuItem key={index} value={type.id}>{type.measurement_unit} {type.pricing_unit}</MenuItem>
            }
            )}
          </Select><br></br>
        </FormControl><br></br>
        
        {/* render the unit weight input field if the unit_type_id is 3 or 4 or 8 or 9 */}
        {unitInput === 3 &&
          <TextField id="outlined-basic" label={`${unitTypeList[unitInput]?.pricing_unit} per ${unitTypeList[unitInput]?.measurement_unit}`} variant="outlined" value={unitWeight} onChange={(event) => { setUnitWeight(event.target.value) }} />
        }
        {unitInput === 4 &&
          <TextField id="outlined-basic" label={`${unitTypeList[unitInput]?.pricing_unit} per ${unitTypeList[unitInput]?.measurement_unit}`} variant="outlined" value={unitWeight} onChange={(event) => { setUnitWeight(event.target.value) }} />
        }
        {unitInput === 8 &&
          <TextField id="outlined-basic" label={`${unitTypeList[unitInput]?.pricing_unit} per ${unitTypeList[unitInput]?.measurement_unit}`} variant="outlined" value={unitWeight} onChange={(event) => { setUnitWeight(event.target.value) }} />
        }
        {unitInput === 9 &&
          <TextField id="outlined-basic" label={`${unitTypeList[unitInput]?.pricing_unit} per ${unitTypeList[unitInput]?.measurement_unit}`} variant="outlined" value={unitWeight} onChange={(event) => { setUnitWeight(event.target.value) }} />
        }

        {/* render the pice per pricing unit input field if the unit_type_id is selected from the dropdown */}
        {unitInput !== "" &&
          <TextField id="outlined-basic" label={`price per ${unitTypeList[unitInput]?.pricing_unit}`} variant="outlined" value={values.price_per_price_unit} onChange={(e) => handleInputChange("price_per_price_unit", e)} />
        }

        <button type="submit">Add Item</button>
      </form>
      <button onClick={handleClick}>Cancel</button>

      <button
        onClick={() => {
          setOpen(false);
        }}
      >
        Close
      </button>
    </Modal>
  );
}

export default CreateItemModal;
