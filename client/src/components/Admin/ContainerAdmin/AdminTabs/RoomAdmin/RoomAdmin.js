import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './RoomAdmin.css';
import { Box, Button, Typography, Modal } from '@mui/material';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 200,
    bgcolor: 'background.paper',
    border: '1px solid #1976d2',
    borderRadius: '5px',
    boxShadow: 22,
    p: 4,
};


const RoomAdmin = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const navigate = useNavigate();



    //add a new roomtype
    const [code, setCode] = React.useState('');
    const [roomtype, setRoomtype] = React.useState('');

    const handleChangeCode = (event) => {
        setCode(event.target.value);
    };

    const handleChangeRoomtype = (event) => {
        setRoomtype(event.target.value);
    };



    const handleAddRoom = async () => {
        const response = await axios.post("http://localhost:3001/api/rooms", {
            code: code,
            roomtype: roomtype,
        });

        if (response.status === 200) {
            console.log("data=>", response.data);
        }
        alert('Thêm mới phòng thành công');
        setCode('');
        setRoomtype('');
    }

    const handleDeleteRoom = async (room) => {
        setRooms(rooms.filter((r) => r._id !== room._id));
        await axios.delete(`http://localhost:3001/api/rooms/${room._id}`);
    }



    //get info all rooms
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms();
    }, [code]);

    const getRooms = async () => {
        const response = await axios.get("http://localhost:3001/api/rooms");
        if (response.status === 200) {
            setRooms(response.data)
        }
    }


    return (
        <div>
            <button
                className='btn-addRoom'
                onClick={handleOpen}
            >
                <AddCircleIcon className='icon-addR' />
                <p>Thêm mới phòng</p>
            </button>
            {/* mo form them moi */}
            <Modal
                open={open}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form"
                    sx={style}>
                    <CloseIcon onClick={handleClose} className='icon-close' />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Thêm mới homestay
                    </Typography>

                    <TextField id="outlined-basic"
                        label="Mã homestay"
                        variant="outlined"
                        value={code}
                        onChange={handleChangeCode}
                    />

                    <TextField id="outlined-basic"
                        label="Loại phòng"
                        variant="outlined"
                        value={roomtype}
                        onChange={handleChangeRoomtype}
                    />


                    <div className='btn-submit'>
                        <Button
                            variant="contained"
                            size='medium'
                            onClick={handleAddRoom}
                        >Thêm</Button>
                    </div>

                    <div className='btn-close'>
                        <Button variant="outlined" size='medium' onClick={handleClose}>Đóng</Button>
                    </div>
                </Box>
            </Modal>


            <div className="table-room">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Mã homestay</th>
                            <th>Loại phòng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => {
                            return (
                                <tr key={room._id}>
                                    <td>{room.code}</td>
                                    <td>{room.roomtype}</td>
                                    <td>
                                        {/* <button className="btn-edit-room" onClick={() => navigate(`/admin/editRoom/${room._id}`)}>Sửa</button>
                                        <button className="btn-delete"
                                            onClick={() => handleDeleteRoom(room)}
                                        >
                                            Xóa</button> */}

                                        <div className='display-btn'>
                                            <button
                                                className="btn-edit-room"
                                                onClick={() => navigate(`/admin/editRoom/${room._id}`)}
                                            ><EditIcon fontSize='small' className='icon-editR' />
                                                <p className='edit-room'>Sửa</p></button>
                                            <button
                                                className="btn-delete-room"
                                                onClick={() => handleDeleteRoom(room)}
                                            ><DeleteIcon fontSize='small' className='icon-deleteR' />
                                                <p className='delete-room'>Xóa</p>
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RoomAdmin