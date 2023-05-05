import React from 'react';
import logo from '../../../assets/Image/logo.jpg';
import {Box,Button,Typography,Modal} from '@mui/material';
import TextField from '@mui/material/TextField';
import './Header.css';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 460,
    bgcolor: 'background.paper',
    border: '1px solid #1976d2',
    borderRadius: '5px', 
    boxShadow: 22,
    p: 4,
  };


const Header = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    

    const [username,setUsername] = React.useState('');
    const [password,setPassword] = React.useState('');

    const handleChangeUsername  = (event) => {
        setUsername(event.target.value)
    };

    const handleChangePassword  = (event) => {
        setPassword(event.target.value)
    };

    const history = useNavigate();

    async function submit(e){
      e.preventDefault();

      try {
        await axios.post("http://localhost:3001/api/admins/login",{
          username,password
        })
        .then(res => {
          if(res.data === "exist"){
            alert("Đăng nhập thành công !!!");
             history("/admin");
          }else if(res.data === "notexist"){
            alert("Tài khoản không tồn tại,vui lòng kiểm tra lại thông tin !!!")
          }
        })
      } catch (e) {
        alert('Tài khoản sai');
        console.log(e);
      }
    }



  return (
    <div className='header'>
        <img src={logo} className="app-logo" alt="logo" />
        <h1 className='title'>Homestay Hà Nội</h1>
        <button onClick={handleOpen} className='btn-login'>Đăng nhập</button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form"
             sx={style}>
          <AdminPanelSettingsIcon sx={{ fontSize: 60, justifyItems:'center'}} className='icon-admin'/> 
          <CloseIcon onClick={handleClose} className='icon-close'/> 
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đăng nhập Quản lý
          </Typography>
          <div>
            <div className='input-login'>
                <Typography className='nameAdmin'>Tên tài khoản</Typography>
              <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    value={username}
                    onChange={handleChangeUsername}
              />
            </div>

            <div className='input-login--password'>
                <Typography className='namePassword'>Mật khẩu</Typography>
                <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handleChangePassword}
                    />

            </div>
          </div>
          
            <div className='btn-login-submit'>
                <Button 
                variant="contained" 
                size='medium'
                onClick={submit}
                >Đăng nhập</Button>
            </div>

            <div className='btn-close'>
                <Button variant="outlined" size='medium' onClick={handleClose}>Đóng</Button>
            </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Header