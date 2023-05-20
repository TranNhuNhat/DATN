import React from 'react';
import { Typography, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import './HomestayDetail.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 650,
  bgcolor: "background.paper",
  border: "1px solid dodgerblue",
  borderRadius: "5px",
  boxShadow: 22,
  p: 4,
};

const ModalRoomImage = (props) => {
  const { roomType } = props;
  const { imgRoom1 } = props;
  const { imgRoom2 } = props;
  const { imgRoom3 } = props;
  const { imgRoom4 } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div>
      <p className="name-room-image" onClick={handleOpen}>{roomType}</p>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} >
          <CloseIcon onClick={handleClose} className="icon-close" />
          <Typography id="modal-modal-title" variant="h7" component="h2">
            {roomType}
          </Typography>

          <div className='image-room'>
            <div className='image-left'>
              <div id="boxshadow">
                <img src={`data:image/png;base64,${imgRoom1}`} alt='' className='img-room-detail' />
              </div>
              <div id="boxshadow">
                <img src={`data:image/png;base64,${imgRoom2}`} alt='' className='img-room-detail' />
              </div>
            </div>
            <div className='image-right'>
              <div id="boxshadow">
                <img src={`data:image/png;base64,${imgRoom3}`} alt='' className='img-room-detail' />
              </div>
              <div id="boxshadow">
                <img src={`data:image/png;base64,${imgRoom4}`} alt='' className='img-room-detail' />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalRoomImage