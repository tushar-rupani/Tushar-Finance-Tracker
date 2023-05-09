import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { deleteFromLS } from '../../services/localstorage.service';
import { useNavigate } from 'react-router-dom';
export const CustomModal = ({ open, handleClose, id, setOpen, setDataValue }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const navigate = useNavigate();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to delete the record?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Once deleted, it is not possible to recover it. <br /><br />
                    <Button variant='contained' color="error" onClick={() => { deleteFromLS(id); setOpen(false); navigate("/add") }}> Delete it.</Button>
                </Typography>
            </Box>
        </Modal>
    )
}
