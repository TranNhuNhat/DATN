import React, { useEffect, useState } from 'react';
import './HomestayAdmin.css';
import { Box, Button, Typography, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #1e90ff',
    borderRadius: '5px',
    boxShadow: 22,
    p: 4,
};

const ModalDeleteHomestay = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [code, setCode] = React.useState("");

    const {homestayId} = props;

    const handleDeleteRoom = async () => {
        setHomestays(homestays.filter((homestay) => homestay._id !== homestayId));
    await axios.delete(`http://localhost:3001/api/homestays/${homestayId}`)
    .then(res => {
      console.log(res);
      alert('Đã xóa homestay thành công !');
      setOpen(false);
    })
    .catch(error => {
      console.log(error);
    });;
    }

    const [homestays, setHomestays] = useState([]);

    useEffect(() => {
        getHomestays();
    }, [code]);

    const getHomestays = async () => {
        const response = await axios.get("http://localhost:3001/api/homestays");
        if (response.status === 200) {
            setHomestays(response.data)
        }
    }
    return (
        <div>
            <button
                className="btn-delete-homestay"
                onClick={handleOpen}
            >
                <DeleteIcon fontSize='small' className='icon-deleteH' />
                <p className='delete-homestay'>Xóa</p>
            </button>
            <Modal
                open={open}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form"
                    sx={style}>
                    <CloseIcon onClick={handleClose} className='icon-close' />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thông báo
                    </Typography>

                    <p className='dialog-homestay'>Bạn có muốn xóa homestay này không ?</p>
                    <div className='group-btn'>
                        <div className='btn-submit'>
                            <Button
                            variant="outlined" s
                            ize='medium'
                                onClick={handleDeleteRoom}
                            >Có</Button>
                        </div>
    
                        <div className='btn-close'>
                            <Button variant="outlined" size='medium' onClick={handleClose}>Đóng</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalDeleteHomestay