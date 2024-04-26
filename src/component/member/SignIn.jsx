import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

import '../../css/member/sign_in_form.css';



const SignIn = ({setIslogin, setMemberId}) => {

    //hook
    const [mId, setMId] = useState('');
    const [mPw, setMPw] = useState('');
    
    const navigate = useNavigate();

    const signInClickHandler = () => {
        console.log("signInClickHandler()");

        let form = document.sign_in_form;

        if (mId === '') {
            alert('아이디를 입력해주세요');
            form.m_id.focus();
        
        } else if (mPw === '') {
            alert('아이디를 입력해주세요');
            form.m_pw.focus();
        } else {

            ajax_sign_in();
        }
    }

    const ajax_sign_in = () => {
        console.log('ajax_sign_in()');

        let formData = new FormData();
        formData.append("m_id", mId);
        formData.append("m_pw", mPw);

        $.ajax({
            url: `${process.env.REACT_APP_HOST}/member/sign_in_confirm`,
            method: 'post',
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
                    <form action="member/sign_in_confirm" method="post" name="sign_in_form">
                        <input type="text" name="m_id" value={mId} placeholder="아이디" onChange={(e) => setMId(e.target.value)}/><br />
                        <input type="password" name="m_pw" value={mPw} placeholder="비밀번호" onChange={(e) => setMPw(e.target.value)}/><br />
                        <input type="button" value="로그인" onClick={signInClickHandler}/><br />
                        <div className="line">또는</div>
                        <p><a href="#none">google으로 로그인</a></p><br />
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