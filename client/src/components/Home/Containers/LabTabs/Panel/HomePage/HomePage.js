import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Typography} from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import './HomePage.css';

const HomePage = () => {
    const [data,setData] = useState([]);

    useEffect(()=> {
        getHomestays();
    },[]);

    const getHomestays = async () => {
        const response = await axios.get("http://localhost:3001/api/homestays");
        if(response.status === 200) {
            setData(response.data)
        }
    }

    console.log("data=>",data);
    // const [value1, setValue1] = React.useState(2);
  return (
    <div>
        <div className='home-page'>
            {data &&
                data.map((item,index)=> {
                    return (
                            <div key={index} className='homestay-listall'>
                                <ul className='list-home' key={index}>
                                    <li>{item.name}</li>
                                    <li><img src={`data:image/png;base64,${item.img}`} alt="" className='image'/></li>
                                    <li>Mã homestay: {item.code}</li>
                                    <li>Địa chỉ: {item.address}</li>
                                    <li>Quận: {item.district}</li>
                                    <li>Số phòng:{item.numroom}</li>    
                                </ul>
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                    className='box-rating'
                                    >
                                    <Typography component="legend">Đánh giá</Typography>
                                    <Rating name="read-only"  value={item.rating}  readOnly ></Rating>
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