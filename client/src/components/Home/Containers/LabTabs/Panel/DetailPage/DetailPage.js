/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {Typography} from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import ModalTabs from '../../ModalTabs/ModalTabs';
import './DetailPage.css';


const DetailPage = (props) => {
    const [data,setData] = useState([]);
    const { district } = props; 
    console.log(district);

    useEffect(()=> {
        getDetailHomestay();
    },[]);

    const getDetailHomestay = async () => {
        const response = await axios.get("http://localhost:3001/api/homestays/district", {
            params: {
              district: district
            }
          })
          .catch(function (error) {
            console.log(error)
            })
        if(response.status === 200) {
            setData(response.data)
            console.log("data=>",response.data);
        }
    }
    
  return (
    <div>
        <div className='detail-page'>
            {data &&
                data.map((item,index)=> {
                    return (
                            <div key={index} className='detail-listall'>
                                <ul className='list-detail' key={index}>
                                    <li>{item.name}</li>
                                    <li><img src={`data:image/png;base64,${item.img}`} alt="" className='image'/></li>
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
                                    <Rating name="read-only"  value={item.rating} readOnly ></Rating>
                                    </Box>

                                    <ModalTabs homestayCode={item.code}/>
                            </div>
                    )
                })
            }
                  
            </div>
    </div>
  )
}

export default DetailPage