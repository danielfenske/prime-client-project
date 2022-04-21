import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '../../../Miscellaneous/Modal/Modal';



function EditPartnerModal({ open, setOpen }) {

    const editablePartner = useSelector((store) => store.partnerReducer.partnerEditReducer);
    const editablePartnerID = useSelector((store) => store.partnerReducer.partnerEditReducer.id);

    const [name, setName] = useState(editablePartner.name);
    const [type, setType] = useState(editablePartner.type);
    const [partner_code, setPartner_code] = useState(editablePartner.partner_code);
    const [partner_discount, setPartner_discount] = useState(editablePartner.partner_discount);
    const [rounding_type, setRounding_type] = useState(editablePartner.rounding_type);
    const [phone_number, setPhone_number] = useState(editablePartner.phone_number);
    const [address_line_1, setAddress_line_1] = useState(editablePartner.address_line_1);
    const [city, setCity] = useState(editablePartner.city);
    const [state, setState] = useState(editablePartner.state);
    const [zip, setZip] = useState(editablePartner.zip);

    // let StateArray = [
    //     AL, AK, AZ, AR, AS, CA, CO, CT
    // ];
    // const [open, setOpen] = useState(false);

    useEffect(() => {

        setName(editablePartner?.name);
        setType(editablePartner?.type);
        setPartner_code(editablePartner?.partner_code);
        setPartner_discount(editablePartner?.partner_discount);
        setRounding_type(editablePartner?.rounding_type);
        setPhone_number(editablePartner?.phone_number);
        setAddress_line_1(editablePartner?.address_line_1);
        setCity(editablePartner?.city);
        setState(editablePartner?.state);
        setZip(editablePartner?.zip);

    }, [editablePartner]);



    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch({
            type: 'UPDATE_PARTNER',
            payload: {
                editablePartnerID,
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
                        defaultValue={editablePartner.name}
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
                        label="Partner Discount"
                        value={partner_discount}
                        onChange={(event) => setPartner_discount(event.target.value)}
                    />
                    <TextField
                        sx={{ mt: 2 }}
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
                    {/* <Select
                        label='State'
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        size='small'
                        style={{ width: 200 }}
                    >
                    
                        
                    </Select> */}
                        <TextField 
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