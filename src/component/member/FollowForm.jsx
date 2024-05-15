import React from 'react';
import '../../css/member/follow_form.css';

const FollowForm = () => {
    return (
        <>
            <div id='follow_form_wrap'>
                <div className='follow_form_section_wrap'>
                    <div className="follow_form_section1_header">
                    </div>
                    <div className='follow_form_section2_contents'>
                        <div className='follow_form_section2_profile_wrap'>
                            <img src="" alt="" />
                        </div>
                        <div className='follow_form_section2_text'>
                            <p className='section2_follow_my_id'>홍길동님께</p>
                            <p>일촌을 신청합니다.</p>
                        </div>
                    </div>
                    <div className="follow_form_section3_input">                        
                        <span className='section3_follow_my_id'>박찬호</span>
                        님을 &nbsp; 
                        <span className='section3_follow_to_id'>홍길동</span>
                        님의 &nbsp;
                        <input type="text" name = 'f_ilchon_name' placeholder='내 일촌명 입력' />로
                    </div>
                    <div className='follow_form_section4_subTxt'>상대방이 동의하시면 일촌이 맺어집니다.</div>
                    <div className='follow_form_section5_btn'>
                        <input type="button" value="보내기"/>
                        <input type="button" value="취소"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowForm;