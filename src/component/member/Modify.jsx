import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import $, { data } from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import '../../css/member/modify_form.css'


axios.defaults.withCredentials = true

const Modify = () => {
    
    const navigate = useNavigate();
    const sessionID = useSelector(store => store.sessionID);
    const dispatch = useDispatch();

    const [mId, setMId] = useState('');
    const [mName, setMName] = useState('');
    const [mMail, setMMail] = useState('');
    const [mPhone, setMPhone] = useState('');
    const [mSelfIntroduction, setMSelfIntroduction] = useState('');
    const [mProfileThumbnail, setMProfileThumbnail] = useState('');
    const [mGender, setGender] = useState('M');
    
    useEffect(() => {
        console.log('modify useEffect()');

        if (sessionID === '') {
            dispatch({
                type: 'session_out',
                sessionID: '',
            })
            navigate('/');
        } else {
            modify_get_member(sessionID);
        }

    }, []);

    

    const getUploadClickHandler = () => {
        $('.filebox input[name="m_profile_thumbnail"]').click();
    }

    const ProfileThumbnailChagneHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {

            // 파일의 데이터 URL 가져오기
            const previewUrl = event.target.result;

            // 이미지를 보여줄 img 요소를 선택하여 소스를 설정
            document.getElementById('preview').src = previewUrl;
        };

        setMProfileThumbnail(e.target.value);
        // 파일을 읽어옴
        reader.readAsDataURL(file);
    }

    const modifyClickHandler = () => {
        console.log('modifyClickHandler()');

        let form = document.modify_form;

        if (mName === '') {
            alert('새로운 이름을 입력하세요');
            form.m_name.focus();

        } else if (mMail === '') {
            alert('새로운 메일을 입력하세요');
            form.m_mail.focus();

        } else if (mPhone === '') {
            alert('새로운 핸드폰 번호를 입력하세요');
            form.m_phone.focus();

        } else  {
            axios_member_modify();

        }
    }   

    const modify_get_member = () => {
        console.log('modify_get_member()')

        axios({
            url: `${process.env.REACT_APP_HOST}/member/get_member`, 
            method: 'get',
            params: {
                member : sessionID
            }
        })
        .then(response => {
            console.log('AXIOS GET MEMBER COMMUNICATION SUCCESS', response.data);

            if (response.data === null) {
                dispatch({
                    type: 'session_out',
                    sessionID: '',
                })
                return;
            }

            const memberData = response.data.member;
            
            setMId(memberData.M_ID);
            setMMail(memberData.M_MAIL);
            setMName(memberData.M_NAME);
            setMPhone(memberData.M_PHONE);
            setGender(memberData.M_GENDER);
            setMSelfIntroduction(memberData.M_SELF_INTRODUCTION);
            // setMProfileThumbnail(memberData.M_PROFILE_THUMBNAIL);
        })
        .catch(error => {
            console.log('ajax_get_member communication error');

        })
        .finally(data => {
            console.log('ajax_get_member communication complete');
        });
        
    }

    const axios_member_modify = () => {
        console.log('axios_member_modify');
    
        let m_profiles = $('input[name="m_profile_thumbnail"]');
        
        let files = m_profiles[0].files;

        let formData = new FormData();

        formData.append("m_id", mId);
        formData.append("m_name", mName);
        formData.append("m_mail", mMail);
        formData.append("m_phone", mPhone);
        formData.append("m_self_introduction", mSelfIntroduction);
        formData.append("m_profile_thumbnail", files[0]);
        formData.append("m_gender", mGender);

        console.log('formData=======>', ...formData);

        axios({
            url: `${process.env.REACT_APP_HOST}/member/modify_confirm`, 
            method: 'post',
            data: formData,
            
        })
        .then(response => {
            console.log('axios_member_modify communication success', response.data);
    
            if (response.data === null) {
                alert('modify member modify process fail');
            } else {
                if (response.data.result > 0) {
                    alert('modify member modify process success');
                    dispatch({
                        type: 'sign_in_success',
                        sessionID: response.data.sessionID,
                    });
                    navigate('/');
                } else {
                    alert('modify member modify process fail...');
                }
            }
        })
        .catch(error => {
            console.log('axios_member_modify communication error', error);
            alert('modify member modify process fail');
        })
        .finally((data) => {
            console.log('axios_member_modify communication complete', data);
            
        });
    }
    

    return (
        <div id='modify_container'>
            <div className='modify_box'>
                <form name='modify_form'>
                    <h3>정보수정</h3>
                    <img id="preview" src="/imgs/profile_default.png" alt="" onClick={getUploadClickHandler}/>
                    <input type="text" name="m_id" value={mId} placeholder="사용자 아이디" readOnly disabled/><br />
                    {/* <input type="password" name="m_pw" value={mPw} placeholder="비밀번호" readOnly disabled/><br /> */}
                    <input type="text" name="m_name" value={mName} placeholder="이름" onChange={(e) => setMName(e.target.value)}/><br />
                    <input type="email" name="m_mail" value={mMail} placeholder="이메일" onChange={(e) => setMMail(e.target.value)}/><br />
                    <input type="text" name="m_phone" value={mPhone} placeholder="전화번호" onChange={(e) => setMPhone(e.target.value)}/><br />
                    <textarea name="m_self_introduction" placeholder="자기소개" value={mSelfIntroduction} onChange={(e) => setMSelfIntroduction(e.target.value)}></textarea>
                    
                    <div className="select_gender">
                        성별선택: &nbsp;
                        <div className="select_m"><input type="radio" name="m_gender" value="M" checked={mGender === 'M'} onChange={(e) =>setGender(e.target.value)}/> 남자</div>                    
                        <div className="select_f"><input type="radio" name="m_gender" value="F" checked={mGender === 'F'} onChange={(e) =>setGender(e.target.value)}/> 여자</div>  
                    </div>
                    
                    <div className="filebox">
                        <input className="upload-name" placeholder="첨부파일"/>
                        <label htmlFor="file">파일찾기</label>
                        <input type="file" id="file" name="m_profile_thumbnail" value={mProfileThumbnail} onChange={ProfileThumbnailChagneHandler}/>
                    </div>
                    <input type="button" value="수정하기" onClick={modifyClickHandler}/><br />
                </form>
            </div>
        </div>
    );
}

export default Modify;