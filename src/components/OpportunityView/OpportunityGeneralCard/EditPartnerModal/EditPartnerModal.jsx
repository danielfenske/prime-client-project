import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '../../../Miscellaneous/Modal/Modal';



function EditPartnerModal({ open, setOpen}) {

    const editablePartner = useSelector((store) => store.partnerReducer.partnerEditReducer);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [partner_code, setPartner_code] = useState('');
    const [partner_discount, setPartner_discount] = useState('');
    const [rounding_type, setRounding_type] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [address_line_1, setAddress_line_1] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    // const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch({
            type: 'UPDATE_PARTNER',
            payload: {
                name,
                type,
                partner_code,
                partner_discount,
                rounding_type,
                phone_number,
                address_line_1,
                city,
                state,
                zip,
                disabled: false,
            }
        })
        setName('');
        setType('');
        setPartner_code('');
        setPartner_discount('');
        setRounding_type('');
        setPhone_number('');
        setAddress_line_1('');
        setCity('');
        setState('');
        setZip('');
    }


    return (
        <>
         {/* <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open
        </button> */}
            <Modal open={open}>
            <form onSubmit={handleSubmit}>
                    <TextField
                        sx={{ mt: 2 }}
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        label="Type"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        label="Partner Code"
                        value={partner_code}
                        onChange={(event) => setPartner_code(event.target.value)}
                    />
                    <TextField 
                        sx={{ mt: 2 }}
                        required
                        label="Partner Discount"
                        value={partner_discount}
                        onChange={(event) => setPartner_discount(event.target.value)}
                    />
                    <TextField // im confused as to what this is again, maybe i forgot
                        sx={{ mt: 2 }}
                        required
                        label="Rounding Type"
                        value={rounding_type}
                        onChange={(event) => setRounding_type(event.target.value)}
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        
                        label="Phone Number"
                        value={phone_number}
                        onChange={(event) => setPhone_number(event.target.value)}
                    />
                    <TextField
                        sx={{ mt: 2 }}
                      
                        label="Address"
                        value={address_line_1}
                        onChange={(event) => setAddress_line_1(event.target.value)}
                    />
                    <TextField
                        sx={{ mt: 2 }}
                      
                        label="City"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                    />
                    <TextField // should we just make a dropdown with a list of 2 letter states? or?
                        sx={{ mt: 2 }}
                        
                        label="State"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        
                        label="Zip Code"
                        value={zip}
                        onChange={(event) => setZip(event.target.value)}
                    />
                     <button type="submit">Submit Edited Partner</button>
                </form>
                <button
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    Close
                </button>
            </Modal>
        </>
    )

}
export default EditPartnerModal;