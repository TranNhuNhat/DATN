import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import './Rules.css';
import Mastercard from '../../../../../../assets/Image/the-mastercard.png';
import JCB from '../../../../../../assets/Image/JCB.png';
import American from '../../../../../../assets/Image/American_express.jpg';
import Union from '../../../../../../assets/Image/unionpay.png';
import Visa from '../../../../../../assets/Image/visa.jpg';

const Rules = () => {
    return (
        <div>
            <h2>Quy tắc chung</h2>
            <div className='rule'>
                <div className='check-in'>
                    <div className='check-in-1'>
                        
                        <p className='rule-p'>Nhận phòng</p>
                    </div>
                    <div className='check-in-2'>
                        <div className='check-in-span'>
                            <span>Từ 14:00</span>
                            <span>Khách được yêu cầu xuất trình giấy tờ tùy thân có ảnh và thẻ tín dụng lúc nhận phòng</span>

                            <span>Trước đó bạn sẽ cần cho chỗ nghỉ biết giờ bạn sẽ đến nơi.</span>
                        </div>
                    </div>
                </div>
                <div className='check-out'>
                    <div className='check-out-1'>
                      
                        <p className='rule-p'>Trả phòng</p>
                    </div>
                    <div className='check-out-2'>      
                            <span>Đến 12:00</span>
                    </div>
                </div>
                <div className='cancle'>
                    <div className='cancle-1'>
                       
                        <p className='rule-p'>Hủy đặt phòng/Trả trước</p>
                    </div>
                    <div className='cancle-2'>
                        <span>Các chính sách hủy và thanh toán trước có khác biệt dựa trên loại chỗ nghỉ. Vui lòng kiểm tra các điều kiện có thể được áp dụng cho mỗi lựa chọn của bạn.</span>
                    </div>
                </div>
                <div className='payment'>
                    <div className='payment-1'>
                       
                        <p className='rule-p'>Các phương thức thanh toán được chấp nhận</p>
                    </div>
                    <div className='payment-2'>
                        <img src={Mastercard} alt='' className='img-payment'/>
                        <img src={Visa} alt='' className='img-payment'/>
                        <img src={JCB} alt='' className='img-payment'/>
                        <img src={American} alt='' className='img-payment'/>
                        <img src={Union} alt='' className='img-payment'/>
                        <span className='currency'>Tiền mặt</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rules