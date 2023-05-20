import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Rating from '@mui/material/Rating';
import './EditHomestay.css';



const EditHomestay = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  let [homestay, setHomestay] = useState({
    code: "",
    name: "",
    address: "",
    district: "",
    phone: "",
    distance: "",
    desc: "",
    cheapestPrice: "",
    rating: "",
    img: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });

  useEffect(() => {
    if (!id) return;
    const getHomestay = async () => {
      const { data } = await axios.get(`http://localhost:3001/api/homestays/${id}`);
      setHomestay(data);
    };
    getHomestay()
  }, [])


  // const [image, setImage] = React.useState('');
  // const [img1, setImage1] = React.useState('');
  // const [img2, setImage2] = React.useState('');
  // const [img3, setImage3] = React.useState('');
  // const [img4, setImage4] = React.useState('');

  const handleChange = (e) => {
    const homestayClone = { ...homestay };
    homestayClone[e.target.name] = e.target.value;
    setHomestay(homestayClone);
  };



  const handleSelectImage = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      let homestayClone = { ...homestay };
      homestayClone['img'] = reader.result.slice(23);
      setHomestay(homestayClone);
    };

  }

  const handleSelectImage1 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      let homestayClone = { ...homestay };
      homestayClone['img1'] = reader.result.slice(23);
      setHomestay(homestayClone);
    };
  }

  const handleSelectImage2 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      let homestayClone = { ...homestay };
      homestayClone['img2'] = reader.result.slice(23);
      setHomestay(homestayClone);
    };
  }

  const handleSelectImage3 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      let homestayClone = { ...homestay };
      homestayClone['img3'] = reader.result.slice(23);
      setHomestay(homestayClone);
    };
  }

  const handleSelectImage4 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      let homestayClone = { ...homestay };
      homestayClone['img4'] = reader.result.slice(23);
      setHomestay(homestayClone);
    };
  }


  //edit a homestay
  const handleEditHomestay = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:3001/api/homestays/${id}`, homestay)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
    console.log(homestay);
    return navigate('/admin')
  }


  return (
    <div>
      <div className='title-homestay'>
        <h1 className='homestay-title'>Cập nhật homestay</h1>
      </div>


      <div className="container">
        <form className="homestay">
          <div className='homestay-input'>
            <div className='homestay-input-left'>

              <div>
                <label>Mã homestay</label>
                <input
                  className='homestay-code'
                  type="text"
                  placeholder="Title..."
                  name="code"
                  value={homestay.code}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Tên homestay</label>
                <input
                  className='homestay-name'
                  type="text"
                  placeholder="Content..."
                  name="name"
                  value={homestay.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Địa chỉ</label>
                <input
                  className='homestay-address'
                  type="text"
                  placeholder="Content..."
                  name="address"
                  value={homestay.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Quận</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Quận"
                    value={homestay.district}
                    onChange={handleChange}
                    name='district'
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
              </div>

              <div>
                <label>Liên hệ</label>
                <input
                  className='homestay-phone'
                  type="text"
                  placeholder="Content..."
                  name="phone"
                  value={homestay.phone}
                  onChange={handleChange}
                />
              </div>


              {/* <img src={`data:image/png;base64,${image}`} alt="" className='image' /> */}
              <div>
                <label>Ảnh đại diện </label>
                <input 
                  className="homestay-file"
                  name="img"
                  label="Ảnh"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage}
                />
              </div>

              <Box
                sx={{
                  '& > legend': { mt: 2 },
                }}
                className='box-rating'
              >
                <Typography component="legend">Đánh giá</Typography>
                <Rating
                  value={homestay.rating}
                  onChange={(event, newValue) => {
                    const homestayClone = { ...homestay };
                    homestayClone['rating'] = newValue;
                    setHomestay(homestayClone);
                  }
                  } />
              </Box>
            </div>

            <div className='homestay-input-right'>
              <div>
                <label>Khoảng cách so với trung tâm</label>
                <input
                  className='homestay-distance'
                  type="text"
                  placeholder="Content..."
                  name="distance"
                  value={homestay.distance}
                  onChange={handleChange}
                />
              </div>

              <label className='label-desc'>Mô tả</label>
              <div>
                <textarea
                  className='homestay-desc'
                  placeholder="Content..."
                  cols="50"
                  rows="10"
                  name="desc"
                  value={homestay.desc}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Giá phòng rẻ nhất</label>
                <input
                  className='homestay-cheapestPrice'
                  type="text"
                  placeholder="Content..."
                  name="cheapestPrice"
                  value={homestay.cheapestPrice}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Ảnh 1</label>
                <input
                  className='img-sub'
                  name="img1"
                  label="Ảnh chi tiết 1"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage1}
                />
              </div>

              <div>
                <label>Ảnh 2</label>
                <input
                  className='img-sub'
                  name="img2"
                  label="Ảnh chi tiết 2"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage2}
                />
              </div>

              <div>
                <label>Ảnh 3</label>
                <input
                  className='img-sub'
                  name="img3"
                  label="Ảnh chi tiết 3"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage3}
                />
              </div>

              <div>
                <label>Ảnh 4</label>
                <input
                  className='img-sub'
                  name="img4"
                  label="Ảnh chi tiết 4"
                  variant="outlined"
                  type="file"
                  onChange={handleSelectImage4}
                />
              </div>
            </div>
          </div>

        </form>
        <button onClick={handleEditHomestay} className="btn-editHomestay">
          Cập nhật
        </button>

        <button onClick={() => navigate('/admin')} className="btn-exit">
          Quay lại
        </button>
      </div>
    </div>
  )
}

export default EditHomestay