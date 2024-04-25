import React, { useState } from "react";
import { Link } from 'react-router-dom';


import '../../css/member/sign_up_form.css';


const SignUp = () => {


    const [mId, setMId] = useState('');
    const [mPw, setMPw] = useState('');
    const [mMail, setMMail] = useState('');
    const [mPhone, setMPhone] = useState('');


    // const genderChangeHandler = (e) => {
    //     props.
    // }

    



    return (
        <div id="sign_up_container">            
            <div className="sign_up_box">
                <div className="logo_image">
                </div>
                    <form action="member/sign_up_confirm" method="post" name="sign_up_form">
                        <input type="text" name="m_id" value={mId} placeholder="사용자 아이디"/><br />
                        <input type="password" name="m_pw" value={mPw} placeholder="비밀번호"/><br />
                        <input type="email" name="m_mail" value={mMail} placeholder="이메일"/><br />
                        <input type="text" name="m_phone" value={mPhone} placeholder="전화번호"/><br />
                        <div className="select_gender">
                            <input type="radio" name="m_gender" /> 남자                    
                            <input type="radio" name="m_gender" /> 여자  
                        </div>
                        <input type="button" value="로그인"/><br />
                        <div className="line">또는</div>
                        <p><a href="#none">google으로 로그인</a><br /></p>
                        <p><a href="#none">비밀번호 찾기</a></p>
                    </form>
                </div>
            <div className="sign_in_box">
                <div className="sign_up_btn">
                    <p><Link to="/member/sing_in_form">로그인 하기</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;