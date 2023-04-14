import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingAdmin.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const BookingAdmin = () => {
  const navigate = useNavigate();

  //get info all bookings
  const [bookings, setBookings] = useState([]);
  const [code, setCode] = React.useState('');

  useEffect(() => {
    getBookings();
  }, [code]);


  const getBookings = async () => {
    const response = await axios.get("http://localhost:3001/api/bookings");
    if (response.status === 200) {
      setBookings(response.data)
    }
  }

  console.log("data=>", bookings);

  const handleDeleteBooking = async (booking) => {
    setBookings(bookings.filter((b) => b._id !== booking._id));
    await axios.delete(`http://localhost:3001/api/bookings/${booking._id}`);
  }

  return (
    <div>
      <div className="table-booking">
        <table className='table'>
          <thead>
            <tr>
              <th>Mã homestay</th>
              <th>Loại phòng</th>
              <th>Tên người đặt</th>
              <th>Giới tính</th>
              <th>Số ĐT đặt phòng</th>
              <th>Email</th>
              <th>Ngày đặt</th>
              <th>Ngày đến</th>
              <th>Ngày trả phòng</th>
              <th>Số lượng người lớn</th>
              <th>Số lượng trẻ em</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              return (
                <tr key={booking._id}>
                  <td>{booking.code}</td>
                  <td>{booking.roomtype}</td>
                  <td>{booking.guestname}</td>
                  <td>{booking.gender}</td>
                  <td>{booking.bookingphone}</td>
                  <td>{booking.email}</td>
                  <td>{booking.bookingdate}</td>
                  <td>{booking.checkindate}</td>
                  <td>{booking.checkoutdate}</td>
                  <td>{booking.numadults}</td>
                  <td>{booking.numchildren}</td>
                  <td>
                    <button
                      className="btn-edit-booking"
                      onClick={() => navigate(`/admin/editBooking/${booking._id}`)}
                    ><EditIcon fontSize='small' className='icon-editB' />
                      <p className='edit-booking'>Sửa</p></button>
                    <button
                      className="btn-delete-booking"
                      onClick={() => handleDeleteBooking(booking)}
                    ><DeleteIcon fontSize='small' className='icon-deleteB' />
                      <p className='delete-booking'>Xóa</p>
                    </button>
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

export default BookingAdmin