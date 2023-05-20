import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './BookingAdmin.css';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import moment from 'moment/moment';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import './BookingAdmin.css';

const EditBookingAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [booking, setBooking] = useState({
        name: "",
        roomtype: "",
        guestname: "",
        gender: "",
        bookingphone: "",
        email: "",
        bookingdate: "",
        checkindate: "",
        checkoutdate: "",
        numadults: "",
        numchildren: "",
    })

    useEffect(() => {
        if (!id) return;
        const getBooking = async () => {
            let { data } = await axios.get(`http://localhost:3001/api/bookings/${id}`);
            data.bookingdate = moment(data.bookingdate).format('MM/DD/YYYY');
            data.checkindate = moment(data.checkindate).format('MM/DD/YYYY');
            data.checkoutdate = moment(data.checkoutdate).format('MM/DD/YYYY');
            setBooking(data);
            console.log(data);
        };
        getBooking();

    }, []);

    const handleChange = (e) => {
        let bookingClone = { ...booking };
        bookingClone[e.target.name] = e.target.value;
        setBooking(bookingClone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`http://localhost:3001/api/bookings/${id}`, booking);
        console.log(booking);
        if(response.status === 200){
            console.log(response.data);
            alert("Cập nhật thông tin đơn đặt thành công");
        }
        return navigate("/admin");
    };

    const handleChangeCheckindate = (date) => {
        let bookingClone = { ...booking };
        bookingClone['checkindate'] = date;
        setBooking(bookingClone);
    };

    const handleChangeCheckoutdate = (date) => {
        let bookingClone = { ...booking };
        bookingClone['checkoutdate'] = date;
        setBooking(bookingClone);
    };



    return (
        <div>
            <div className='booking-header'>
                <h1 className='booking-title'>Cập nhật đơn đặt phòng</h1>
            </div>
            <form className="booking">
                <div className='booking-input'>
                    <div className='editBooking-left'>
                        <div>
                            <label>Tên homestay</label>
                            <input
                                className='booking-name'
                                type="text"
                                placeholder="Nhập tên homestay..."
                                name="name"
                                value={booking.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Loại phòng</label>
                            <input
                                className='booking-roomtype'
                                type="text"
                                placeholder="Nhập loại phòng..."
                                name="roomtype"
                                value={booking.roomtype}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Phòng số</label>
                            <input
                                className='booking-roomNumbers'
                                type="text"
                                placeholder="Nhập phòng số..."
                                name="guestname"
                                value={booking.roomNumbers}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Tên người đặt</label>
                            <input
                                className='booking-guestname'
                                type="text"
                                placeholder="Nhập tên người đặt..."
                                name="guestname"
                                value={booking.guestname}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                                Giới tính
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={booking.gender}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                                <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                <FormControlLabel
                                    value="LGBT"
                                    control={<Radio />}
                                    label="LGBT"
                                />
                            </RadioGroup>
                        </div>

                        <div>
                            <label>Số ĐT đặt phòng</label>
                            <input
                                className='booking-bookingphone'
                                type="text"
                                placeholder="Nhập số điện thoại đặt phòng..."
                                name="bookingphone"
                                value={booking.bookingphone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>



                    <div className='editBooking-right'>
                        <div>
                            <label>Email</label>
                            <input
                                className='booking-email'
                                type="email"
                                placeholder="Nhập email..."
                                name="email"
                                value={booking.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Ngày đặt</label>
                            <input
                                className='booking-bookingdate'
                                label="Ngày đặt"
                                onChange={handleChange}
                                value={booking.bookingdate}
                            />
                        </div>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                    name="checkindate"
                                    label="Ngày đến"  
                                    onChange={handleChangeCheckindate}
                                />
                            </DemoContainer>

                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                    name="checkoutdate"
                                    label="Ngày trả phòng"
                                    onChange={handleChangeCheckoutdate}
                                />
                            </DemoContainer>
                        </LocalizationProvider>

                        <div className='input-checkin'>
                            <label>Ngày đến</label>
                            <input
                                className='booking-checkindate'
                                label="Ngày đến"
                                onChange={handleChange}
                                value={booking.checkindate}
                            />
                        </div>

                        <div>
                            <label>Ngày trả phòng</label>
                            <input
                                className='booking-checkoutdate'
                                name='checkoutdate'
                                label="Ngày trả phòng"
                                onChange={handleChange}
                                value={booking.checkoutdate}
                            />
                        </div>

                        <div>
                            <label>Số lượng người lớn</label>
                            <input
                                className='booking-numadults'
                                type="text"
                                placeholder="Nhập số lượng người lớn..."
                                name="numadults"
                                value={booking.numadults}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label>Số lượng trẻ em</label>
                            <input
                                className='booking-numchildren'
                                type="text"
                                placeholder="Nhập số lượng trẻ em..."
                                name="numchildren"
                                value={booking.numchildren}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <button onClick={handleSubmit} className="btn-editBooking">
                    Cập nhật
                </button>
            </form>
        </div>
    )
}

export default EditBookingAdmin