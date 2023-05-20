import React from "react";
import {Typography, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close"
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import axios from "axios";
import './HomestayDetail.css';



const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 600,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "5px",
    boxShadow: 22,
    p: 4,
};

const ModalEvaluate = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => setOpen(false);


    const handleSubmitEvaluate = async () => {
        console.log({
            homestayname: homestayName,
            customername: customername,
            roomtype: roomType,
            service: service,
            point: point,
            customers: customers,
            comment: comment,
            evaluatedate: evaluateDate,
        });
        const response = await axios.post(`http://localhost:3001/api/evaluates/${homestayId}`, {
            homestayname: homestayName,
            customername: customername,
            roomtype: roomType,
            service: service,
            point: point,
            customers: customers,
            comment: comment,
            evaluatedate: evaluateDate,
        });
        if (response.status === 200) {
            console.log("data=>", response.data);
        }
        alert('Đánh giá thành công');
        setCustomername('');
        setRoomtype('');
        setService('');
        setPoint('');
        setCustomers('');
        setComment('');
    };

    const { homestayId } = props;
    const { evaluateDate } = props;
    const { homestayName } = props;
    const { roomType } = props;
    console.log(roomType);
    const [customername, setCustomername] = React.useState("");
    const [roomtype, setRoomtype] = React.useState("");
    const [service, setService] = React.useState("");
    const [point, setPoint] = React.useState("");
    const [customers, setCustomers] = React.useState("");
    const [comment, setComment] = React.useState("");



    const handleChangeCustomername = (event) => {
        setCustomername(event.target.value);
    };

    const handleChangeRoomtype = (event) => {
        setRoomtype(event.target.value);
    };

    const handleChangeService = (event) => {
        setService(event.target.value);
    };

    const handleChangePoint = (event) => {
        setPoint(event.target.value);
    };

    const handleChangeCustomers = (event) => {
        setCustomers(event.target.value);
    };

    const handleChangeComment = (event) => {
        setComment(event.target.value);
    };





    return (
        <div>
            <button onClick={handleOpen} className="btn-evaluate">
                Viết đánh giá
            </button>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component="form" sx={style} >
                    <CloseIcon onClick={handleClose} className="icon-close" />
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Đánh giá
                    </Typography>

                    <div className="input-eva">
                        <div className="eva-left">
                            <div className="textfield">
                                <TextField
                                    id="outlined-basic"
                                    label="Tên homestay"
                                    variant="outlined"
                                    defaultValue={homestayName}
                                    onChange={handleChangeCustomername}
                                />
                            </div>
        
                            <div className="textfield">
                                <TextField
                                    id="outlined-basic"
                                    label="Tên người đánh giá"
                                    variant="outlined"
                                    value={customername}
                                    onChange={handleChangeCustomername}
                                />
                           </div>
        
                            <div className="textfield">
                                <TextField
                                    id="outlined-basic"
                                    label="Loại phòng lưu trú"
                                    variant="outlined"
                                    defaultValue={roomType}
                                    onChange={handleChangeRoomtype}
                                />
                            </div>
                        </div>
    
                        <div className="eva-right">
                            <div className="textfield">
                                <TextField
                                    id="outlined-basic"
                                    label="Dịch vụ"
                                    variant="outlined"
                                    value={service}
                                    onChange={handleChangeService}
                                />
                            </div>
        
                            <div className="textfield">
                                <TextField
                                    id="outlined-basic"
                                    label="Điểm đánh giá"
                                    variant="outlined"
                                    value={point}
                                    onChange={handleChangePoint}
                                />
                            </div>
        
                            <div className="textfield">
                                <TextField
                                    id="outlined-basic"
                                    label="Đối tượng khách hàng"
                                    variant="outlined"
                                    value={customers}
                                    onChange={handleChangeCustomers}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="evaluate">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                    label="Ngày đánh giá"
                                    defaultValue={evaluateDate}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <div>
                        <label className="label-evaluate">Đánh giá</label>
                        <textarea
                            label="Đánh giá"
                            rows="10"
                            cols="67"
                            value={comment}
                            onChange={handleChangeComment}
                        />
                    </div>
                   


                    <button  onClick={handleSubmitEvaluate} className="btn-send-evaluate">
                        Gửi đánh giá
                    </button>

                </Box>
            </Modal>
        </div>
    );
};

export default ModalEvaluate;

