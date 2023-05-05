import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import './HomePage.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { useNavigate } from 'react-router-dom';



const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

const HomePage = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [district, setDistrict] = useState('');
  

    useEffect(() => {
        getHomestays();
    }, []);

    const getHomestays = async () => {
        const response = await axios.get("http://localhost:3001/api/homestays");
        if (response.status === 200) {
            setData(response.data)
        }
    }

    console.log("data=>", data);


    // const getHomestaysDistrict = async () => {
    //     let response = await axios.get(`http://localhost:3001/api/homestays/district?district=${}`);
    //     if (response.status === 200) {
    //         setData(response.data)
    //     }
    // }

    const handleChangeDistrict = (event) => {
        setDistrict(event.target.value);
      };

    const handleSearch = async () => {
        let response = await axios.get(`http://localhost:3001/api/homestays/district?district=${district}`);
        if (response.status === 200) {
            setData(response.data)
        }
    }
    




    // sao tang dan
    const ascendingStar = () => {
        let result1;
        result1 = [...data].sort((a, b) => {
            return a.rating - b.rating;
        })
        setData(result1)
    }

    // sao giam dan
    const decreasingStar = () => {
        let result2;
        result2 = [...data].sort((a, b) => {
            return b.rating - a.rating;
        })
        setData(result2)
    }

    const onFilterStarSelected = async (event) => {
        let response = await axios.get("http://localhost:3001/api/homestays");
        console.log(event.target.value);
        let filteredHomestayList = response.data.filter((homestay) => {
            if(event.target.value === 'five'){
                return homestay.rating === 5;
            }else if(event.target.value === 'four'){
                return homestay.rating === 4;
            }else {
                return homestay.rating === 3;
            }
        }) 
        console.log('filteredHomestayList', filteredHomestayList);
        setData(filteredHomestayList);
    }


    return (
        <div>
            <div className='search-bar'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem label="Ngày đến">
                        <DatePicker
                            defaultValue={today}
                            minDate={tomorrow}
                            views={['year', 'month', 'day']}
                        />
                    </DemoItem>

                    <DemoItem label="Ngày trả phòng">
                        <DatePicker
                            defaultValue={today}
                            minDate={tomorrow}
                            views={['year', 'month', 'day']}
                        />
                    </DemoItem>

                </LocalizationProvider>

                <div className='select'>
                    <InputLabel id="demo-simple-select-label">Quận</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Quận"
                        value={district}
                        onChange={handleChangeDistrict}
                    >
                        <MenuItem value={"Ba Đình"}>Quận Ba Đình</MenuItem>
                        <MenuItem value={"Hoàn Kiếm"}>Quận Hoàn Kiếm</MenuItem>
                        <MenuItem value={"Tây Hồ"}>Quận Tây Hồ</MenuItem>
                        <MenuItem value={"Đống Đa"}>Quận Đống Đa</MenuItem>
                        <MenuItem value={"Thanh Xuân"}>Quận Thanh Xuân</MenuItem>
                        <MenuItem value={"Hai Bà Trưng"}>Quận Hai Bà Trưng</MenuItem>
                        <MenuItem value={"Hà Đông"}>Quận Hà Đông</MenuItem>
                        <MenuItem value={"Cầu Giấy"}>Quận Cầu Giấy</MenuItem>
                        <MenuItem value={"Long Biên"}>Quận Long Biên</MenuItem>
                    </Select>
                </div>


                <button className='btn-search' onClick={handleSearch}>Tìm kiếm</button>
            </div>


            <div>Sắp xếp theo sao:
                <button onClick={ascendingStar}>Tăng dần</button>
                <button onClick={decreasingStar}>Giảm dần</button>
            </div>

            {/* <FilterHomestayStar filterStarSelected={onFilterStarSelected}></FilterHomestayStar> */}

            <div>
            <label>Lọc theo sao</label>
            <select name="star" onChange={onFilterStarSelected}>
                <option value="all">Tất cả</option>
                <option value="five">5 sao</option>
                <option value="four">4 sao</option>
                <option value="three">3 sao</option>
            </select>
        </div>

            
            <div className='home-page'>
                {data &&
                    data.map((item, index) => {
                        return (
                            <div key={index} className='homestay-listall'>
                                <ul className='list-home' key={index}>
                                    <li
                                        onClick={() => navigate(`/home/HomestayDetail/${item._id}`)}
                                    >{item.name}</li>
                                    <li><img src={`data:image/png;base64,${item.img}`} alt="" className='image' /></li>
                                    <li>Mã homestay: {item.code}</li>
                                    <li>Địa chỉ: {item.address}</li>
                                    <li>Quận: {item.district}</li>
                                </ul>
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                    className='box-rating'
                                >
                                    <Typography component="legend">Đánh giá</Typography>
                                    <Rating name="read-only" value={item.rating} readOnly ></Rating>
                                </Box>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default HomePage