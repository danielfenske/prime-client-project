// import components here:
import { useState } from 'react';

import Modal from '../Miscellaneous/Modal/Modal';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';


function EditContactModal({selectedContact}) {
    const [open, setOpen] = useState(false);

    // local state for text fields when adding new contacts  
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [work_phone, setWorkPhone] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log('in handleSubmit');

        let contactSubmission = {
            name: name,
            email: email,
            phone: phone,
            work_phone: work_phone,
            id: selectedContact.id
        }

        dispatch({ type: 'POST_CONTACT', payload: contactSubmission });
    }

    return (
        <>
            <Modal open={open}>
                <h1>Edit Existing Contact</h1>
                <form onSubmit={handleSubmit}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" value={selectedContact.name} onChange={(e) => setName(event.target.value)} />
                    <TextField id="outlined-basic" label="Email" variant="outlined" value={selectedContact.email} onChange={(e) => setEmail(event.target.value)} />
                    <TextField id="outlined-basic" label="Phone" variant="outlined" value={selectedContact.phone} onChange={(e) => setPhone(event.target.value)} />
                    <TextField id="outlined-basic" label="Work Phone" variant="outlined" value={selectedContact.work_phone} onChange={(e) => setWorkPhone(event.target.value)} />
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
        </>
    );
}

export default EditContactModal;
