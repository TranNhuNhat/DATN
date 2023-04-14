import React, { useEffect, useState } from 'react'; import { Box, Button, Typography, Modal } from '@mui/material';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
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
    height: 400,
    bgcolor: 'background.paper',
    border: '1px solid #1976d2',
    borderRadius: '5px',
    boxShadow: 22,
    p: 4,
};


const RoomtypeAdmin = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();


    //add a new roomtype
    const [code, setCode] = React.useState('');
    const [name, setName] = React.useState('');
    const [roomtype, setRoomtype] = React.useState('');
    const [roomprice, setRoomprice] = React.useState('');
    const [roomdesc, setRoomdesc] = React.useState('');

    const handleChangeCode = (event) => {
        setCode(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeRoomtype = (event) => {
        setRoomtype(event.target.value);
    };

    const handleChangeRoomprice = (event) => {
        setRoomprice(event.target.value);
    };

    const handleChangeRoomdesc = (event) => {
        setRoomdesc(event.target.value);
    };



    const handleAddRoomtype = async () => {
        const response = await axios.post("http://localhost:3001/api/roomtypes", {
            code: code,
            name: name,
            roomtype: roomtype,
            roomprice: roomprice,
            roomdesc: roomdesc,
        });

        if (response.status === 200) {
            console.log("data=>", response.data);
        }
        alert('Thêm mới loại phòng thành công');
    }

    const handleDeleteRoomtype = async (roomtypead) => {
        setRoomtypeads(roomtypeads.filter((rt) => rt._id !== roomtypead._id));
        await axios.delete(`http://localhost:3001/api/roomtypes/${roomtypead._id}`);
    }



    //get info all roomtypes
    const [roomtypeads, setRoomtypeads] = useState([]);

    useEffect(() => {
        getRoomtypes();
    }, [code]);

    const getRoomtypes = async () => {
        const response = await axios.get("http://localhost:3001/api/roomtypes");
        if (response.status === 200) {
            setRoomtypeads(response.data)
        }
    }

    return (
        <div>
            <button
                className='btn-addRoomtype'
                onClick={handleOpen}
            >
                <AddCircleIcon className='icon-addRT' />
                <p>Thêm mới loại phòng</p>
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
                        label="Tên homestay"
                        variant="outlined"
                        value={name}
                        onChange={handleChangeName}
                    />

                    <TextField id="outlined-basic"
                        label="Loại phòng"
                        variant="outlined"
                        value={roomtype}
                        onChange={handleChangeRoomtype}
                    />

                    <TextField id="outlined-basic"
                        label="Giá phòng"
                        variant="outlined"
                        value={roomprice}
                        onChange={handleChangeRoomprice}
                    />

                    <TextField id="outlined-basic"
                        label="Mô tả phòng"
                        variant="outlined"
                        value={roomdesc}
                        onChange={handleChangeRoomdesc}
                    />


                    <div className='btn-submit'>
                        <Button
                            variant="contained"
                            size='medium'
                            onClick={handleAddRoomtype}
                        >Thêm</Button>
                    </div>

                    <div className='btn-close'>
                        <Button variant="outlined" size='medium' onClick={handleClose}>Đóng</Button>
                    </div>
                </Box>
            </Modal>


            <div className="table-roomtype">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Mã homestay</th>
                            <th>Tên homestay</th>
                            <th>Loại phòng</th>
                            <th>Giá phòng</th>
                            <th>Mô tả phòng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roomtypeads.map((roomtypead) => {
                            return (
                                <tr key={roomtypead._id}>
                                    <td>{roomtypead.code}</td>
                                    <td>{roomtypead.name}</td>
                                    <td>{roomtypead.roomtype}</td>
                                    <td>{roomtypead.roomprice}</td>
                                    <td>{roomtypead.roomdesc}</td>
                                    <td>
                                        <div className='display-btnRT'>
                                            <button
                                                className="btn-edit-roomtype"
                                                onClick={() => navigate(`/admin/editRoomtype/${roomtypead._id}`)}
                                            ><EditIcon fontSize='small' className='icon-editRT' />
                                                <p className='edit-roomtype'>Sửa</p></button>
                                            <button
                                                className="btn-delete-roomtype"
                                                onClick={() => handleDeleteRoomtype(roomtypead)}
                                            ><DeleteIcon fontSize='small' className='icon-deleteRT' />
                                                <p className='delete-roomtype'>Xóa</p>
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

export default RoomtypeAdmin