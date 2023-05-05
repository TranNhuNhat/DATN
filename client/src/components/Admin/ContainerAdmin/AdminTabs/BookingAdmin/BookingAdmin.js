import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingAdmin.css';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const BookingAdmin = (props) => {
  const navigate = useNavigate();

  //get info all bookings
  const [bookings, setBookings] = useState([]);
  const [bookingsNotApproveds, setBookingsNotApproved] = useState([]);
  const [bookingsApproveds, setBookingsApproved] = useState([]);
  const [approved, setApproved] = React.useState('');


  // lay du lieu don dat chua duyet
  useEffect(() => {
    getBookingsNotApproved();
  }, [approved]);


  const getBookingsNotApproved = async () => {
    const response = await axios.get("http://localhost:3001/api/bookings/notapproved");
    if (response.status === 200) {
      setBookingsNotApproved(response.data)
    }
  }

  console.log("data=>", bookingsNotApproveds);


  // lay du lieu don dat da duyet
  useEffect(() => {
    getBookingsApproved();
  }, [approved]);


  const getBookingsApproved = async () => {
    const response = await axios.get("http://localhost:3001/api/bookings/approved");
    if (response.status === 200) {
      setBookingsApproved(response.data)
    }
  }

  console.log("data=>", bookingsApproveds);

  // duyet don dat phong
  const handleAcceptBookings = async (bookingsNotApproved) => {
    setBookingsNotApproved(bookingsNotApproveds.filter((bn) => bn._id !== bookingsNotApproved._id));
    await axios.put(`http://localhost:3001/api/bookings/updateApproved/${bookingsNotApproved._id}`)
    .then(res => {
      console.log(res);
      alert('Yêu cầu đặt phòng đã được xác nhận !')
    })
    .catch(error => {
      console.log(error);
    });
  };


  // xoa don dat phong
  const handleDeleteBooking = async (booking) => {
    setBookings(bookings.filter((b) => b._id !== booking._id));
    await axios.delete(`http://localhost:3001/api/bookings/${booking._id}`)
    .then(res => {
      console.log(res);
      alert('Đã xóa đơn đặt phòng !')
    })
    .catch(error => {
      console.log(error);
    });;
  }


  return (
    <div>
      <h1>Đơn đặt phòng chưa duyệt</h1>
      <div>
        <div className="table-booking-notApproved">
          <table className='table-notApproved'>
            <thead>
              <tr>
                <th>Tên homestay</th>
                <th>Tên phòng</th>
                <th>Số phòng</th>
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
              {bookingsNotApproveds.map((bookingsNotApproved) => {
                return (
                  <tr key={bookingsNotApproved._id}>
                    <td>{bookingsNotApproved.name}</td>
                    <td>{bookingsNotApproved.roomtype}</td>
                    <td>{bookingsNotApproved.roomNumbers}</td>
                    <td>{bookingsNotApproved.guestname}</td>
                    <td>{bookingsNotApproved.gender}</td>
                    <td>{bookingsNotApproved.bookingphone}</td>
                    <td>{bookingsNotApproved.email}</td>
                    <td>{bookingsNotApproved.bookingdate}</td>
                    <td>{bookingsNotApproved.checkindate}</td>
                    <td>{bookingsNotApproved.checkoutdate}</td>
                    <td>{bookingsNotApproved.numadults}</td>
                    <td>{bookingsNotApproved.numchildren}</td>
                    <td>
                      <button
                        className="btn-edit-booking"
                        onClick={() => handleAcceptBookings(bookingsNotApproved)}
                      ><EditIcon fontSize='small' className='icon-editB' />
                        <p className='edit-booking'>Duyệt</p></button>
                      <button
                        className="btn-delete-booking"
                        onClick={() => handleDeleteBooking(bookingsNotApproved)}
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

      <h1>Đơn đặt phòng đã duyệt</h1>
      <div className="table-booking">
        <table className='table'>
          <thead>
            <tr>
              <th>Tên homestay</th>
              <th>Tên phòng</th>
              <th>Số phòng</th>
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
            {bookingsApproveds.map((bookingsApproved) => {
              return (
                <tr key={bookingsApproved._id}>
                  <td>{bookingsApproved.name}</td>
                  <td>{bookingsApproved.roomtype}</td>
                  <td>{bookingsApproved.roomNumbers}</td>
                  <td>{bookingsApproved.guestname}</td>
                  <td>{bookingsApproved.gender}</td>
                  <td>{bookingsApproved.bookingphone}</td>
                  <td>{bookingsApproved.email}</td>
                  <td>{bookingsApproved.bookingdate}</td>
                  <td>{bookingsApproved.checkindate}</td>
                  <td>{bookingsApproved.checkoutdate}</td>
                  <td>{bookingsApproved.numadults}</td>
                  <td>{bookingsApproved.numchildren}</td>
                  <td>
                    <button
                      className="btn-edit-booking"
                      onClick={() => navigate(`/admin/editBooking/${bookingsApproved._id}`)}
                    ><EditIcon fontSize='small' className='icon-editB' />
                      <p className='edit-booking'>Sửa</p></button>
                    <button
                      className="btn-delete-booking"
                      onClick={() => handleDeleteBooking(bookingsApproved)}
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