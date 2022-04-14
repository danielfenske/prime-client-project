import React from 'react';
import { useDispatch } from "react-redux"
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '../Miscellaneous/Modal/Modal';

import './AddAccountForm.css'

function AddPartnerModal() {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [partner_code, setPartner_code] = useState('');
    const [rounding_type, setRounding_type] = useState('');
    const [phone_number, setPhone_number ]= useState('');
    const [address_line_1, setAddress_line_1] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

   

    const handleSubmit = () => {
        console.log('hello');
        // dispatch({
        //     type: 'POST_PARTNER',
        //     payload: {
        //         username,
        //         password,
        //         accountDescription,
        //         notes,
        //         url,
        //         folder,
        //     }
        // })
        handleClose();
        setName('');
        setType('');
        setPartner_code('');
        setRounding_type('');
        setPhone_number('');
        setAddress_line_1('');
        setCity('');
        setState('');
        setZip('');
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 6, 
    };


    return (
        <>
            <Button onClick={handleOpen}>Add Account</Button>
            <Modal
                aria-labelledby="modal-modal-title"
                open={open}
                onClose={handleClose}
            >
                <Box
                    component="form"
                    sx={style}
                    noValidate
                    autoComplete="off"
                >
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        // width='70%'
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2"> Add Partner </Typography>
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
                        <TextField // im confused as to what this is again, maybe i forgot
                            sx={{ mt: 2 }}
                            required
                            label="Rounding Type"
                            value={rounding_type}
                            onChange={(event) => setRounding_type(event.target.value)}
                        />
                          <TextField
                            sx={{ mt: 2 }}
                            required
                            label="Phone Number"
                            value={phone_number}
                            onChange={(event) => setPhone_number(event.target.value)}
                        />
                          <TextField
                            sx={{ mt: 2 }}
                            required
                            label="Address"
                            value={address_line_1}
                            onChange={(event) => setAddress_line_1(event.target.value)}
                        />
                        <TextField
                            sx={{ mt: 2 }}
                            required
                            label="City"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                         <TextField // should we just make a dropdown with a list of 2 letter states? or?
                            sx={{ mt: 2 }}
                            required
                            label="State"
                            value={state}
                            onChange={(event) => setState(event.target.value)}
                        />
                        <TextField 
                            sx={{ mt: 2 }}
                            required
                            label="Zip Code"
                            value={zip}
                            onChange={(event) => setZip(event.target.value)}
                        />
                        <Button onClick={handleSubmit} variant="outlined">Submit Account</Button>
                    </Grid>
                </Box>
            </Modal>
        </>
    )

}
export default AddPartnerModal;