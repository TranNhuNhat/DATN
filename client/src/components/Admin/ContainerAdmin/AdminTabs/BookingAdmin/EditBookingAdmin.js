import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './BookingAdmin.css';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from 'moment/moment';

const EditBookingAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [booking, setBooking] = useState({
        code: "",
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
        const bookingClone = { ...booking };
        bookingClone[e.target.name] = e.target.value;
        setBooking(bookingClone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3001/api/bookings/${id}`, booking);
        console.log(booking);
        return navigate("/admin");
    };



    return (
        <div>
            <form className="booking">
                <h1 className='booking-title'>Cập nhật đơn đặt phòng</h1>
                <div className='booking-input'>
                    <input
                        className='booking-code'
                        type="text"
                        placeholder="Nhập mã homestay..."
                        name="code"
                        value={booking.code}
                        onChange={handleChange}
                    />

                    <input
                        className='room-roomtype'
                        type="text"
                        placeholder="Nhập loại phòng..."
                        name="roomtype"
                        value={booking.roomtype}
                        onChange={handleChange}
                    />

                    <input
                        className='room-roomtype'
                        type="text"
                        placeholder="Nhập loại phòng..."
                        name="guestname"
                        value={booking.guestname}
                        onChange={handleChange}
                    />

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

                    <input
                        className='room-roomtype'
                        type="text"
                        placeholder="Nhập loại phòng..."
                        name="bookingphone"
                        value={booking.bookingphone}
                        onChange={handleChange}
                    />

                    <input
                        className='room-roomtype'
                        type="email"
                        placeholder="Nhập loại phòng..."
                        name="email"
                        value={booking.email}
                        onChange={handleChange}
                    />

                    <input
                        label="Ngày đặt"
                        onChange={handleChange}
                        value={booking.bookingdate}
                    />

                    <input label="Ngày đến"
                        onChange={handleChange}
                        value={booking.checkindate} />

                    <input
                        label="Ngày trả phòng"
                        onChange={handleChange}
                        value={booking.checkoutdate}
                    />

                    <input
                        className='room-roomtype'
                        type="text"
                        placeholder="Nhập loại phòng..."
                        name="roomtype"
                        value={booking.numadults}
                        onChange={handleChange}
                    />

                    <input
                        className='room-roomtype'
                        type="text"
                        placeholder="Nhập loại phòng..."
                        name="roomtype"
                        value={booking.numchildren}
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

export default EditBookingAdmin