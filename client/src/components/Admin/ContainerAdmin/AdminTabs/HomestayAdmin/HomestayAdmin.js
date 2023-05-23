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
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ModalDeleteHomestay from './ModalDeleteHomestay';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 580,
  bgcolor: 'background.paper',
  border: '1px solid #1976d2',
  borderRadius: '5px',
  boxShadow: 22,
  p: 4,
};



const HomestayAdmin = (props) => {

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



  // search
  const [values,setValues] = useState("")
  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios.get(`http://localhost:3001/api/homestays/search/${values}`)
    .then((res) => setHomestays(res.data))
  }

  const handleReset = () => {
    getHomestays();
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
              <div className='homestay-text'>
                <TextField id="homestay-code"
                  label="Mã homestay"
                  variant="outlined"
                  value={code}
                  onChange={handleChangeCode}
                />
              </div>

              <div className='homestay-text'>
                <TextField id="homestay-name"
                  label="Tên homestay"
                  variant="outlined"
                  value={name}
                  onChange={handleChangeName}
                />
              </div>

              <div className='homestay-text'>
                <label>Ảnh đại diện</label>
                <input 
                  id="homestay-file"
                  label="Ảnh đại diện"
                  variant="outlined"
                  type="file"

                  onChange={handleSelectImage}
                />
              </div>

              <div className='homestay-text'>
                <TextField id="homestay-address"
                  label="Địa chỉ"
                  variant="outlined"
                  value={address}
                  onChange={handleChangeAddress}
                />
              </div>

              <div className='homestay-text'>
                <TextField id="homestay-address"
                  label="Khoảng cách"
                  variant="outlined"
                  value={distance}
                  onChange={handleChangeDistance}
                />
              </div>

              <div className='homestay-text-district'>
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
                    <MenuItem value={"Hoàng Mai"}>Hoàng Mai</MenuItem>
                  </Select>
  
  
                </FormControl>
              </div>

              <div className='homestay-text'>
                <TextField id="homestay-address"
                  label="Giá phòng rẻ nhất"
                  variant="outlined"
                  value={cheapestPrice}
                  onChange={handleChangeCheapestPrice}
                />
              </div>
            </div>

            <div className='input-right'>
              <div className='homestay-text'>
                <label>Ảnh chi tiết 1</label>
                <input
                  label="Ảnh chi tiết 1"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage1}
                />
              </div>

              <div className='homestay-text'>
                <label>Ảnh chi tiết 2</label>
                <input
                  label="Ảnh chi tiết 2"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage2}
                />
              </div>

              <div className='homestay-text'>
                <label>Ảnh chi tiết 3</label>
                <input
                  label="Ảnh chi tiết 3"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage3}
                />
              </div>

              <div className='homestay-text'>
                <label>Ảnh chi tiết 4</label>
                <input
                  label="Ảnh chi tiết 4"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage4}
                />
              </div>



              

              <div className='homestay-text'>
                <TextField
                  id="homestay-numroom"
                  label="Liên hệ"
                  variant="outlined"
                  value={phone}
                  onChange={handleChangePhone}
                />
              </div>

              <div className='homestay-text'>
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

              <label>Mô tả</label>
              <div className='homestay-text'>
                <textarea 
                  rows={10}
                  cols={35}
                  value={desc}
                  onChange={handleChangeDesc}
                />
              </div>
            </div>
          </div>


          <div className='btn-group'>
            <div className='btn-submit'>
              <button
                className='btn-add-homestay'
                size='medium'
                onClick={handleAddHomestay}
              >Thêm</button>
            </div>
  
            <div className='btn-close'>
              <Button variant="outlined" size='medium' onClick={handleClose}>Đóng</Button>
            </div>
          </div>
        </Box>
      </Modal>


      {/* search */}
      <form
        onSubmit={handleSearch}
        className='search-form'
      >
        <input 
          type='search'
          className='form-homestay'
          placeholder='Nhập mã ,tên homestay,địa chỉ,quận...'
          value={values}
          onChange={(e) => setValues(e.target.value)}
        />
        <button type='submit' className='btn-search-homestay'>
        <SearchIcon className='icon-search'/>
          <p className='search-title'>Tìm kiếm</p>
        </button>
        <button onClick={() => handleReset()} className='btn-reset-homestay'>
        <RefreshIcon className='icon-reset'/>
          <p className='reset-title'>Tải lại</p>
        </button>
      </form>

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
                    <ModalDeleteHomestay 
                      homestayId={homestay._id}
                    />
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