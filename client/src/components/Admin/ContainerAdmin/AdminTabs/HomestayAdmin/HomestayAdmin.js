import React from 'react';
import './HomestayAdmin.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Modal } from '@mui/material';
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
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 550,
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
  const [value, setValue] = React.useState(2);


  //add a new homestay
  const [code, setCode] = React.useState('');
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [distance, setDistance] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [cheapestPrice, setCheapestPrice] = React.useState('');
  const [img, setImage] = React.useState('');
  const [img1, setImage1] = React.useState('');
  const [img2, setImage2] = React.useState('');
  const [img3, setImage3] = React.useState('');
  const [img4, setImage4] = React.useState('');

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

  const handleChangeDistance = (event) => {
    setDistance(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
  };

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleChangeCheapestPrice = (event) => {
    setCheapestPrice(event.target.value);
  };


  const handleChangeRating = (event, newValue) => {
    setRating(newValue)
  };


  const handleSelectImage = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      setImage(reader.result.slice(23));
    };
  }

  const handleSelectImage1 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      setImage1(reader.result.slice(23));
    };
  }

  const handleSelectImage2 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      setImage2(reader.result.slice(23));
    };
  }

  const handleSelectImage3 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      setImage3(reader.result.slice(23));
    };
  }

  const handleSelectImage4 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      setImage4(reader.result.slice(23));
    };
  }


  const handleAddHomestay = async () => {


    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    console.log({
      code: code,
      name: name,
      address: address,
      district: district,
      phone: phone,
      distance: distance,
      desc: desc,
      cheapestPrice: cheapestPrice,
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
      rating: rating,
      img: img,
    })

    await axios.post("http://localhost:3001/api/homestays/post", {
      code: code,
      name: name,
      address: address,
      district: district,
      phone: phone,
      distance: distance,
      desc: desc,
      cheapestPrice: cheapestPrice,
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4,
      rating: rating,
      img: img,
    }, config)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
    alert('Thêm mới homestay thành công');
    setCode('');
    setName('');
    setAddress('');
    setDistrict('');
    setPhone('');
    setDistance('');
    setCheapestPrice('');
    setImage1('');
    setImage2('');
    setImage3('');
    setImage4('');
    setDesc('');
    setRating('');
    setImage('');
  }




  //get info all homestay
  const [homestays, setHomestays] = useState([]);

  useEffect(() => {
    getHomestays();
  }, [code]);

  const getHomestays = async () => {
    const response = await axios.get("http://localhost:3001/api/homestays");
    if (response.status === 200) {
      setHomestays(response.data)
    }
  }

  console.log("data=>", homestays);

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
        <AddCircleIcon className='icon-addH' />
        <p>Thêm mới homestay</p>
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
            Thêm mới homestay
          </Typography>

          <div className='box-container'>
            <div className='input-left'>
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

              <div>
                <label>Ảnh đại diện</label>
                <input 
                  id="homestay-file"
                  label="Ảnh đại diện"
                  variant="outlined"
                  type="file"

                  onChange={handleSelectImage}
                />
              </div>

              <TextField id="homestay-address"
                label="Địa chỉ"
                variant="outlined"
                value={address}
                onChange={handleChangeAddress}
              />

              <TextField id="homestay-address"
                label="Khoảng cách"
                variant="outlined"
                value={distance}
                onChange={handleChangeDistance}
              />

              <TextField id="homestay-address"
                label="Mô tả"
                variant="outlined"
                value={desc}
                onChange={handleChangeDesc}
              />

              <TextField id="homestay-address"
                label="Giá phòng rẻ nhất"
                variant="outlined"
                value={cheapestPrice}
                onChange={handleChangeCheapestPrice}
              />
            </div>

            <div className='input-right'>
              <div>
                <label>Ảnh chi tiết 1</label>
                <input
                  label="Ảnh chi tiết 1"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage1}
                />
              </div>

              <div>
                <label>Ảnh chi tiết 2</label>
                <input
                  label="Ảnh chi tiết 2"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage2}
                />
              </div>

              <div>
                <label>Ảnh chi tiết 3</label>
                <input
                  label="Ảnh chi tiết 3"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage3}
                />
              </div>

              <div>
                <label>Ảnh chi tiết 4</label>
                <input
                  label="Ảnh chi tiết 4"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage4}
                />
              </div>



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
                  <MenuItem value={"Hoàn Kiếm"}>Hoàn Kiếm </MenuItem>
                  <MenuItem value={"Tây Hồ"}>Tây Hồ </MenuItem>
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
                label="Liên hệ"
                variant="outlined"
                value={phone}
                onChange={handleChangePhone}
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
              <th>Liên hệ</th>
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
                  <td><img src={`data:image/png;base64,${homestay.img}`} alt="" className='img-admin' /></td>
                  <td>{homestay.address}</td>
                  <td>{homestay.district}</td>
                  <td>{homestay.phone}</td>
                  <td>
                    <Box sx={{ '& > legend': { mt: 2 }, }} className='box-rating'>
                      {/* <Rating name="read-only" value={homestay.rating}  ></Rating> */}
                      <Rating
                        name="simple-controlled"
                        value={homestay.rating}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </Box>
                  </td>
                  <td>
                    <button
                      className="btn-edit-homestay"
                      onClick={() => navigate(`/admin/editHomestay/${homestay._id}`)}
                    ><EditIcon fontSize='small' className='icon-editH' />
                      <p className='edit-homestay'>Sửa</p></button>
                    <button
                      className="btn-delete-homestay"
                      onClick={() => handleDeleteHomestay(homestay)}
                    ><DeleteIcon fontSize='small' className='icon-deleteH' />
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