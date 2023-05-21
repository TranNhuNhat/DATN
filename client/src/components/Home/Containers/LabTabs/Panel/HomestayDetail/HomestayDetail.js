import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import './HomestayDetail.css';
import ModalTabs from '../../ModalTabs/ModalTabs';
import dayjs from "dayjs";
import ModalEvaluate from './ModalEvaluate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BedIcon from '@mui/icons-material/Bed';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ChatIcon from '@mui/icons-material/Chat';
import moment from 'moment/moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import ModalRoomImage from './ModalRoomImage';
import Rules from './Rules';



const labels = {
    1: 'Kém',
    2: 'Trung bình',
    3: 'Bình thường',
    4: 'Tốt',
    5: 'Xuất sắc',
};


const HomestayDetail = (props) => {
    const { id } = useParams();
    const [homestay, setHomestay] = useState({
        code: "",
        name: "",
        address: "",
        district: "",
        phone: "",
        distance: "",
        rating: "",
        desc: "",
        img: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        cheapestPrice: ""
    });

    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');

    useEffect(() => {
        if (!id) return;
        const getHomestay = async () => {
            const { data } = await axios.get(`http://localhost:3001/api/homestays/${id}`);
            setHomestay(data);
        };
        getHomestay()
    }, []);

    const [homestayRoom, setHomestayRoom] = useState();
    const [roomid, setRoomid] = useState(undefined);
    const [checkindate, setCheckindate] = useState("");
    const [checkoutdate, setCheckoutdate] = useState("");
    const [listIsEmpty, setListIsEmpty] = useState(false);
    const [filteredRoom, setFilteredRoom] = useState();
    const handleChangeCheckindate = (newValue) => {
        setCheckindate(newValue)
        console.log(newValue);
    };

    const handleChangeCheckoutdate = (newValue) => {
        setCheckoutdate(newValue);
        console.log(newValue);
    };

    const handleChangeRoomType = (event) => {
        setRoomid(event.target.value);
        console.log(event.target.value);
    };

    useEffect(() => {
        if (!id) return;
        const getHomestayRoom = async () => {
            const { data } = await axios.get(`http://localhost:3001/api/homestays/room/${id}`);
            setHomestayRoom(data);
            data.map((room, i) => (console.log(room?.roomtype)));
        };
        getHomestayRoom()
    }, []);


    const [homestayEvaluate, setHomestayEvaluate] = useState();

    useEffect(() => {
        if (!id) return;
        const getHomestayEvaluate = async () => {
            const { data } = await axios.get(`http://localhost:3001/api/homestays/evaluate/${id}/approved`);
            setHomestayEvaluate(data);
            data.map((evaluate, i) => (console.log(evaluate?.customername)));
        };
        getHomestayEvaluate();
    }, []);



    const handleSearch = async () => {
        const response = await axios.get(`http://localhost:3001/api/rooms/booking/${roomid}/date?checkindate=${checkindate}&checkoutdate=${checkoutdate}`);
        if (response.status === 200) {
            console.log("data=>", response);
        }
        if (response.data.length === 0) {
            const abc = homestayRoom.filter((room) => {
                return room._id === roomid;
            })
            setFilteredRoom(abc);
            setListIsEmpty(true);
        }else {
            alert("Phòng đã có đơn đặt.Vui lòng chọn ngày khác !!!")
        }

    }




    return (

        <div>
            <div className='detail-title'>
                <h1 className='title-detail'>HOMESTAY HÀ NỘI</h1>
            </div>
            <h1 className='name'>{homestay.name}</h1>
            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
                className='rating-box'
            >
                <Rating
                    name="text-feedback"
                    value={homestay.rating}
                    readOnly
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                <Box sx={{ ml: 2 }}>{labels[homestay.rating]}</Box>
            </Box>
            <div className='address'>
                <LocationOnIcon className='icon-address' />
                {homestay.address}
            </div>

            <span className='distance'>Nằm cách {homestay.distance} km so với trung tâm thành phố Hà Nội</span>
            <p className='phone'>Liên hệ: {homestay.phone} </p>

            <span className='district'>Quận : {homestay.district}</span>




            <div className="Images">
                <img src={`data:image/png;base64,${homestay.img1}`} alt='' className='img' />
                <img src={`data:image/png;base64,${homestay.img2}`} alt='' className='img' />
                <img src={`data:image/png;base64,${homestay.img3}`} alt='' className='img' />
                <img src={`data:image/png;base64,${homestay.img4}`} alt='' className='img' />
            </div>

            <div>
                <h2 className='title-desc'>Mô tả</h2>
                <p className='desc'>{homestay.desc}</p>
            </div>
            <div>
                <h2>Phòng </h2>
                <div className='search-bar'>
                    <div className='checkin'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem 
                            // label="Ngày đến"
                            >
                                <DatePicker
                                    label="Ngày đến"
                                    value={checkindate}
                                    minDate={tomorrow}
                                    onChange={handleChangeCheckindate}
                                />
                            </DemoItem>
                        </LocalizationProvider>
                    </div>
                    <div className='checkout'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem 
                            // label="Ngày trả phòng"
                            >

                                <DatePicker
                                    label="Ngày trả phòng"
                                    value={checkoutdate}
                                    minDate={tomorrow}
                                    onChange={handleChangeCheckoutdate}
                                />
                            </DemoItem>

                        </LocalizationProvider>

                    </div>

                    <div className='select'>
                        {/* <label>Chọn loại phòng</label> */}
                        <select
                            id="select"
                            onChange={handleChangeRoomType}
                        >
                            {homestayRoom && homestayRoom?.map((room) => (
                                <option key={room?._id} value={room?._id}>{room?.roomtype}</option>
                            ))}
                        </select>
                    </div>



                    <div className='btn-search-date'>
                        <button className='btn-search' onClick={handleSearch}>Tìm kiếm</button>
                    </div>
                </div>

                {
                    listIsEmpty ? (
                        filteredRoom?.map((room, i) => (
                            <div className="room-details" key={i}>
                                <ul className='list-room' key={i}>
                                    <ModalRoomImage roomType={room?.roomtype}/>
                                    {/* <li>{room?.roomtype}</li> */}
                                    <li><img src={`data:image/png;base64,${room?.imgRoom}`} alt='' className='img-room' /></li>
                                    <li>Số người tối đa: {room?.maxPeople}</li>
                                    <li>Diện tích: {room?.acreage}</li>
                                    <li>Giá phòng: {room?.roomprice}</li>
                                    <li>Phòng số: {room?.roomNumbers}</li>
                                    <li>Tiện nghi: {room?.roomconvenient.map((sub,i) => {
                                    return (<div key={i}>{sub}</div>)
                                })}</li>
                                </ul>
    
                                <ModalTabs
                                    homestayName={homestay.name}
                                    roomType={room?.roomtype}
                                    roomNumber={room?.roomNumbers}
                                    roomId={room?._id}
                                    bookingDate={today}
                                />
                            </div>
                        ))
                    ) : undefined
                }

                <div className="homestayRoom">
                    {homestayRoom?.map((room, i) => (
                        <div className="room-detail" key={i}>
                            <ul className='list-room' key={i}>
                                <ModalRoomImage 
                                    roomType={room?.roomtype}
                                    imgRoom1={room?.img1}
                                    imgRoom2={room?.img2}
                                    imgRoom3={room?.img3}
                                    imgRoom4={room?.img4}
                                />
                                {/* <li>{room?.roomtype}</li> */}
                                <li><img src={`data:image/png;base64,${room?.imgRoom}`} alt='' className='img-room' /></li>
                                <li>Số người tối đa: {room?.maxPeople}</li>
                                <li>Diện tích: {room?.acreage}</li>
                                <li>Giá phòng: {room?.roomprice}</li>
                                <li>Phòng số: {room?.roomNumbers}</li>
                                <li>Tiện nghi: {room?.roomconvenient.map((sub,i) => {
                                    return (<div key={i}>{sub}</div>)
                                })}</li>
                            </ul>

                            
                            <ModalEvaluate
                                evaluateDate={today}
                                homestayId={id}
                                homestayName={homestay.name}
                                roomType={room?.roomtype}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2>Đánh giá của khách hàng</h2>
                <div className='homestayEvaluate'>
                    {homestayEvaluate?.map((evaluate, i) => (
                        <div className='evaluate-detail' key={i}>
                            <div className='detail-left'>
                                <div className='detail-1'>
                                    <AccountCircleIcon className='icon-1' />
                                    <h3 className='customername'>{evaluate?.customername}</h3>
                                </div>
                                <div className='detail-2'>
                                    <BedIcon className='icon-2' />
                                    <p className='roomtype'>{evaluate?.roomtype}</p>
                                </div>
                                <div className='detail-3'>
                                    <EmojiPeopleIcon className='icon-3' />
                                    <p className='customers'>{evaluate?.customers}</p>
                                </div>
                            </div>
                            <div className='detail-right'>
                                <p className='evaluatedate'>Đã đánh giá: {moment(evaluate?.evaluatedate).format('MM/DD/YYYY')}</p>
                                <div className='service-point'>
                                    <p className='service'>{evaluate?.service}</p>
                                    <p className='point'>{evaluate?.point}</p>
                                </div>
                                <div className='comment-detail'>
                                    <ChatIcon className='icon-4' />
                                    <p className='comment'>{evaluate?.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Rules/>
        </div>

    )
}

export default HomestayDetail