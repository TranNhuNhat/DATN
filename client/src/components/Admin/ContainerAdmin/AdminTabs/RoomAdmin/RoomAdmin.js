import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './RoomAdmin.css';
import { Box, Typography, Modal } from '@mui/material';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';


import ModalDeleteRoom from './ModalDeleteRoom';





const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: 680,
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




const RoomAdmin = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();


    const [maxPeople, setMaxPeople] = React.useState('');
    const [roomtype, setRoomtype] = React.useState('');
    const [acreage, setAcreage] = React.useState('');
    const [roomprice, setRoomprice] = React.useState('');
    const [roomconvenient, setRoomconvenient] = React.useState([]);
    const [imgRoom, setImgRoom] = React.useState('');
    const [roomNumbers, setRoomNumbers] = React.useState('');
    const [img1, setImage1] = React.useState('');
    const [img2, setImage2] = React.useState('');
    const [img3, setImage3] = React.useState('');
    const [img4, setImage4] = React.useState('');

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

    const handleSelectImage1 = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function () {
            setImage1(reader.result.slice(23));
        };
    }

    const handleSelectImage2 = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function () {
            setImage2(reader.result.slice(23));
        };
    }

    const handleSelectImage3 = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function () {
            setImage3(reader.result.slice(23));
        };
    }

    const handleSelectImage4 = (event) => {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function () {
            setImage4(reader.result.slice(23));
        };
    }

    //thêm mới phòng
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
            roomNumbers: roomNumbers,
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
        })
        const response = await axios.post(`http://localhost:3001/api/rooms/${homestayId}`, {
            maxPeople: maxPeople,
            roomtype: roomtype,
            acreage: acreage,
            roomprice: roomprice,
            roomconvenient: roomconvenient,
            imgRoom: imgRoom,
            roomNumbers: roomNumbers,
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
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
        setImage1('');
        setImage1('');
        setImage1('');
        setImage1('');
    }

    // const [homestayRoomId, setHomestayRoomId] = useState(undefined);
    const [homestayId, setHomestayId] = useState(undefined);
    const [homestayRoom, setHomestayRoom] = useState();





    const handleChange = (e) => {
        setHomestayId(e.target.value);
        console.log(e.target.value);
    }

    const searchHomestay = async () => {
        const response = await axios.get(`http://localhost:3001/api/homestays/room/${homestayId}`);
        setHomestayRoom(response.data);
        // response.map((room) => (console.log(room?.roomtype)));

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


    // search
    const [values, setValues] = useState("")
    const handleSearchRoom = async (e) => {
        e.preventDefault();
        return await axios.get(`http://localhost:3001/api/rooms/search/${values}`)
            .then((res) => setRooms(res.data))
    }

    const handleResetRoom = () => {
        getRooms();
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
                            

                    <div className='add-info'>
                        <div className='add-left'>
                            <div className='room-text'>
                                <TextField id="outlined-basic"
                                    label="Số người tối đa"
                                    variant="outlined"
                                    value={maxPeople}
                                    onChange={handleChangeCode}
                                />
                            </div>



                            <div className='room-text'>
                                <TextField id="outlined-basic"
                                    label="Phòng số"
                                    variant="outlined"
                                    value={roomNumbers}
                                    onChange={handleChangeRoomNumbers}
                                />
                            </div>

                            <div className='room-text'>
                                <TextField id="outlined-basic"
                                    label="Loại phòng"
                                    variant="outlined"
                                    value={roomtype}
                                    onChange={handleChangeRoomtype}
                                />
                            </div>

                            <div className='room-imgroom'>
                                <label>Ảnh phòng</label>
                                <input id="room-file"
                                    label="Ảnh phòng"
                                    variant="outlined"
                                    type="file"
                                    onChange={handleChangeImgRoom}
                                />
                            </div>


                            <div className='room-imgroom'>
                                <label>Ảnh chi tiết 1</label>
                                <input
                                    label="Ảnh chi tiết 1"
                                    variant="outlined"
                                    type="file"
                                    onChange={handleSelectImage1}
                                />
                            </div>

                            <div className='room-imgroom'>
                                <label>Ảnh chi tiết 2</label>
                                <input
                                    label="Ảnh chi tiết 2"
                                    variant="outlined"
                                    type="file"
                                    onChange={handleSelectImage2}
                                />
                            </div>
                        </div>

                        <div className='add-right'>
                            <div className='room-text'>
                                <TextField id="outlined-basic"
                                    label="Diện tích"
                                    variant="outlined"
                                    value={acreage}
                                    onChange={handleChangeAcreage}
                                />
                            </div>

                            <div className='room-text'>
                                <TextField id="outlined-basic"
                                    label="Giá phòng"
                                    variant="outlined"
                                    value={roomprice}
                                    onChange={handleChangeRoomprice}
                                />
                            </div>

                            <div className='room-conven'>
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
                            </div>

                            <div className='room-imgroom'>
                                <label>Ảnh chi tiết 3</label>
                                <input
                                    label="Ảnh chi tiết 3"
                                    variant="outlined"
                                    type="file"
                                    onChange={handleSelectImage3}
                                />
                            </div>

                            <div className='room-imgroom'>
                                <label>Ảnh chi tiết 4</label>
                                <input
                                    label="Ảnh chi tiết 4"
                                    variant="outlined"
                                    type="file"
                                    onChange={handleSelectImage4}
                                />
                            </div>
                        </div>
                        <button
                                className='submit-btn'
                                onClick={handleAddRoom}
                            >Thêm</button>
                    </div>


                    <div className='select-display'>
                        <label>Chọn 1 homestay</label>
                        <select
                            className='modal-select'
                            onChange={(e) => setHomestayId(e.target.value)}
                        >
                            {homestays &&
                                homestays.map((homestay) => (
                                    <option key={homestay._id} value={homestay._id}>{homestay.name}</option>
                                ))}
                        </select>
                    </div>
                  
                </Box>
            </Modal>



            <div className='choose-booking'>
                <label>Chọn 1 homestay</label>
                <select
                    onChange={handleChange}
                    className='select-booking'
                >
                    {homestays &&
                        homestays.map((homestay) => (
                            <option key={homestay._id} value={homestay._id}>{homestay.name}</option>
                        ))}
                </select>

                <button onClick={searchHomestay} className='btn-search-choose-room'>Tìm kiếm</button>
            </div>

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
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {homestayRoom && homestayRoom.map((room) => {
                            return (
                                <tr key={room?._id}>
                                    <td>{room?.roomtype}</td>
                                    <td><img src={`data:image/png;base64,${room?.imgRoom}`} alt="" className='img-room' /></td>
                                    <td>{room?.acreage}</td>
                                    <td>{room?.maxPeople}</td>
                                    <td>{room?.roomprice}</td>
                                    <td>{room.roomconvenient.map((sub,i) => {
                                    return (<li key={i} className='li-roomconven'>{sub}</li>)
                                    })}</td>
                                    <td>{room?.roomNumbers}</td>
                                    <td>
                                        <div className='display-btn'>
                                            <button
                                                className="btn-edit-room"
                                                onClick={() => navigate(`/admin/editRoom/${room?._id}`)}
                                            ><EditIcon fontSize='small' className='icon-editR' />
                                                <p className='edit-room'>Sửa</p></button>

                                            <ModalDeleteRoom
                                                roomId={room?._id}
                                                homestayId={homestayId}
                                            />
                                        </div>
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>


            <h2 className='room-title-search'>Danh sách phòng</h2>
            {/* search */}
            <form
                onSubmit={handleSearchRoom}
                className='search-form'
            >
                <input
                    type='search'
                    className='form-room'
                    placeholder='Nhập tên phòng,diện tích,tiện nghi...'
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                />
                <button type='submit' className='btn-search-room'>
                    <SearchIcon className='icon-search' />
                    <p className='search-title'>Tìm kiếm</p>
                </button>
            </form>

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
                                    <td>{room.roomconvenient.map((sub,i) => {
                                    return (<li key={i} className='li-roomconven'>{sub}</li>)
                                    })}</td>
                                    <td>{room.roomNumbers}</td>
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