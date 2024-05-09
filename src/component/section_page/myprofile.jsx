import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const MyProfile = () => {

    const dispatch = useDispatch();
    const story = useSelector(store => store.story);
    const button = useSelector(store => store.button);
    const user = useSelector(store => store.user);
    const info = useSelector(store => store.info);

    useEffect(() => {
        
        const dummyData = {
            user: 'gildong',
            info: {
                M_ID: 'gildong',
                M_SELF_INTRODUCTION: '나는 홍길동이다.',
                M_PROFILE_THUMBNAIL: 'profile_thumbnail.jpg', 
            },
            story: [
                {
                    id: 1,
                    picture: 'picture1.jpg', 
                },
                {
                    id: 2,
                    picture: 'picture2.jpg',
                },
                {
                    id: 3,
                    picture: 'picture3.jpg',
                },
            ],
                button: true, 
            };

            dispatch({
                type:'set_my_stories',
                user:dummyData.user,
                info:dummyData.info,
                story:dummyData.story,
                button:dummyData.button,
            });
        },[]);
        
        if (!user || !info || !story.length) {
            return <div>Loading...</div>;
        }

    console.log('user: ', user);
    console.log('info: ', info);
    console.log('story: ', story);
    console.log('button: ', button);

    return (
        <div id='my_profile_wrap'>
            SDFGSAG
            <div className='profile_header'> 
             {
                info.M_PROFILE_THUMBNAIL === null
                ?
                <img src={`${process.env.REACT_APP_HOST}/${info.M_ID}/${info.M_PROFILE_THUMBNAIL}`} />
                :
                <img src="/imgs/profile_default.png" />
            }

                <div className='post'>
                    <div>{story && story.length > 0 ? story.length : 0}</div>
                    <div>post</div>
                </div>
                <div className='friend'>
                    <div>{0}</div>
                    <div>friend</div>
                </div>
                
            </div>
            <div className='profile_member_name'>
                <p>{user}</p>
            </div>
            <div className='profile_self_intro'>
                <p>{info.M_SELF_INTRODUCTION ? info.M_SELF_INTRODUCTION : '자기소개가 없습니다.'}</p>
            </div>
            <div className='profile_follow_btn'>
            {!button && <input type="button" value='친구추가' />}
            {button === false && <input type="button" value='이미 친구임' />}
            </div>
            <div className='profile_img'>
                <div>게시물</div>
                {story.length === 0 ? '내용이 없습니다.' : <div className='profile_item'>
                    {story.map((story, idx) => (
                    <div key={idx}>
                    <img src={story.picture} alt="" />    
                    </div>
                    ))}
                </div> }
                
            </div>
        </div>
    );
};

export default MyProfile;
