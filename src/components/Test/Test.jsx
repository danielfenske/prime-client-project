// import components here:
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../Miscellaneous/Modal/Modal';

// link to the autocomplete
// https://mui.com/material-ui/react-autocomplete/


function Test() {

 const initialValues = {
   item_code:"",
   name:"",
   description:"",
   price_per_price_unit:"",
   unit_type_id:"",
   unit_weight:1
 }

 const [values, setValues] = useState(initialValues);

 const dispatch = useDispatch();

 const handleInputChange = (event) => {
   const {name, value} = event.target;

   setValues({
     ...values,
     [name]: value,
   });
 }

const handleSubmit = (event) => {
 event.preventDefault();
 dispatch ({
   type:'POST_ITEM',
   payload: values
 })
}

const [unitInput, setUnitInput] = useState(0);
const unit_types = [
  {
    measure: "FT",
    pricing: "FT"
  },
  {
    measure: "FT",
    pricing: "LBS"
  },
  {
    measure: "FT",
    pricing: "CW"
  }
]
  // const [open, setOpen] = useState(false);

  // const [search, setSearch] = useState('');

  // const words = ['One', 'Two', 'Three', 'Threees'];

  return (
    <>
      {/* Place components here */}
      {/* <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open
        </button> */}

        {/* input for filtering the list */}
        {/* <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul>
          {words
            // filter the list based off the input
            .filter((e) => {
              return e.toUpperCase().includes(search.toUpperCase());
            })
            .map((word, index) => {
              return <li key={index}>{word}</li>;
            })}
        </ul>
      </div>

      <Modal open={open}>
        <h1>Hello World</h1>
        <button
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </button>
      </Modal> */}

 <form onSubmit={handleSubmit}>
   <input 
    type="text"
    placeholder="item code"
    name="item_code"
    value={values.item_code}
    onChange={handleInputChange} />

<input 
    type="text"
    placeholder="name"
    name="name"
    value={values.name}
    onChange={handleInputChange} />

<input 
    type="text"
    placeholder="description"
    name="description"
    value={values.description}
    onChange={handleInputChange} />

<input 
    type="text"
    placeholder="price_per_price_unit"
    name="price_per_price_unit"
    value={values.price_per_price_unit}
    onChange={handleInputChange} />

{/* <input 
    type="text"
    placeholder="unit_type_id"
    name="unit_type_id"
    value={values.unit_type_id}
    onChange={handleInputChange} /> */}

    <select
      value={unitInput}
      onChange={(e) => setUnitInput(e.target.value)}
    >
      {unit_types.map((type, index) => {
        return <option key={index} value={index}>{type.measure} {type.pricing}</option>
      })}
    </select>

<input 
    type="text"
    placeholder={unit_types[unitInput].pricing + ' per ' + unit_types[unitInput].measure}
    name="unit_weight"
    value={values.unit_weight}
    onChange={handleInputChange} />


<button type="submit">ADD</button>

 </form>

      
    </>
  );
}

export default Test;
