import React from 'react';
import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './RoomtypeAdmin.css';

const EditRoomtypeAdmin = () => {
  const navigate = useNavigate();
    const { id } = useParams();
    const [roomtypead, setRoomtypead] = useState({
        code: "",
        name: "",
        roomtype: "",
        roomprice:"",
        roomdesc: "",
    })

    useEffect(() => {
      if (!id) return;
      const getRoomtypead = async () => {
          const { data } = await axios.get(`http://localhost:3001/api/roomtypes/${id}`);
          setRoomtypead(data);
      };
      getRoomtypead()
  }, []);

    const handleChange = (e) => {
      const roomtypeadClone = { ...roomtypead };
      roomtypeadClone[e.target.name] = e.target.value;
      setRoomtypead(roomtypeadClone);
  };

  const handleSubmit = async () => { 
    await axios.put(`http://localhost:3001/api/roomtypes/${id}`, roomtypead);
    console.log(roomtypead);
        return navigate("/admin");
};


  return (
    <div>
        <form className="room">
                    <h1 className='room-title'>Cập nhật loại phòng</h1>
                    <div className='room-input'>
                        <input
                            className='room-code'
                            type="text"
                            placeholder="Nhập mã homestay..."
                            name="code"
                            value={roomtypead.code}
                            onChange={handleChange}
                        />

                        <input
                            className='room-name'
                            type="text"
                            placeholder="Nhập loại phòng..."
                            name="name"
                            value={roomtypead.name}
                            onChange={handleChange}
                        />

                        <input
                            className='room-roomtype'
                            type="text"
                            placeholder="Nhập loại phòng..."
                            name="roomtype"
                            value={roomtypead.roomtype}
                            onChange={handleChange}
                        />

                        <input
                            className='room-roomprice'
                            type="text"
                            placeholder="Nhập loại phòng..."
                            name="roomprice"
                            value={roomtypead.roomprice}
                            onChange={handleChange}
                        />

                        <input
                            className='room-roomdesc'
                            type="text"
                            placeholder="Nhập loại phòng..."
                            name="roomdesc"
                            value={roomtypead.roomdesc}
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

export default EditRoomtypeAdmin