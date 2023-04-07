import React from 'react';
import './HomestayAdmin.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Box,Button,Typography,Modal} from '@mui/material';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '1px solid #1976d2',
  borderRadius: '5px', 
  boxShadow: 22,
  p: 4,
};



const HomestayAdmin = () => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();


  //add a new homestay
  const [code, setCode] = React.useState('');
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [numroom, setNumroom] = React.useState(0);
  const [rating, setRating] = React.useState(0);

  const [img, setImage] = React.useState('');

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };


  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleChangeNumroom = (event) => {
    setNumroom(event.target.value);
  };

  const handleChangeRating = (event,newValue) => {
    setRating(newValue)
  };

  const handleSelectImage = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function() {
        setImage(reader.result.slice(23));
    };
    
  } 


  const handleAddHomestay = async () => {
    // const formData = new FormData();
    // formData.append("code", code);
    // formData.append("name", name);
    // formData.append("address", address);
    // formData.append("district", district);
    // formData.append("numroom", numroom);
    // formData.append("rating", rating);
    // formData.append("img", img);

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log({
      code:code,
      name:name,
      address:address,
      district:district,
      numroom:numroom,
      rating:rating,
      img:img,
    })

    await axios.post("http://localhost:3001/api/homestays/post",{
      code:code,
      name:name,
      address:address,
      district:district,
      numroom:numroom,
      rating:rating,
      img:img,
    },config)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    })
    
    
    // if (res.status === 200) {
    //   console.log("data=>", res.data);
    // };
    alert('Thêm mới homestay thành công');
    setCode('');
    setName('');
    setAddress('');
    setDistrict('');
    setNumroom('');
    setRating('');
    setImage('');
  }
 

  

  //get info all homestay
  const [homestays,setHomestays] = useState([]);

    useEffect(()=> {
        getHomestays();
    },[code]);

    const getHomestays = async () => {
        const response = await axios.get("http://localhost:3001/api/homestays");
        if(response.status === 200) {
          setHomestays(response.data)
        }
    }

    console.log("data=>",homestays);

    const handleDeleteHomestay = async (homestay) => {
      setHomestays(homestays.filter((ht) => ht._id !== homestay._id));
      await axios.delete(`http://localhost:3001/api/homestays/${homestay._id}`);
  }

  return (
    <div>
          <button
              className='btn-addHomestay' 
              onClick={handleOpen}
          >
            <AddCircleIcon className='icon-addH'/>
            <p>Thêm mới homestay</p>
          </button>

          <Modal
            open={open}
            
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box component="form"
                sx={style}>
              <CloseIcon onClick={handleClose} className='icon-close'/> 
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Thêm mới homestay
              </Typography>
              
              <div className='box-container'>
                <TextField id="homestay-code"
                   label="Mã homestay"
                   variant="outlined"
                   value={code}
                   onChange={handleChangeCode}
                />
  
                <TextField id="homestay-name"
                   label="Tên homestay"
                   variant="outlined"
                   value={name}
                   onChange={handleChangeName}   
                />
  
                <input id="homestay-file"
                   label="Ảnh"
                   variant="outlined"
                   type="file" 
                   onChange={handleSelectImage}
                   />
  
                <TextField id="homestay-address"
                   label="Địa chỉ"
                   variant="outlined"
                   value={address}
                   onChange={handleChangeAddress} 
                />
  
  
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Quận</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="homestay-district"
                    label="Quận"
                    value={district}
                    onChange={handleChangeDistrict}
                  >
                    <MenuItem value={"Ba Đình"}>Ba Đình</MenuItem>
                    <MenuItem value={"Hoàn Kiếm" }>Hoàn Kiếm </MenuItem>
                    <MenuItem value={"Tây Hồ" }>Tây Hồ </MenuItem>
                    <MenuItem value={"Đống Đa"}>Đống Đa</MenuItem>
                    <MenuItem value={"Thanh Xuân"}>Thanh Xuân</MenuItem>
                    <MenuItem value={"Hai Bà Trưng"}>Hai Bà Trưng</MenuItem>
                    <MenuItem value={"Hà Đông"}>Hà Đông</MenuItem>
                    <MenuItem value={"Cầu Giấy"}>Cầu Giấy</MenuItem>
                    <MenuItem value={"Long Biên"}>Long Biên</MenuItem>
                  </Select>
  
              
                </FormControl>
  
                <TextField
                  id="homestay-numroom"
                  label="Số phòng"
                  variant="outlined"
                  value={numroom}
                  onChange={handleChangeNumroom} 
                />
  
                <Box
                  sx={{
                      '& > legend': { mt: 2 },
                  }}
                  className='box-rating'
                  >
                  <Typography component="legend">Đánh giá</Typography>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={handleChangeRating}
                  />
                </Box>
              </div>
          
              
                <div className='btn-submit'>
                    <Button 
                    variant="contained" 
                    size='medium'
                    onClick={handleAddHomestay}
                    >Thêm</Button>           
                </div>

                <div className='btn-close'>
                    <Button variant="outlined" size='medium' onClick={handleClose}>Đóng</Button>
                </div>
            </Box>
          </Modal>

          <div className="table-homestay">
          <table className='table'>
            <thead>
              <tr>
                <th>Mã homestay</th>
                <th>Tên homestay</th>
                <th>Ảnh</th>
                <th>Địa chỉ</th>
                <th>Quận</th>
                <th>Số phòng</th>
                <th>Đánh giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
            {homestays && homestays.map((homestay) => {
              return (
                  <tr key={homestay._id}>
                    <td>{homestay.code}</td> 
                    <td>{homestay.name}</td>
                    <td><img src={`data:image/png;base64,${homestay.img}`} alt="" className='img-admin'/></td>
                    <td>{homestay.address}</td>
                    <td>{homestay.district}</td>
                    <td>{homestay.numroom}</td>
                    <td>
                        <Box sx={{'& > legend': { mt: 2 },}} className='box-rating'>
                              <Rating name="read-only"  value={homestay.rating}  readOnly ></Rating>
                        </Box>
                    </td>
                    <td>
                      <button 
                          className="btn-edit-homestay"
                          onClick={() => navigate(`/admin/editHomestay/${homestay._id}`)}
                      ><EditIcon fontSize='small' className='icon-editH'/> 
                        <p className='edit-homestay'>Sửa</p></button>
                      <button 
                      className="btn-delete-homestay"
                      onClick={() => handleDeleteHomestay(homestay)}
                      ><DeleteIcon fontSize='small' className='icon-deleteH'/>
                       <p className='delete-homestay'>Xóa</p>
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

export default HomestayAdmin