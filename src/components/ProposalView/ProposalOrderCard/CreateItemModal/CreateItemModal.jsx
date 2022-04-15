import React, { useState, useEffect } from 'react';
import Modal from '../../../Miscellaneous/Modal/Modal';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';


function CreateItemModal(){
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();

    const initialValues = {
        item_code:"",
        name:"",
        description:"",
        price_per_price_unit:"",
        unit_type_id:"",
        unit_weight:""
      }
     
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
      dispatch({type: ""})
    })
    const handleInputChange = (event) => {
        
        const {name, value} = event.target;
     
        setValues({
          ...values,
          [name]: value,
        });
    }

    const [unitInput, setUnitInput] = useState(0);


     
     const handleSubmit = (event) => {
      event.preventDefault();
      dispatch ({
        type:'POST_ITEM',
        payload: values
      })
     }
     
    return(
        <Modal open={open}>
        <h1>Add New Item</h1>
        <form onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="item code" variant="outlined" value={values.item_code} onChange={handleInputChange} />
            <TextField id="outlined-basic" label="name" variant="outlined" value={values.name} onChange={handleInputChange} />
            <TextField id="outlined-basic" label="description" variant="outlined" value={values.description} onChange={handleInputChange} />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">units</InputLabel>
                    <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select" value={unitInput} label="UnitInput" onChange={event => setUnitInput(event.target.value)}>
                     {unit_type.map((type, index) => {
                        return <MenuItem key={index} value={index}>{type.measuring} {type.pricing}</MenuItem>}
                     )}
                    </Select><br></br>
            </FormControl><br></br>

           
           
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
   