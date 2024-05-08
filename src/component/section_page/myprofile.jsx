import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useSelector } from 'react-redux';


const MyProfile = () => {

    const story = useSelector(store => store.story);
    const member = useSelector(store => store.member);
    const button = useSelector(store => store.button);

    return (
        <div id='my_profile_wrap'>
            <div className='profile_member_name'>
                <p>{}</p>
            </div>
            <div className='profile_header'>
            <img src="" alt="" />

                <div className='post'>
                    <div>{story && story.length > 0 ? story.length : 0}</div>
                    <div>post</div>
                </div>
                <div className='followers'>
                    <div>{0}</div>
                    <div>friend</div>
                </div>
                
            </div>
            <div className='profile_self_intro'>
                <p>{member ? member.member.M_SELF_INTRODUCTION : '자기소개가 없습니다.'}</p>
            </div>
            <div className='profile_follow_btn'>
                {button ? <input type="button" value='프로필 수정' /> : <input type="button" value='팔로우' />}
            </div>
            <div className='profile_img'>
                <div>게시물</div>
                story.length === 0 ? {}
                <div className='profile_item'>
                    {story.map((story, idx) => (
                    <div key={idx}>
                        S_NO: {story.S_NO}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
