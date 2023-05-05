import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RoomAdmin.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';


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


const EditRoom = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState({
        roomtype: "",
        acreage: "",
        roomprice: "",
        roomconvenient: [],
        maxPeople: "",
        imgRoom: "",
        roomNumbers: "",
    });

    const [roomconvenient, setRoomconvenient] = React.useState([]);
    // const [imgRoom, setImgRoom] = React.useState('');


    useEffect(() => {
        if (!id) return;
        const getRoom = async () => {
            const { data } = await axios.get(`http://localhost:3001/api/rooms/${id}`);
            setRoom(data);
        };
        getRoom()
    }, []);


    const handleChange = (e) => {
        const roomClone = { ...room };
        roomClone[e.target.name] = e.target.value;
        setRoom(roomClone);
    };

    const handleChangeRoomconvenient = (e) => {
        const {
            target: { value },
        } = e;
        console.log(e.target.value);
        const roomClone = { ...room };
        roomClone['roomconvenient'] = typeof value === 'string' ? value.split(',') : value;
        setRoom(roomClone);
    }


    const handleSelectImgRoom = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function () {
            const roomClone = { ...room };
            roomClone['imgRoom'] = reader.result.slice(23);
            setRoom(roomClone);
        };

    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/api/rooms/${id}`, room);
        console.log(room);
        alert("Cập nhật phòng thành công");
        return navigate("/admin");
    };


    const theme = useTheme();




    return (
        <div>
            <div className='title-room'>
                <h1 className='room-title'>Cập nhật phòng</h1>
            </div>
            <form className="room">
                <div className='room-input'>
                    <div className='room-input-left'>
                        <div>
                            <label>Tên phòng</label>
                            <input
                                className='room-roomtype'
                                type="text"
                                placeholder="Nhập loại phòng..."
                                name="roomtype"
                                value={room.roomtype}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div>
                            <label>Diện tích</label>
                            <input
                                className='room-acreage'
                                type="text"
                                placeholder="Nhập diện tích..."
                                name="acreage"
                                value={room.acreage}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div>
                            <label>Số người tối đa</label>
                            <input
                                className='room-maxPeople'
                                type="text"
                                placeholder="Nhập số người tối đa..."
                                name="maxPeople"
                                value={room.maxPeople}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div>
                            <label>Giá phòng</label>
                            <input
                                className='room-roomprice'
                                type="text"
                                placeholder="Nhập giá phòng..."
                                name="roomprice"
                                value={room.roomprice}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='room-input-right'>
                        <div>
                            <label>Phòng số </label>
                            <input
                                className='room-roomNumbers'
                                type="text"
                                placeholder="Nhập phòng số..."
                                name="roomNumbers"
                                value={room.roomNumbers}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div>
                            <label>Ảnh phòng</label>
                            <input
                                className='room-imgRoom'
                                type="file"
                                placeholder="Chọn ảnh phòng..."
                                name="imgRoom"
                                onChange={handleSelectImgRoom}
                            />
                        </div>
    
                        <div>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Tiện nghi</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    name='roomconvenient'
                                    value={[...room.roomconvenient]}
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
                        </div>
                    </div>

                </div>
                <button onClick={handleSubmit} className="btn-edit">
                    Cập nhật
                </button>
            </form>
        </div>

    )
}

export default EditRoom