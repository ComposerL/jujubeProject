import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios'; 

import '../../css/member/sign_in_form.css';
import '../../css/common.css'

const SignIn = () => {
    
    //hook
    const [mId, setMId] = useState('');
    const [mPw, setMPw] = useState('');

    const signInClickHandler = () => {

        console.log("signInClickHandler()");

        let form = document.sign_in_form;

        if (mId === '') {
            alert('아이디를 입력해주세요');
            form.m_id.focus();
        
        } else if (mPw === '') {
            alert('비밀번호를 입력해주세요');
            form.m_pw.focus();

        } else {

            axios_member_login();
        }
    }

    //google 로그인 시작
    const handleGoogleLoginSuccess = (credentialResponse) => {
        // 토큰 jwt로 decoded
        const token = credentialResponse?.credential; // 로그인 성공 시 받은 토큰
        const decoded = jwtDecode(token); // 받은 토큰을 디코딩하여 사용자 정보 추출
        console.log(decoded); // 디코딩된 정보 콘솔에 출력
        
        ajax_google_sign_in(token);
        
    };

    const handleGoogleLoginError = () => {
        console.log('Login Failed');
    };

    const ajax_google_sign_in = (token) => {
        $.ajax({
            url: `${process.env.REACT_APP_HOST}/member/sign_in_confirm`,
            type: 'post',
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

    const axios_member_login = () => {
        console.log('axios_member_login()');

        axios({
            url: `${process.env.REACT_APP_HOST}/member/sign_in_confirm`,
            method: 'get',
            params: {
                'm_id': mId,
                'm_pw': mPw,
            }
            
        })
        .then(response => {
            console.log('AXIOS MEMBER_LOGIN COMMUNICATION SUCCESS');
            console.log('data ---> ', response.data);

            if (response.data !== null) {
                alert('MEMBER LOGIN PROCESS SUCCESS!!');
                
               

            } else {
                alert('MEMBER LOGIN PROCESS FAIL!!');
               

            }

        })
        .catch(error => {
            console.log('AXIOS MEMBER_LOGIN COMMUNICATION ERROR', error);
            
        })
        .finally(data => {
            console.log('AXIOS MEMBER_LOGIN COMMUNICATION COMPLETE',);

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
                        <div className="or_line">또는</div>
                        <div className="google_login_box">
                            <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                            />
                        </div>
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