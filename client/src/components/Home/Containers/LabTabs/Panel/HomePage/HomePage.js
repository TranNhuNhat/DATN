import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import './HomePage.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useNavigate } from 'react-router-dom';




const HomePage = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);


    useEffect(() => {
        getHomestays();
    }, []);

    const getHomestays = async () => {
        const response = await axios.get("http://localhost:3001/api/homestays/some");
        if (response.status === 200) {
            setData(response.data)
        }
    }

    console.log("data=>", data);



    // sao tang dan
    // const ascendingStar = () => {
    //     let result1;
    //     result1 = [...data].sort((a, b) => {
    //         return a.rating - b.rating;
    //     })
    //     setData(result1)
    // }

    // sao giam dan
    // const decreasingStar = () => {
    //     let result2;
    //     result2 = [...data].sort((a, b) => {
    //         return b.rating - a.rating;
    //     })
    //     setData(result2)
    // }

    const onSortStar = async (event) => {
        let response = await axios.get("http://localhost:3001/api/homestays/some");
        console.log(event.target.value);
        let sortedHomestayList = response.data.sort((a,b) => {
            if (event.target.value === 'asc') {
                return a.rating - b.rating;
            } else  {
                return b.rating - a.rating;
            } 
        })
        console.log('sortedHomestayList', sortedHomestayList);
        if (event.target.value === 'all1') {
            setData(response.data)
        } else {
            setData(sortedHomestayList);
        }
    }

    const onFilterStarSelected = async (event) => {
        let response = await axios.get("http://localhost:3001/api/homestays/some");
        console.log(event.target.value);
        let filteredHomestayList = response.data.filter((homestay) => {
            if (event.target.value === 'five') {
                return homestay.rating === 5;
            } else if (event.target.value === 'four') {
                return homestay.rating === 4;
            } else {
                return homestay.rating === 3;
            }
        })
        console.log('filteredHomestayList', filteredHomestayList);
        if (event.target.value === 'all') {
            setData(response.data)
        } else {
            setData(filteredHomestayList);
        }
    }

    const onFilterDistanceSelected = async (event) => {
        let response = await axios.get("http://localhost:3001/api/homestays/some");
        console.log(event.target.value);
        let filteredHomestayListDistance = response.data.filter((homestay) => {
            if (event.target.value === 'Two') {
                return homestay.distance <= 2;
            } else if (event.target.value === 'Three') {
                return homestay.distance <= 3;
            } else {
                return homestay.distance <= 5;
            }
        })
        console.log('filteredHomestayListDistance', filteredHomestayListDistance);
        if (event.target.value === 'All') {
            setData(response.data)
        } else {
            setData(filteredHomestayListDistance);
        }
    }


    return (
        <div>
        
            <h3>Sắp xếp & bộ lọc</h3>
            <div className='sort-filter'>
                <div className='sort-star'>
                    <label>Sắp xếp theo sao:</label>
                    <select name="star-sort" onChange={onSortStar} className='sort-star-ad'>
                        <option value="all1">Tất cả</option>
                        <option value="asc">Tăng dần</option>
                        <option value="des">Giảm dần</option>
                    </select>
                </div>

                <div className='filter-star'>
                    <label>Xếp hạng homestay:</label>
                    <select name="star" onChange={onFilterStarSelected} className='select-star'>
                        <option value="all">Tất cả</option>
                        <option value="five">5 sao</option>
                        <option value="four">4 sao</option>
                        <option value="three">3 sao</option>
                    </select>
                </div>

                <div className='filter-distance'>
                    <label>Khoảng cách so với trung tâm Hà Nội:</label>
                    <select name="distance" onChange={onFilterDistanceSelected} className='select-distance'>
                        <option value="All">Tất cả</option>
                        <option value="Two">Dưới 2 km</option>
                        <option value="Three">Dưới 3 km</option>
                        <option value="Five">Dưới 5 km</option>
                    </select>
                </div>
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