import React, { useEffect, useState } from 'react';
import './BookingAdmin.css';
import { Box, Button, Typography, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 200,
  bgcolor: 'background.paper',
  border: '2px solid #1e90ff',
  borderRadius: '5px',
  boxShadow: 22,
  p: 4,
};

const ModalDeleteBookingApproved = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { bookingApprovedId } = props;
  const { roomId } = props;


  const handleDeleteBooking = async () => {
    setRoombookingApproved(RoombookingApproved.filter((roombookingApproved) => roombookingApproved._id !== bookingApprovedId));
    await axios.delete(`http://localhost:3001/api/bookings/${bookingApprovedId}/${roomId}`)
      .then(res => {
        console.log(res);
        alert('Đã xóa đơn đặt phòng thành công !');
        setOpen(false);
        setRoombookingApproved(res.data);
      })
      .catch(error => {
        console.log(error);
      });;
  }

  const [RoombookingApproved, setRoombookingApproved] = useState();
  const getRoombookingApproved = async () => {
    const response = await axios.get(`http://localhost:3001/api/rooms/booking/${roomId}/approved`);
    setRoombookingApproved(response.data);

}

  useEffect(() => {
    getRoombookingApproved();
  }, []);


  // const getBookingsNotApproved = async () => {
  //   const response = await axios.get("http://localhost:3001/api/bookings/notapproved");
  //   if (response.status === 200) {
  //     setBookingsNotApproved(response.data)
  //   }
  // }

  return (
    <div>
      <button
        className="btn-delete-booking"
        onClick={handleOpen}
      >
        <DeleteIcon fontSize='small' className='icon-deleteR' />
        <p className='delete-room'>Xóa</p>
      </button>
      <Modal
        open={open}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form"
          sx={style}>
          <CloseIcon onClick={handleClose} className='icon-close' />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thông báo
          </Typography>

          <p className='dialog-room'>Bạn có muốn xóa đơn đặt phòng này không ?</p>
          <div className='group-btn'>
            <div className='btn-submit'>
              <Button
                variant="outlined"
                size='medium'
                onClick={handleDeleteBooking}
              >Có</Button>
            </div>

            <div className='btn-close'>
              <Button variant="outlined" size='medium' onClick={handleClose}>Đóng</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalDeleteBookingApproved