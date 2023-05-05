import React from "react";
import { Button, Typography, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close"
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import axios from "axios";
import './ModalTabs.css';
import dayjs from "dayjs";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 22,
  p: 4,
};

const ModalTabs = (props) => {
  const {roomId} = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
  }
  const handleSubmit = async () => {
    console.log({
      name: homestayName,
      roomtype: roomType,
      roomNumbers:roomNumber,
      guestname: guestname,
      gender: gender,
      bookingphone: phoneNumber,
      email: email,
      bookingdate: bookingdate,
      checkindate: checkindate,
      checkoutdate: checkoutdate,
      numadults: numadults,
      numchildren: numchildren,
    });
    const response = await axios.post(`http://localhost:3001/api/bookings/${roomId}`, {
      name: homestayName,
      roomtype: roomType,
      roomNumbers:roomNumber,
      guestname: guestname,
      gender: gender,
      bookingphone: phoneNumber,
      email: email,
      bookingdate: bookingdate,
      checkindate: checkindate,
      checkoutdate: checkoutdate,
      numadults: numadults,
      numchildren: numchildren,
    });
    if (response.status === 200) {
      console.log("data=>", response.data);
    }
    alert('Gửi yêu cầu đặt phòng thành công');
  };


  const handleClose = () => setOpen(false);


  const { homestayName } = props;
  const { roomType } = props;
  const { roomNumber } = props;
  // const [roomId,setRoomId] = React.useState(undefined);
  // const [room, setRoom] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [guestname, setGuestname] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bookingdate, setBookingdate] = React.useState("");
  const [checkindate, setCheckindate] = React.useState("");
  const [checkoutdate, setCheckoutdate] = React.useState("");
  const [numadults, setNumadults] = React.useState("");
  const [numchildren, setNumchildren] = React.useState("");

  

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeGuestname = (event) => {
    setGuestname(event.target.value);
  };

  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeBookingdate = (date) => {
    setBookingdate(date);
  };

  const handleChangeCheckindate = (date) => {
    setCheckindate(date);
  };

  const handleChangeCheckoutdate = (date) => {
    setCheckoutdate(date);
  };

  const handleChangeNumadults = (event) => {
    setNumadults(event.target.value);
  };

  const handleChangeNumchildren = (event) => {
    setNumchildren(event.target.value);
  };

  const today = dayjs();

  return (
    <div>
      <button onClick={handleOpen} className="btn-booking">
        Đặt phòng
      </button>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} >
          <CloseIcon onClick={handleClose} className="icon-close" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đặt phòng
          </Typography>

          <TextField
            id="outlined-basic"
            label="Mã homestay"
            variant="outlined"
            defaultValue={homestayName}
            disabled={true}
          />

          <TextField
            id="outlined-basic"
            label="Tên phòng"
            variant="outlined"
            defaultValue={roomType}

            disabled={true}
          />

          <TextField
            id="outlined-basic"
            label="Phòng số"
            variant="outlined"
            defaultValue={roomNumber}
            disabled={true}
          />

          <FormControl fullWidth>


            <FormLabel id="demo-row-radio-buttons-group-label">
              Giới tính
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleChangeGender}
            >
              <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
              <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
              <FormControlLabel
                value="LGBT"
                control={<Radio />}
                label="LGBT"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Tên người đặt"
            variant="outlined"
            onChange={handleChangeGuestname}
            value={guestname}
          />
          <TextField
            id="outlined-basic"
            label="Số ĐT"
            variant="outlined"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleChangeEmail}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Ngày đặt"
                onChange={handleChangeBookingdate}
                // defaultValue={today}
                value={bookingdate}
              />
            </DemoContainer>

            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Ngày đến"
                onChange={handleChangeCheckindate}
                value={checkindate} />
            </DemoContainer>

            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Ngày trả phòng"
                onChange={handleChangeCheckoutdate}
                value={checkoutdate}
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            id="outlined-basic"
            label="Số lượng người lớn"
            variant="outlined"
            value={numadults}
            onChange={handleChangeNumadults}
          />
          <TextField
            id="outlined-basic"
            label="Số lượng trẻ em"
            variant="outlined"
            value={numchildren}
            onChange={handleChangeNumchildren}
          />


          <Button variant="outlined" onClick={handleSubmit}>
            Gửi yêu cầu đặt phòng
          </Button>



        </Box>
      </Modal>
    </div>
  );
};

export default ModalTabs;

