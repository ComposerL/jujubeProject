import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';


import '../../css/member/sign_in_form.css';


const SignIn = ({setIslogin, setMemberId}) => {

    //hook
    const [mId, setMId] = useState('');
    const [mPw, setMPw] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signInClickHandler = (sessionID) => {

        console.log("signInClickHandler()");

        let form = document.sign_in_form;

        if (mId === '') {
            alert('아이디를 입력해주세요');
            form.m_id.focus();
        
        } else if (mPw === '') {
            alert('비밀번호를 입력해주세요');
            form.m_pw.focus();

        } else {

             
            ajax_sign_in();
        }
    }

    //google 로그인 시작
    const handleGoogleLoginSuccess = (credentialResponse) => {
        // 토큰 jwt로 decoded
        const token = credentialResponse?.credential; // 로그인 성공 시 받은 토큰
        const decoded = jwtDecode(token); // 받은 토큰을 디코딩하여 사용자 정보 추출
        console.log(decoded); // 디코딩된 정보 콘솔에 출력
        
        ajax_google_sign_in(token);
     
        navigate('/home');
    };

    const handleGoogleLoginError = () => {
        console.log('Login Failed');
    };

    const ajax_google_sign_in = (token) => {
        $.ajax({
            url: `${process.env.REACT_APP_HOST}/member/sign_in_confirm`,
            type: 'POST',
            data: JSON.stringify({ idToken: token }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(data) {
                alert('google signIn process success');
                console.log('Authentication successful!', data);
            },
            error: function(status, error) {
                alert('google signIn process fail!!');
                console.log('Authentication failed', status, error);
            },
            complete: function(data) {
                console.log('ajax member_join communication copmlete()');
            
                console.log('token: ', token);
            }
        });
        
    }

    const ajax_sign_in = () => {
        console.log('ajax_sign_in()');

        let formData = new FormData();
        formData.append("m_id", mId);
        formData.append("m_pw", mPw);
        
        $.ajax({
            url: `${process.env.REACT_APP_HOST}/member/sign_in_confirm`,
            type: 'post',
            processData: false,
            contentType: false,
            dataType: 'json',
            xhrFields: { 
                withCredentials: true
            },
            data: formData,
            success: function(data) {

                console.log('ajax member_join communication success()');

                //data ==> null,1
                if (data > 0 && data !== null) {
                    alert('member signIn process success!!');
                    sessionStorage.setItem('sessoionID', data.sessionID);
                    setIslogin(true);
                    setMemberId(data.mId);   
                    navigate('/home');

                } else {
                    alert('member signIn process fail!!');
                    setIslogin(false);
                    setMId(''); setMPw('');
                }

            }, 
            error: function(data) {
                console.log('ajax member_join communication error()');

            },
            complete: function(data) {
                console.log('ajax member_join communication copmlete()');
            
            }
        });
    }

    return (
        <div id="sign_in_container">            
            <div className="sign_in_box">
                <div className="logo_image">
                </div>
                    <form>
                        <input type="text" name="m_id" value={mId} placeholder="아이디" onChange={(e) => setMId(e.target.value)}/><br />
                        <input type="password" name="m_pw" value={mPw} placeholder="비밀번호" onChange={(e) => setMPw(e.target.value)}/><br />
                        <input type="button" value="로그인" onClick={signInClickHandler}/><br />
                        <div className="line">또는</div>
                        <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        />
                        <p><a href="#none">비밀번호 찾기</a></p>
                    </form>
                </div>
            <div className="sign_up_box">
                <div className="sign_up_btn">
                    <p><Link to="/member/sign_up_form">가입하기</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;