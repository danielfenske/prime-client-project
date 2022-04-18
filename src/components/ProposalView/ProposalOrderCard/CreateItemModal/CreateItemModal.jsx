import React, { useState, useEffect } from 'react';
import Modal from '../../../Miscellaneous/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


function CreateItemModal(){
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const store = useSelector((store) => store);

    useEffect(() => {
      dispatch({type: "FETCH_UNIT_TYPE_LIST"})
    },[])

    const unitTypeList = store.unitTypeReducer.unitTypeListReducer;
    
    const initialValues = {
        item_code:"",
        name:"",
        description:"",
        price_per_price_unit:"",
        unit_type_id:"",
        unit_weight:""
      }
     
    const [values, setValues] = useState(initialValues);

 

    const handleInputChange = (name, event) => {
        
        const {value} = event.target;
     
        setValues({
          ...values,
          [name]: value,
        });
    }

    const setUnitPair = (event) => {
      setUnitInput(event.target.value)
    }
    
    const handleTwoCalls = (event) => {
      handleInputChange("unit_type_id", event);
      setUnitPair(event);
    }

    const [unitInput, setUnitInput] = useState("");


     
     const handleSubmit = (event) => {
      event.preventDefault();
      dispatch ({
        type:'POST_ITEM',
        payload: values
      })
     }
    console.log('unitTypeList is', unitTypeList);
    console.log('unitInput is', unitInput);
    console.log('values', values);
    return(
        <Modal open={open}>
        <h1>Add New Item</h1>
        <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="item code" variant="outlined" value={values.item_code} onChange={(e) => handleInputChange("item_code",e)} />
            <TextField id="outlined-basic" label="name" variant="outlined" value={values.name} onChange={(e) => handleInputChange("name", e)} />
            <TextField id="outlined-basic" label="description" variant="outlined" value={values.description} onChange={(e) => handleInputChange("description", e)} />
            <FormControl>
                <InputLabel id="demo-simple-select-label">measurement unit, pricing unit</InputLabel>
                    <Select
                     
                     labelId="demo-simple-select-label"
                     id="demo-simple-select" value={unitInput} label="UnitInput" onChange={handleTwoCalls}>
                     {unitTypeList.map((type, index) => {
                        return <MenuItem key={index} value={type.id}>{type.measurement_unit} {type.pricing_unit}</MenuItem>}
                     )}
                    </Select><br></br>
            </FormControl><br></br>
            
            <TextField id="outlined-basic" label={`${unitTypeList[unitInput]?.pricing_unit} per ${unitTypeList[unitInput]?.measurement_unit}`}   variant="outlined" value={values.unit_weight} onChange={(e) => handleInputChange("unit_weight", e)} />
           
            <TextField id="outlined-basic" label={`price per ${unitTypeList[unitInput]?.pricing_unit}`}variant="outlined" value={values.price_per_price_unit} onChange={(e) => handleInputChange("price_per_price_unit", e)} />
           
           
            <button type="submit">Add</button>
        </form>

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
   