import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingAdmin.css';

import EditIcon from '@mui/icons-material/Edit';
import ModalDeleteBookingApproved from './ModalDeleteBookingApproved';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';




const BookingAdmin = (props) => {
  const navigate = useNavigate();

  //get info all bookings
  const [bookingsNotApproveds, setBookingsNotApproved] = useState([]);
  const [bookingsApproveds, setBookingsApproved] = useState([]);
  const [approved, setApproved] = React.useState('');

  const [roomId, setRoomId] = useState(undefined);


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



  //get info all rooms
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    const response = await axios.get("http://localhost:3001/api/rooms");
    if (response.status === 200) {
      setRooms(response.data)
    }
  }


  const [RoombookingApproved, setRoombookingApproved] = useState();


  const handleChange = (e) => {
    setRoomId(e.target.value);
    console.log(e.target.value);
  }

  const searchRoomApproved = async () => {
    const response = await axios.get(`http://localhost:3001/api/rooms/booking/${roomId}/approved`);
    setRoombookingApproved(response.data);
    // response.map((room) => (console.log(room?.roomtype)));

  }


  //search
  // search not approved
  const [values, setValues] = useState("")
  const handleSearchBookingsNotApproved = async (e) => {
    e.preventDefault();
    return await axios.get(`http://localhost:3001/api/bookings/notapproved/search/${values}`)
      .then((res) => setBookingsNotApproved(res.data))
  }

  const handleResetBookingsNotApproved = () => {
    getBookingsNotApproved();
  }

  // search approved
  const [values1, setValues1] = useState("")
  const handleSearchBookingsApproved = async (e) => {
    e.preventDefault();
    return await axios.get(`http://localhost:3001/api/bookings/approved/search/${values1}`)
      .then((res) => setBookingsApproved(res.data))
  }

  const handleResetBookingsApproved = () => {
    getBookingsNotApproved();
  }

  return (
    <div>
      <h2 className='title-approved'>Đơn đặt phòng chưa duyệt</h2>
      {/* search */}
      <form
        onSubmit={handleSearchBookingsNotApproved}
        className='search-form'
      >
        <input
          type='search'
          className='form-search-evaluate'
          placeholder='Nhập tên homestay,người đánh giá,loại phòng,dịch vụ,đối tượng,...'
          value={values}
          onChange={(e) => setValues(e.target.value)}
        />
        <button type='submit' className='btn-search-evaluate'>
          <SearchIcon className='icon-search' />
          <p className='search-title'>Tìm kiếm</p>
        </button>
      </form>
      <div>
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
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className='title-approved'>Đơn đặt phòng đã duyệt</h2>
      <div className='choose-booking'>
        <label>Chọn 1 phòng</label>
        <select
          onChange={handleChange}
          className='select-booking'
        >
          {rooms &&
            rooms.map((room) => (
              <option key={room._id} value={room._id}>{room.roomtype}</option>
            ))}
        </select>

        <button onClick={searchRoomApproved} className='btn-search-choose'>Tìm kiếm</button>
      </div>

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
            {RoombookingApproved && RoombookingApproved.map((bookingsApproved) => {
              return (
                <tr key={bookingsApproved?._id}>
                  <td>{bookingsApproved?.name}</td>
                  <td>{bookingsApproved?.roomtype}</td>
                  <td>{bookingsApproved?.roomNumbers}</td>
                  <td>{bookingsApproved?.guestname}</td>
                  <td>{bookingsApproved?.gender}</td>
                  <td>{bookingsApproved?.bookingphone}</td>
                  <td>{bookingsApproved?.email}</td>
                  <td>{bookingsApproved?.bookingdate}</td>
                  <td>{bookingsApproved?.checkindate}</td>
                  <td>{bookingsApproved?.checkoutdate}</td>
                  <td>{bookingsApproved?.numadults}</td>
                  <td>{bookingsApproved?.numchildren}</td>
                  <td>
                    <button
                      className="btn-edit-booking"
                      onClick={() => navigate(`/admin/editBooking/${bookingsApproved?._id}`)}
                    ><EditIcon fontSize='small' className='icon-editB' />
                      <p className='edit-booking'>Sửa</p></button>

                    <ModalDeleteBookingApproved
                      bookingApprovedId={bookingsApproved?._id}
                      roomId={roomId}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* search */}
      <form
        onSubmit={handleSearchBookingsApproved}
        className='search-form'
      >
        <input
          type='search'
          className='form-search-evaluate'
          placeholder='Nhập tên homestay,người đánh giá,loại phòng,dịch vụ,đối tượng,...'
          value={values1}
          onChange={(e) => setValues1(e.target.value)}
        />
        <button type='submit' className='btn-search-evaluate'>
          <SearchIcon className='icon-search' />
          <p className='search-title'>Tìm kiếm</p>
        </button>
      </form>

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