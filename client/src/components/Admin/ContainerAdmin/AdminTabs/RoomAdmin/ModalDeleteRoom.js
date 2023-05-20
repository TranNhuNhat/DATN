import React, { useEffect, useState } from 'react';
import './RoomAdmin.css';
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
    height: 150,
    bgcolor: 'background.paper',
    border: '2px solid #1e90ff',
    borderRadius: '5px',
    boxShadow: 22,
    p: 4,
};

const ModalDeleteRoom = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { roomId } = props;
    const { homestayId } = props;

    const handleDeleteRoom = async () => {
        setRooms(rooms.filter((room) => room._id !== roomId));
        const response = await axios.delete(`http://localhost:3001/api/rooms/${roomId}/${homestayId}`)
            .then(res => {
                console.log(res);
                alert('Đã xóa phòng thành công !!!');
                setOpen(false);
                setRooms(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    //get info all rooms
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = async () => {
        const response = await axios.get("http://localhost:3001/api/rooms");
        if (response.status === 200) {
            setRooms(response.data)
        }
    }

    return (
        <div>
            <button
                className="btn-delete-room"
                onClick={handleOpen}
            >
                <DeleteIcon fontSize='small' className='icon-deleteR' />
                <p className='delete-room'>Xóa</p>
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

                    <p className='dialog-room'>Bạn có muốn xóa phòng này không ?</p>
                    <div className='group-btn'>
                        <div className='btn-submit'>
                            <Button
                                variant="outlined"
                                size='medium'
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

export default ModalDeleteRoom