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
    'Ra trải giường',
    'Giường cực dài (> 2 mét)',
    'Phòng thay quần áo',
    'Tủ hoặc phòng để quần áo',
    'Căn hộ riêng trong tòa nhà',
    'Nước rửa tay',
    'Điều hòa không khí',
    'Sàn lát gỗ',
    'Hệ thống cách âm',
    'Quạt máy',
    'Sàn trải thảm',
    'Tủ lạnh',
    'Ấm đun nước điện',
    'Đồ bếp',
    'Bàn ăn',
    'Bếp',
    'Máy giặt',
    'Sản phẩm lau rửa',
    'Bếp nhỏ',
    'Máy sấy quần áo',
    'Truyền hình trả tiền',
    'TV màn hình phẳng',
    'Ổ điện gần giường',
    'Giá treo quần áo',
    'Giá phơi quần áo',
    'Máy điều hòa độc lập cho từng phòng',
    'Ban công',
    'Nhìn ra thành phố',
    'Wifi miễn phí',
    'Sân hiên',
    'Bồn tắm',
    'Chỗ đỗ xe miễn phí',
    'Lễ tân 24h',
    'Cho phép mang vật nuôi',
    'Minibar',
    'Không hút thuốc',
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
        img1: "",
        img2: "",
        img3: "",
        img4: "",
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

    const handleSelectImage1 = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    
        reader.onload = function () {
          let homestayClone = { ...room };
          homestayClone['img1'] = reader.result.slice(23);
          setRoom(homestayClone);
        };
      }
    
      const handleSelectImage2 = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    
        reader.onload = function () {
          let homestayClone = { ...room };
          homestayClone['img2'] = reader.result.slice(23);
          setRoom(homestayClone);
        };
      }
    
      const handleSelectImage3 = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    
        reader.onload = function () {
          let homestayClone = { ...room };
          homestayClone['img3'] = reader.result.slice(23);
          setRoom(homestayClone);
        };
      }
    
      const handleSelectImage4 = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
    
        reader.onload = function () {
          let homestayClone = { ...room };
          homestayClone['img4'] = reader.result.slice(23);
          setRoom(homestayClone);
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

                        <div>
                <label>Ảnh 1</label>
                <input
                  className='img-sub'
                  name="img1"
                  label="Ảnh chi tiết 1"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage1}
                />
              </div>

              <div>
                <label>Ảnh 2</label>
                <input
                  className='img-sub'
                  name="img2"
                  label="Ảnh chi tiết 2"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage2}
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


                        

                        <div>
                <label>Ảnh 3</label>
                <input
                  className='img-sub'
                  name="img3"
                  label="Ảnh chi tiết 3"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage3}
                />
              </div>

              <div>
                <label>Ảnh 4</label>
                <input
                  className='img-sub'
                  name="img4"
                  label="Ảnh chi tiết 4"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage4}
                />
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