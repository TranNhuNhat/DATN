/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
// import ModalTabs from '../../ModalTabs/ModalTabs';
import './DetailPage.css';
import { useNavigate } from 'react-router-dom';


const DetailPage = (props) => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { district } = props;
    console.log(district);

    useEffect(() => {
        getDetailHomestay();
    }, []);

    const getDetailHomestay = async () => {
        const response = await axios.get("http://localhost:3001/api/homestays/district", {
            params: {
                district: district
            }
        })
            .catch(function (error) {
                console.log(error)
            })
        if (response.status === 200) {
            setData(response.data)
            console.log("data=>", response.data);
        }
    }

    const onFilterStarSelected = async (event) => {
        let response = await axios.get("http://localhost:3001/api/homestays/district", {
            params: {
                district: district
            }
        });
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

    const onSortStar = async (event) => {
        let response = await axios.get("http://localhost:3001/api/homestays/district", {
            params: {
                district: district
            }
        });
        console.log(event.target.value);
        let sortedHomestayList = response.data.sort((a, b) => {
            if (event.target.value === 'asc') {
                return a.rating - b.rating;
            } else {
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

    return (
        <div>
            <h3>Sắp xếp & bộ lọc</h3>
            <div className='sort-filter-district'>
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
            </div>
            <div className='detail-page'>
                {data &&
                    data.map((item, index) => {
                        return (
                            <div key={index} className='detail-listall'>
                                <ul className='list-detail' key={index}>
                                    <li
                                        onClick={() => navigate(`/home/HomestayDetail/${item._id}`)}
                                    >{item.name}</li>
                                    <li><img src={`data:image/png;base64,${item.img}`} alt="" className='image' /></li>
                                    <li>Mã homestay:{item.code}</li>
                                    <li>Địa chỉ:{item.address}</li>
                                    <li>Quận:{item.district}</li>
                                    <li>Số phòng:{item.numroom}</li>
                                </ul>
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                    className='box-rating'
                                >
                                    <Typography component="legend" className='text'>Đánh giá</Typography>
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

export default DetailPage