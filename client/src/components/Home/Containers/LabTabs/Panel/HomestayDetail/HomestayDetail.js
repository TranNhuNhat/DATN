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

    useEffect(() => {
        if (!id) return;
        const getHomestay = async () => {
            const { data } = await axios.get(`http://localhost:3001/api/homestays/${id}`);
            setHomestay(data);
            // setRoomId(data.room);
        };
        getHomestay()
    }, []);

    const [homestayRoom, setHomestayRoom] = useState()

    useEffect(() => {
        if (!id) return;
        const getHomestayRoom = async () => {
            const { data } = await axios.get(`http://localhost:3001/api/homestays/room/${id}`);
            setHomestayRoom(data);
            data.map((room, i) => (console.log(room?.roomtype)));
        };
        getHomestayRoom()
    }, []);


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
                <LocationOnIcon className='icon-address'/>
                {homestay.address}
            </div>

            <span className='distance'>Nằm cách {homestay.distance} km so với trung tâm thành phố Hà Nội</span>
            <p className='phone'>Liên hệ: {homestay.phone} </p>

            <span className='district'>Quận : {homestay.district}</span>

    


            <div className="Images">
                <img src={`data:image/png;base64,${homestay.img1}`} alt='' className='img'/>
                <img src={`data:image/png;base64,${homestay.img2}`} alt='' className='img'/>
                <img src={`data:image/png;base64,${homestay.img3}`} alt='' className='img'/>
                <img src={`data:image/png;base64,${homestay.img4}`} alt='' className='img'/>
            </div>

            <div>
                <h2 className='title-desc'>Mô tả</h2>
                <span className='desc'>{homestay.desc}</span>
            </div>
            <div>
                <h2>Phòng </h2>
                <div className="homestayRoom">
                    {homestayRoom?.map((room, i) => (
                        <div className="room-detail" key={i}>
                            <ul className='list-room' key={i}>
                                <li>{room?.roomtype}</li>
                                <li><img src={`data:image/png;base64,${room?.imgRoom}`} alt='' className='img-room' /></li>
                                <li>Số người tối đa: {room?.maxPeople}</li>
                                <li>Diện tích: {room?.acreage}</li>
                                <li>Giá phòng: {room?.roomprice}</li>
                                <li>Phòng số: {room?.roomNumbers}</li>
                                <li>Tiện nghi: {room?.roomconvenient}</li>
                            </ul>

                            <ModalTabs
                                homestayName={homestay.name}
                                roomType={room?.roomtype}
                                roomNumber={room?.roomNumbers}
                                roomId={room?._id}
                            />
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}

export default HomestayDetail