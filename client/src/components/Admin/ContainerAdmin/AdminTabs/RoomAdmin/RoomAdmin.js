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
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 450,
    bgcolor: 'background.paper',
    border: '1px solid #1976d2',
    borderRadius: '5px',
    boxShadow: 22,
    p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const convens = [
    'Bếp',
    'Ban công',
    'Máy giặt',
    'Nhìn ra thành phố',
    'Wifi miễn phí',
    'Sân hiên',
    'Bồn tắm',
    'Điều hòa không khí',
    'Chỗ đỗ xe miễn phí',
    'Lễ tân 24h',
    'Cho phép mang vật nuôi',
];

function getStyles(conven, roomconvenient, theme) {
    return {
        fontWeight:
            roomconvenient.indexOf(conven) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const RoomAdmin = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const navigate = useNavigate();


    //add a new roomtype
    const [maxPeople, setMaxPeople] = React.useState('');
    // const [room, setRoom] = React.useState('');
    const [roomtype, setRoomtype] = React.useState('');
    const [acreage, setAcreage] = React.useState('');
    const [roomprice, setRoomprice] = React.useState('');
    const [roomconvenient, setRoomconvenient] = React.useState([]);
    const [imgRoom, setImgRoom] = React.useState('');
    const [roomNumbers, setRoomNumbers] = React.useState('');

    const handleChangeCode = (event) => {
        setMaxPeople(event.target.value);
    };

    const handleChangeRoomNumbers = (event) => {
        setRoomNumbers(event.target.value);
    };

    const handleChangeRoomtype = (event) => {
        setRoomtype(event.target.value);
    };

    const handleChangeAcreage = (event) => {
        setAcreage(event.target.value);
    };

    const handleChangeRoomprice = (event) => {
        setRoomprice(event.target.value);
    };


    const theme = useTheme();

    const handleChangeRoomconvenient = (event) => {
        const {
            target: { value },
        } = event;
        console.log(event.target.value);
        setRoomconvenient(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeImgRoom = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function () {
            setImgRoom(reader.result.slice(23));
        };
    };

    const [homestayId, setHomestayId] = useState(undefined);



    const handleAddRoom = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        console.log({
            maxPeople: maxPeople,
            roomtype: roomtype,
            acreage: acreage,
            roomprice: roomprice,
            roomconvenient: roomconvenient,
            imgRoom: imgRoom,
            roomNumbers:roomNumbers,
        })
        const response = await axios.post(`http://localhost:3001/api/rooms/${homestayId}`, {
            maxPeople: maxPeople,
            roomtype: roomtype,
            acreage: acreage,
            roomprice: roomprice,
            roomconvenient: roomconvenient,
            imgRoom: imgRoom,
            roomNumbers:roomNumbers,
        }, config);

        if (response.status === 200) {
            console.log("data=>", response.data);
        }
        alert('Thêm mới phòng thành công');
        setMaxPeople('');
        setRoomtype('');
        setAcreage('');
        setRoomNumbers('');
        setRoomprice('');
        setImgRoom('');
        setRoomconvenient('');
    }

    const handleDeleteRoom = async (room) => {
        setRooms(rooms.filter((r) => r._id !== room._id));
        await axios.delete(`http://localhost:3001/api/rooms/${room._id}/${homestayId}`);
    }



    //get info all rooms
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        getRooms();
    }, [roomtype]);

    const getRooms = async () => {
        const response = await axios.get("http://localhost:3001/api/rooms");
        if (response.status === 200) {
            setRooms(response.data)
        }
    }



    //get allhomestays
    const [homestays, setHomestays] = useState([]);

    useEffect(() => {
        getHomestays();
    }, []);

    const getHomestays = async () => {
        const response = await axios.get("http://localhost:3001/api/homestays");
        if (response.status === 200) {
            setHomestays(response.data)
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
                        Thêm mới phòng
                    </Typography>

                    <TextField id="outlined-basic"
                        label="Số người tối đa"
                        variant="outlined"
                        value={maxPeople}
                        onChange={handleChangeCode}
                    />



                    <TextField id="outlined-basic"
                        label="Phòng số"
                        variant="outlined"
                        value={roomNumbers}
                        onChange={handleChangeRoomNumbers}
                    />

                    <TextField id="outlined-basic"
                        label="Loại phòng"
                        variant="outlined"
                        value={roomtype}
                        onChange={handleChangeRoomtype}
                    />

                    <TextField id="outlined-basic"
                        label="Diện tích"
                        variant="outlined"
                        value={acreage}
                        onChange={handleChangeAcreage}
                    />

                    <TextField id="outlined-basic"
                        label="Giá phòng"
                        variant="outlined"
                        value={roomprice}
                        onChange={handleChangeRoomprice}
                    />

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-chip-label">Tiện nghi</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={[...roomconvenient]}
                            onChange={handleChangeRoomconvenient}
                            input={<OutlinedInput id="select-multiple-chip" label="Tiện nghi" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {convens.map((conven) => (
                                <MenuItem
                                    key={conven}
                                    value={conven}
                                    style={getStyles(conven, roomconvenient, theme)}
                                >
                                    {conven}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <input id="room-file"
                        label="Ảnh phòng"
                        variant="outlined"
                        type="file"
                        onChange={handleChangeImgRoom}
                    />

                    <div >
                        <label>Chọn 1 homestay</label>
                        <select
                            id="hotelId"
                            onChange={(e) => setHomestayId(e.target.value)}
                        >
                            { homestays &&
                                homestays.map((homestay) => (
                                    <option key={homestay._id} value={homestay._id}>{homestay.name}</option>
                                ))}
                        </select>
                    </div>


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
                            <th>Tên phòng</th>
                            <th>Ảnh phòng</th>
                            <th>Diện tích</th>
                            <th>Số người tối đa</th>
                            <th>Giá phòng</th>
                            <th>Tiệnnghi</th>
                            <th>Phòng số</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => {
                            return (
                                <tr key={room._id}>
                                    <td>{room.roomtype}</td>
                                    <td><img src={`data:image/png;base64,${room.imgRoom}`} alt="" className='img-room' /></td>
                                    <td>{room.acreage}</td>
                                    <td>{room.maxPeople}</td>
                                    <td>{room.roomprice}</td>
                                    <td>{room.roomconvenient}</td>
                                    <td>{room.roomNumbers}</td>
                                    <td>
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