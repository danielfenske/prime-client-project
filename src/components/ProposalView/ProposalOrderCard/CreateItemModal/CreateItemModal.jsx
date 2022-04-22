import React, { useState, useEffect } from 'react';
import Modal from '../../../Miscellaneous/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function CreateItemModal({ open, setOpen }) {
  // const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const [unitWeight, setUnitWeight] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_UNIT_TYPE_LIST' });
  }, []);

  const unitTypeList = store.unitTypeReducer.unitTypeListReducer;

  //create an object to reflect multiple states onChange
  const initialValues = {
    item_code: '',
    name: '',
    description: '',
    price_per_price_unit: '',
    unit_type_id: '',
  };

  const [values, setValues] = useState(initialValues);

  //when a user enters input, the properties of the item object change
  const handleInputChange = (name, event) => {
    const { value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  //the unit_type_id property of the item object is set when a user selects one of the dropdown options
  const [unitInput, setUnitInput] = useState('1');

  const setUnitPair = (event) => {
    setUnitInput(event.target.value);
  };

  const handleTwoCalls = (event) => {
    handleInputChange('unit_type_id', event);
    setUnitPair(event);
  };

  //dispatch unit_weight data along with the item object if unit_weight has a value,
  //dispatch 0.01 for unit_weight if the measurement unit is LBS and the pricing unit is CWT,
  //dispatch 1 for unit_weight if the measurement unit and the pricing unit are the same
  //dispatch unit_weight * 0.01 if the pricing unit is CWT and the measurement unit is not LBS
  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.unit_type_id === 3) {
      dispatch({
        type: 'POST_ITEM',
        payload: {
          ...values,
          unit_weight: unitWeight,
        },
      });
      setValues(initialValues);
<<<<<<< HEAD

=======
>>>>>>> master
    } else if (values.unit_type_id === 8) {
      dispatch({
        type: 'POST_ITEM',
        payload: {
          ...values,
          unit_weight: unitWeight,
        },
      });
      setValues(initialValues);
    } else if (values.unit_type_id === 6) {
      dispatch({
        type: 'POST_ITEM',
        payload: {
          ...values,
          unit_weight: 0.01,
        },
      });
      setValues(initialValues);
    } else if (values.unit_type_id === 4) {
      dispatch({
        type: 'POST_ITEM',
        payload: {
          ...values,
          unit_weight: Number(unitWeight) * 0.01,
        },
      });
      setValues(initialValues);
    } else if (values.unit_type_id === 9) {
      dispatch({
        type: 'POST_ITEM',
        payload: {
          ...values,
          unit_weight: Number(unitWeight) * 0.01,
        },
      });
      setValues(initialValues);
    } else {
      dispatch({
        type: 'POST_ITEM',
        payload: {
          ...values,
          unit_weight: 1,
        },
      });
      setValues(initialValues);
    }
  };

  //set all values to empty strings when the user clicks on the cancel button
  const handleClick = () => {
    setValues(initialValues);
    setUnitWeight('');
    setOpen(false);
  };

  // console.log('unitTypeList is', unitTypeList);
  // console.log('unitInput is', unitInput);
  // console.log('values', values);
  // console.log('unitWeight', unitWeight);
  return (
    <Modal open={open}>
      <div className="modal-container">
        <div className="modal-icon"><AddCircleOutlineIcon style={{ fontSize: 100 }} /></div>
        <h2>Create New Item</h2>
        <div className="modal-form-container">
          <TextField fullWidth id="outlined-basic" label="Item Code" variant="outlined" size='small' value={values.item_code} onChange={(e) => handleInputChange("item_code", e)} />
          <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" size='small' value={values.name} onChange={(e) => handleInputChange("name", e)} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Measurement Unit & Pricing Unit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Measurement Unit & Pricing Unit"
              id="demo-simple-select" value={unitInput} onChange={handleTwoCalls}>
              <MenuItem>
                <ButtonGroup size="small" variant="text"><Button disabled style={{ color: 'var(--orange)' }}>Measuring Unit</Button><Button disabled style={{ color: 'var(--orange)' }}>Pricing Unit</Button></ButtonGroup>
              </MenuItem>
              {unitTypeList.map((type, index) => {
                return (
                  <MenuItem key={index} value={type.id}>
                    <ButtonGroup variant="outlined"><Button disabled style={{ color: 'var(--orange)' }}>{type.measurement_unit}</Button><Button disabled style={{ color: 'var(--orange)' }}>{type.pricing_unit}</Button></ButtonGroup>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* render the unit weight input field if the unit_type_id is 3 or 4 or 8 or 9 */}
          {unitInput === 3 &&
            <TextField fullWidth id="outlined-basic" type="number" label="Unit Weight LBS" variant="outlined" size='small' value={unitWeight} onChange={(event) => { setUnitWeight(event.target.value) }} />
          }
          {unitInput === 4 &&
            <TextField fullWidth id="outlined-basic" type="number" label="Unit Weight LBS" variant="outlined" size='small' value={unitWeight} onChange={(event) => { setUnitWeight(event.target.value) }} />
          }
          {unitInput === 8 &&
            <TextField fullWidth id="outlined-basic" type="number" label="Unit Weight LBS" variant="outlined" size='small' value={unitWeight} onChange={(event) => { setUnitWeight(event.target.value) }} />
          }
          {unitInput === 9 &&
            <TextField fullWidth id="outlined-basic" type="number" label="Unit Weight LBS" variant="outlined" size='small' value={unitWeight} onChange={(event) => { setUnitWeight(event.target.value) }} />
          }

          {/* render the pice per pricing unit input field if the unit_type_id is selected from the dropdown */}
          {unitInput !== "" &&
            <TextField fullWidth id="outlined-basic" type="number" size='small' label={`Price Per ${unitTypeList[unitInput]?.pricing_unit}`} variant="outlined" value={values.price_per_pricing_unit} onChange={(e) => handleInputChange("price_per_pricing_unit", e)} />
          }
        </div>
        <div className='modal-btn-container'>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant='contained'>
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateItemModal;
