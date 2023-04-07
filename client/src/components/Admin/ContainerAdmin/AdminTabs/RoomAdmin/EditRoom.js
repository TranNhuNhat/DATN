import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RoomAdmin.css';

const EditRoom = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [room, setRoom] = useState({
        code: "",
        roomtype: "",
    })

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/api/rooms/${id}`, room);
        console.log(room);
        return navigate("/admin");
    };


    return (
        <div>
            
                <form className="room">
                    <h1 className='room-title'>Cập nhật phòng
                    </h1>
                    <div className='room-input'>
                        <input
                            className='room-code'
                            type="text"
                            placeholder="Nhập mã homestay..."
                            name="code"
                            value={room.code}
                            onChange={handleChange}
                        />
                        <input
                            className='room-roomtype'
                            type="text"
                            placeholder="Nhập loại phòng..."
                            name="roomtype"
                            value={room.roomtype}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={handleSubmit} className="btn-edit">
                        Cập nhật
                    </button>
                </form>
            </div>

    )
}

export default EditRoom