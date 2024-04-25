import React from 'react';
import { Link } from 'react-router-dom';


import '../../css/member/sign_in_form.css';

const SignIn = () => {
    return (
       
            <div id="login_container">            
                <div className="login_box">
                    <div className="logo_image">
                    </div>
                        <form action="member/sign_in_confirm" method="post">
                            <input type="text" name="m_id" placeholder="사용자 아이디"/><br />
                            <input type="password" name="m_pw" placeholder="비밀번호"/><br />
                            <input type="button" value="로그인"/><br />
                            <div className="line">또는</div>
                            <p><a href="#none">google으로 로그인</a><br /></p>
                            <p><a href="#none">비밀번호 찾기</a></p>
                        </form>
                    </div>
                <div className="signup_box">
                    <div className="sign_up_btn">
                        <p><Link to="/member/sing_up_form">가입하기</Link></p>
                    </div>
                </div>
            </div>
        
        
    );
}

export default SignIn;