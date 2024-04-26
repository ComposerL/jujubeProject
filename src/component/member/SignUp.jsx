import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

import '../../css/member/sign_up_form.css';
import '../../css/common.css'


const SignUp = () => {


    const [mId, setMId] = useState('');
    const [mPw, setMPw] = useState('');
    const [mName, setMName] = useState('');
    const [mMail, setMMail] = useState('');
    const [mPhone, setMPhone] = useState('');
    const [mSelfIntroduction, setMSelfIntroduction] = useState('');
    const [mProfileThumbnail, setMProfileThumbnail] = useState('');
    const [mGender, setGender] = useState('M');

    const navigate = useNavigate();

    const genderChangeHandler = (e) => {
        console.log('genderChangeHandler()');

        setGender(e.target.value);
    
    }
    
    const signUpClickHandler = () => {
        console.log('signUpClickHandler()');

        let form = document.sign_up_form;

        if (mId === '') {
            alert('input new id');
            form.m_id.focus();
        } else if (mPw === '') {
            alert('input new pw');
            form.m_pw.focus();
        } else if (mName === '') {
            alert('input new name');
            form.m_name.focus();
        } else if (mMail === '') {
            alert('input new mail');
            form.m_pw.focus();
        } else if (mPhone === '') {
            alert('input new phone');
            form.m_pw.focus();
        } else if (mSelfIntroduction > 200) {
            alert('최대 200자 까지입니다');
            form.value = form.value.substring(0,200);  
            form.m_pw.focus();
        } else {

            ajax_member_sign_up();

        }
    }

    const ajax_member_sign_up = () => {
        console.log('ajax_member_sign_up()');

        let formData = new FormData();
        formData.append("m_id", mId);
        formData.append("m_pw", mPw);
        formData.append("m_name", mName);
        formData.append("m_mail", mMail);
        formData.append("m_phone", mPhone);
        formData.append("m_self_introduction", mSelfIntroduction);
        formData.append("m_profile_thumbnail", mProfileThumbnail);
        formData.append("m_gender", mGender);

        $.ajax({
            url: `${process.env.REACT_APP_HOST}/member/sign_up_confirm`,
            method: 'post',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            dataType: 'json',
            xhrFields: { 
                withCredentials: true   
            },
            data: formData,
            success: function(data) {

                console.log('ajax member_join communication success()');

                console.log('data===>', data);

                //data ==> null,1
                if (data > 0 && data !== null) {
                    alert('member join process success!!');
                    navigate('/member/sign_in_form');
                    
                } else {
                    alert('member join process fail!!');
                    setMId(''); setMPw(''); setMMail(''); setMPhone(''); setMName(''); setMSelfIntroduction(''); setMProfileThumbnail(''); 
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
        <div id="sign_up_container">            
            <div className="sign_up_box">
                <div className="logo_image">
                </div>
                    <form action="member/sign_up_confirm" method="post" name="sign_up_form" encType="multipart/form-data">
                        <input type="text" name="m_id" value={mId} placeholder="사용자 아이디" onChange={(e) => setMId(e.target.value)}/><br />
                        <input type="password" name="m_pw" value={mPw} placeholder="비밀번호" onChange={(e)=> setMPw(e.target.value)}/><br />
                        <input type="text" name="m_name" value={mName} placeholder="이름" onChange={(e) => setMName(e.target.value)}/><br />
                        <input type="email" name="m_mail" value={mMail} placeholder="이메일" onChange={(e) => setMMail(e.target.value)}/><br />
                        <input type="text" name="m_phone" value={mPhone} placeholder="전화번호" onChange={(e) => setMPhone(e.target.value)}/><br />
                        <textarea name="m_self_introduction" placeholder="자기소개" value={mSelfIntroduction} onChange={(e) => setMSelfIntroduction(e.target.value)}></textarea>
                        <div className="select_gender">
                            <div className="select_m"><input type="radio" name="m_gender" value="M" checked={mGender === 'M'} onChange={genderChangeHandler}/> 남자</div>                    
                            <div className="select_f"><input type="radio" name="m_gender" value="F" checked={mGender === 'F'} onChange={genderChangeHandler}/> 여자</div>  
                        </div>
                        <input type="file" name="m_profile_thumbnail" value={mProfileThumbnail} onChange={(e) => setMProfileThumbnail(e.target.value)}/>
                        <input type="button" value="회원가입" onClick={signUpClickHandler}/><br />
                        <div className="line">또는</div>
                        <p><a href="#none">google으로 로그인</a><br /></p>
                        <p><a href="#none">비밀번호 찾기</a></p>
                    </form>
                </div>
            <div className="sign_in_box">
                <div className="sign_up_btn">
                    <p><Link to="/member/sign_in_form">로그인 하기</Link></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;