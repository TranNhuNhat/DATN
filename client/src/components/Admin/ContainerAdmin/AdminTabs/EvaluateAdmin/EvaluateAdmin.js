import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './EvaluateAdmin.css';


import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ModalDeleteEvaluate from './ModalDeleteEvaluate';

const EvaluateAdmin = (props) => {
    // const [evaluates, setEvaluates] = useState([]);
    const [evaluatesNotApproveds, setEvaluatesNotApproved] = useState([]);
    const [evaluatesApproveds, setEvaluatesApproved] = useState([]);
    const [approved, setApproved] = React.useState('');


    // lay du lieu bai danh gia chua duyet
    useEffect(() => {
        getEvaluatesNotApproved();
    }, [approved]);


    const getEvaluatesNotApproved = async () => {
        const response = await axios.get("http://localhost:3001/api/evaluates/notapproved");
        if (response.status === 200) {
            setEvaluatesNotApproved(response.data)
        }
    }

    console.log("data=>", evaluatesNotApproveds);


    // lay du lieu bai danh gia da duyet
    useEffect(() => {
        getEvaluatesApproved();
    }, [approved]);


    const getEvaluatesApproved = async () => {
        const response = await axios.get("http://localhost:3001/api/evaluates/approved");
        if (response.status === 200) {
            setEvaluatesApproved(response.data)
        }
    }

    console.log("data=>", evaluatesApproveds);

    // duyet bai danh gia
    const handleAcceptEvaluates = async (evaluatesNotApproved) => {
        setEvaluatesNotApproved(evaluatesNotApproveds.filter((en) => en._id !== evaluatesNotApproved._id));
        await axios.put(`http://localhost:3001/api/evaluates/updateApproved/${evaluatesNotApproved._id}`)
            .then(res => {
                console.log(res);
                alert('Bài đánh giá đã được xác nhận !')
            })
            .catch(error => {
                console.log(error);
            });
    };


    // xoa bai danh gia
    // const handleDeleteEvaluate = async (evaluate) => {
    //     setEvaluates(evaluates.filter((e) => e._id !== evaluate._id));
    //     await axios.delete(`http://localhost:3001/api/evaluates/${evaluate._id}`)
    //         .then(res => {
    //             console.log(res);
    //             alert('Đã xóa bài đánh giá !')
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });;
    // }

    // search approved
    const [values, setValues] = useState("")
    const handleSearchEvaluateApproved = async (e) => {
        e.preventDefault();
        return await axios.get(`http://localhost:3001/api/evaluates/approved/search/${values}`)
            .then((res) => setEvaluatesApproved(res.data))
    }

    // const handleResetEvaluateApproved = () => {
    //     getEvaluatesApproved();
    // }

    // search not approved
    const [value1, setValue1] = useState("")
    const handleSearchEvaluateNotApproved = async (e) => {
        e.preventDefault();
        return await axios.get(`http://localhost:3001/api/evaluates/notapproved/search/${value1}`)
            .then((res) => setEvaluatesNotApproved(res.data))
    }

    // const handleResetEvaluateNotApproved = () => {
    //     getEvaluatesNotApproved();
    // }

    // tim kiem bai danh gia cua homestay
    const [homestayId, setHomestayId] = useState(undefined);

    //get allhomestays
    const [homestays, setHomestays] = useState([]);

    useEffect(() => {
        getHomestays();
    }, []);

    const getHomestays = async () => {
        const response = await axios.get("http://localhost:3001/api/homestays");
        if (response.status === 200) {
            setHomestays(response.data)
        }
    }

    const [HomestayEvaluateApproved, setHomestayEvaluateApproved] = useState();


    const handleChangeHomestayId = (e) => {
        setHomestayId(e.target.value);
        console.log(e.target.value);
    }

    const searchEvaluateApproved = async () => {
        const response = await axios.get(`http://localhost:3001/api/homestays/evaluate/${homestayId}/approved`);
        setHomestayEvaluateApproved(response.data);
        // response.map((room) => (console.log(room?.roomtype)));

    }



    return (
        <div>
            <h2 className='evaluate-title'>Bài đánh giá chưa duyệt</h2>
            {/* search */}
            <form
                onSubmit={handleSearchEvaluateNotApproved}
                className='search-form'
            >
                <input
                    type='search'
                    className='form-search-evaluate'
                    placeholder='Nhập tên homestay,người đánh giá,loại phòng,dịch vụ,đối tượng,...'
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                />
                <button type='submit' className='btn-search-evaluate'>
                    <SearchIcon className='icon-search' />
                    <p className='search-title'>Tìm kiếm</p>
                </button>
            </form>
            <div>
                <div className="table-booking">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Tên homestay</th>
                                <th>Người đánh giá</th>
                                <th>Tên phòng</th>
                                <th>Ngày đánh giá</th>
                                <th>Dịch vụ</th>
                                <th>Điểm đánh giá</th>
                                <th>Đối tượng</th>
                                <th>Bình luận</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evaluatesNotApproveds.map((evaluatesNotApproved) => {
                                return (
                                    <tr key={evaluatesNotApproved._id}>
                                        <td>{evaluatesNotApproved.homestayname}</td>
                                        <td>{evaluatesNotApproved.customername}</td>
                                        <td>{evaluatesNotApproved.roomtype}</td>
                                        <td>{evaluatesNotApproved.evaluatedate}</td>
                                        <td>{evaluatesNotApproved.service}</td>
                                        <td>{evaluatesNotApproved.point}</td>
                                        <td>{evaluatesNotApproved.customers}</td>
                                        <td>{evaluatesNotApproved.comment}</td>
                                        <td>
                                            <button
                                                className="btn-edit-booking"
                                                onClick={() => handleAcceptEvaluates(evaluatesNotApproved)}
                                            ><EditIcon fontSize='small' className='icon-editB' />
                                                <p className='edit-booking'>Duyệt</p></button>
        
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <h2 className='evaluate-title'>Bài đánh giá đã duyệt</h2>
            <div className='choose-booking'>
                <label>Chọn 1 homestay</label>
                <select
                    onChange={handleChangeHomestayId}
                    className='select-booking'
                >
                    {homestays &&
                        homestays.map((homestay) => (
                            <option key={homestay._id} value={homestay._id}>{homestay.name}</option>
                        ))}
                </select>

                <button onClick={searchEvaluateApproved} className='btn-search-choose-eva'>Tìm kiếm</button>
            </div>
            
            <div className="table-booking">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Tên homestay</th>
                            <th>Người đánh giá</th>
                            <th>Tên phòng</th>
                            <th>Ngày đánh giá</th>
                            <th>Dịch vụ</th>
                            <th>Điểm đánh giá</th>
                            <th>Đối tượng</th>
                            <th>Bình luận</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {HomestayEvaluateApproved && HomestayEvaluateApproved.map((evaluatesApproved) => {
                            return (
                                <tr key={evaluatesApproved?._id}>
                                    <td>{evaluatesApproved?.homestayname}</td>
                                    <td>{evaluatesApproved?.customername}</td>
                                    <td>{evaluatesApproved?.roomtype}</td>
                                    <td>{evaluatesApproved?.evaluatedate}</td>
                                    <td>{evaluatesApproved?.service}</td>
                                    <td>{evaluatesApproved?.point}</td>
                                    <td>{evaluatesApproved?.customers}</td>
                                    <td>{evaluatesApproved?.comment}</td>
                                    <td>
                                        <ModalDeleteEvaluate 
                                            homestayId={homestayId}
                                            evaluateApprovedId={evaluatesApproved?._id}
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* search */}
            <form
                onSubmit={handleSearchEvaluateApproved}
                className='search-form'
            >
                <input
                    type='search'
                    className='form-search-evaluate'
                    placeholder='Nhập tên homestay,người đánh giá,loại phòng,dịch vụ,đối tượng,...'
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                />
                <button type='submit' className='btn-search-evaluate'>
                    <SearchIcon className='icon-search' />
                    <p className='search-title'>Tìm kiếm</p>
                </button>
            </form>

            <div className="table-booking">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Tên homestay</th>
                            <th>Người đánh giá</th>
                            <th>Tên phòng</th>
                            <th>Ngày đánh giá</th>
                            <th>Dịch vụ</th>
                            <th>Điểm đánh giá</th>
                            <th>Đối tượng</th>
                            <th>Bình luận</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluatesApproveds.map((evaluatesApproved) => {
                            return (
                                <tr key={evaluatesApproved._id}>
                                    <td>{evaluatesApproved.homestayname}</td>
                                    <td>{evaluatesApproved.customername}</td>
                                    <td>{evaluatesApproved.roomtype}</td>
                                    <td>{evaluatesApproved.evaluatedate}</td>
                                    <td>{evaluatesApproved.service}</td>
                                    <td>{evaluatesApproved.point}</td>
                                    <td>{evaluatesApproved.customers}</td>
                                    <td>{evaluatesApproved.comment}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EvaluateAdmin