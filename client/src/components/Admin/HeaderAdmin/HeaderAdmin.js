import React from 'react';
import logoAdmin from '../../../assets/Image/admin.png';
import './HeaderAdmin.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    bgcolor: 'background.paper',
    border: '2px solid #6495ed',
    boxShadow: 24,
    p: 4,
    borderRadius: 4
  };


const HeaderAdmin = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
  return (
    <div className='header-admin'>
        <img src={logoAdmin} className="admin-logo" alt="logo" />
        <h1 className='title-admin'>Quản lý</h1>
        <button className='btn-logout' onClick={handleOpen}>
           <LogoutIcon className='btn-logout-icon'/>
           <span className='btn-name'>Đăng xuất</span>
        </button>
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
             <CloseIcon onClick={handleClose} className='icon-close'/> 
          <Typography id="modal-modal-title" variant="h3" component="h2" >
            Bạn có muốn đăng xuất không ?
          </Typography>
          
            <div className='btn-end-modal'>
              <div className='btn-submit'>
                  <Button 
                  variant="outlined" 
                  size='medium'
                  onClick={() => navigate('/')}
                  >Có</Button>
              </div>
  
              <div className='btn-close'>
                  <Button variant="outlined" size='medium' onClick={handleClose}>Đóng</Button>
              </div>
            </div >
            </Box>
        </Modal>
    </div>
  )
}

export default HeaderAdmin