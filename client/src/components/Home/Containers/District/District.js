import React from 'react';
import './District.css';
import imgFlag from '../../../../assets/Image/VietNam.jpg';

const District = () => {
    return (
        <div>
            <h2>Quận</h2>
            <div className='top'>
                <div className='district-1'>
                    <p className='title'>Hoàn Kiếm</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>

                <div className='district-2'>
                    <p className='title'>Ba Đình</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>
            </div>

            <div className='top-1'>
                <div className='district-3'>
                    <p className='title'>Tây Hồ</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>
                <div className='district-4'>
                    <p className='title'>Đống Đa</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>
            </div>

            <div className='top-2'>
                <div className='district-5'>
                    <p className='title'>Thanh Xuân</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>
                <div className='district-6'>
                    <p className='title'>Hà Đông</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>
            </div>

            <div className='top-3'>
                <div className='district-7'>
                    <p className='title'>Hai Bà Trưng</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>
                <div className='district-8'>
                    <p className='title'>Cầu Giấy</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>
            </div>

            <div className='top-4'>
                <div className='district-9'>
                    <p className='title'>Long Biên</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>
                <div className='district-10'>
                    <p className='title'>Hoàng Mai</p>
                    <img src={imgFlag} alt='' className='flag' />
                </div>
            </div>


        </div>
    )
}

export default District