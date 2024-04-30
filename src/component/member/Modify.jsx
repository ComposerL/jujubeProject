import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

import '../../css/member/modify_form.css'

const Modify = () => {

    const [mId, setMId] = useState('');
    const [mPw, setMPw] = useState('');
    const [mName, setMName] = useState('');
    const [mMail, setMMail] = useState('');
    const [mPhone, setMPhone] = useState('');
    const [mSelfIntroduction, setMSelfIntroduction] = useState('');
    const [mProfileThumbnail, setMProfileThumbnail] = useState('');
    const [mGender, setGender] = useState('M');

    // const [curMId, setCurMId] = useState('');
    // const [curMPw, setCurMPw] = useState('');
    // const [curMName, setCurMName] = useState('');
    // const [curMMail, setCurMMail] = useState('');
    // const [curMPhone, setCurMPhone] = useState('');
    // const [curMSelfIntroduction, setCurMSelfIntroduction] = useState('');
    // const [curMProfileThumbnail, setCurMProfileThumbnail] = useState('');
    // const [curMgender, setCurMgender] = useState('M');

    //로그인이 되있는지 확인
    useEffect(() => {
        console.log('useEffect()');

        if ('cookie' === '') {
            'navigate'('/');
            
        } else {
            // axios_get_member('cookie'.getItem('cookie'));      
            
        }

    }, []);

    const modifyClickHandler = () => {
        console.log('modifyClickHandler()');

        let form = document.Modify_form;

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
            //  axios_member_modify();

        }
    }

    //리셋버튼
    // const modifyResetBtnClickHandler = () => {
    //     pringLog(DEFAULT_COMPONENT_NAME, 'modifyResetBtnClickHandler()')
        
    //     setMId(curMId);
    //     setMMail(curMMail);
    //     setMPhone(curMPhone);
    // }

    const axios_get_member = () => {
        console.log('axios_get_member()')

        axios({
            url: `${process.env.REACT_APP_HOST}/member/sign_in_confirm`, 
            method: 'get',
            params: {
                // 'cookie': cookie,
            }
        })
        .then(response => {
            console.log('AXIOS GET MEMBER COMMUNICATION SUCCESS', response.data);

            if (response.data === null) {
                // navigate('/');
                return;
            }

                // setMId(response.data.loginedMember.M_ID);
                // setMMail(response.data.loginedMember.M_MAIL);
                // setMPhone(response.data.loginedMember.M_PHONE);
                
                // setCurMId(response.data.loginedMember.M_ID);
                // setCurMMail(response.data.loginedMember.M_MAIL);
                // setCurMPhone(response.data.loginedMember.M_PHONE);
        })
        .catch(error => {
            console.log('ajax_get_member communication error');
        })
        .finally(data => {
            console.log('ajax_get_member communication complete');
        });
        
    }

    // const axios_member_modify = () => {
    //     pringLog(DEFAULT_COMPONENT_NAME, 'axios_member_modify');

    //     
    //     let m_profiles = $('input[name="m_profile"]');
    //     let files = m_profiles[0].files;

    //     let formData = new FormData();
    //     formData.append('sessionID', sessionStorage.getItem('sessionID'));
    //     formData.append("m_id", mId);
    //     formData.append("m_mail", mMail);
    //     formData.append("m_phone", mPhone);
    //     if(files.length !== undefined) formData.append("m_profile_img", files[0]);

    //     axios({
    //         url: 'http://localhost:3001/member/modify_confirm',
    //         method: 'put',
    //         data: formData,

    //     })
    //     .then(response => {
    //         pringLog(DEFAULT_COMPONENT_NAME, 'ajax_get_member communication success', response.data)   //null

    //         if (response.data === null) {
    //             alert('modify member modify process fail');
    //         } else {

    //             if (response.data.result > 0) {
    //                 alert('modify member modify process success');
    //                 navigate('/');
    //             } else {
    //                 alert('modify member modify process fail');

    //             }
    //         }
    //     })
    //     .catch(error => {
    //         pringLog(DEFAULT_COMPONENT_NAME, 'ajax_get_member communication error')
    //     })
    //     .finally(data => {
    //         pringLog(DEFAULT_COMPONENT_NAME, 'ajax_get_member communication complete')
    //     })

    // }

    return (
        <div id='modify_container'>
            <h3>정보수정</h3>
            <div className='modify_box'>
                <form>
                    <input type="text" name="m_id" value={mId} placeholder="사용자 아이디" readOnly disabled/><br />
                    <input type="password" name="m_pw" value={mPw} placeholder="비밀번호" readOnly disabled/><br />
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
                    <input className="upload-name" value={mProfileThumbnail} placeholder="첨부파일"/>
                    <label htmlFor="file">파일찾기</label>
                    <input type="file" id="file" name="m_profile_thumbnail" value={mProfileThumbnail} onChange={(e) => setMProfileThumbnail(e.target.value)}/>
                    {/* <img id="preview" src="#" alt="" style={{ maxWidth: '50%', maxHeight: '50px' }} /> */}

                    </div>
                    <input type="button" value="수정하기" onClick={modifyClickHandler}/><br />
                </form>
            </div>
        </div>
    );
}

export default Modify;