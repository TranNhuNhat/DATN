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



const EditHomestay = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  let [homestay, setHomestay] = useState({
    code: "",
    name: "",
    address: "",
    district: "",
    numroom: "",
    rating: "",
    img: "",
  });

  useEffect(() => {
    if (!id) return;
    const getHomestay = async () => {
      const { data } = await axios.get(`http://localhost:3001/api/homestays/${id}`);
      setHomestay(data);
    };
    getHomestay()
  }, [])

  // const [code, setCode] = React.useState('');
  // const [name, setName] = React.useState('');
  // const [address, setAddress] = React.useState('');
  // const [district, setDistrict] = React.useState('');
  // const [numroom, setNumroom] = React.useState(0);
  const [rating, setRating] = React.useState(0);

  const [image, setImage] = React.useState('');

  const handleChange = (e) => {
    if (e.target.name === "image") {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = function () {
        setImage(reader.result.slice(23));
        homestay.image = reader.result.slice(23)
      }
    }
     else {
      const homestayClone = { ...homestay };
      homestayClone[e.target.name] = e.target.value;
      setHomestay(homestayClone);
    }

  };

  // const handleChangeName = (event) => {
  //   setName(event.target.value);
  // };

  // const handleChangeAddress = (event) => {
  //   setAddress(event.target.value);
  // };

  // const handleChangeDistrict = (event) => {
  //   setDistrict(event.target.value);
  // };


  // const handleChangeCode = (event) => {
  //   setCode(event.target.value);
  // };

  // const handleChangeNumroom = (event) => {
  //   setNumroom(event.target.value);
  // };


  const handleSelectImage = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = function () {
      setImage(reader.result.slice(23));
    };

  }

  //edit a homestay
  const handleEditHomestay = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:3001/api/homestays/${id}`, homestay);
    console.log(homestay);
    return navigate('/admin')
  }


  return (
    <div>
      <div className="homestay__wrapper">
        <div className="container">
          <form className="homestay">
            <input
              type="text"
              placeholder="Title..."
              name="code"
              value={homestay.code}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Content..."
              name="name"
              value={homestay.name}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Content..."
              name="address"
              value={homestay.address}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Quận</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Quận"
                value={homestay.district}
                onChange={handleChange}
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

            <input
              type="text"
              placeholder="Content..."
              name="numroom"
              value={homestay.numroom}
              onChange={handleChange}
            />


            <img src={`data:image/png;base64,${image}`} alt="" className='image' />
            <input id="homestay-file"
              name="image"
              label="Ảnh"
              variant="outlined"
              type="file"
              onChange={handleSelectImage}
            />

            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
              className='box-rating'
            >
              <Typography component="legend">Đánh giá</Typography>
              <Rating
                name="rating"
                value={homestay.rating}
                onChange={(event,newValue) => {
                  setRating(newValue)}
                }/>
            </Box>

            <button onClick={handleEditHomestay} className="btn btn-primary">
              Cập nhật
            </button>

            <button onClick={() => navigate('/admin')} className="btn btn-primary">
              Quay lại
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditHomestay