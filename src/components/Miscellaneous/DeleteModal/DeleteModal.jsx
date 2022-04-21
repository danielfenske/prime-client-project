import { useState } from "react";
import Modal from '../Modal/Modal';
import './DeleteModal.css';
import WarningIcon from '@mui/icons-material/Warning';

function DeleteModal() {

    const [open, setOpen] = useState(false);


    return (
        <div className="delete-modal">
            <div className="modal-icon"><WarningIcon style={{fontSize: 100}}/></div>
            <div className="warning-text">
                <h3>Are you sure you want to delete this data?</h3>
                <p>This process cannot be undone.</p>
            </div>
        </div>
    );
}

export default DeleteModal;