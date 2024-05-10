import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/myHome.css';

const MyProfile = () => {

    const dispatch = useDispatch();
    const story = useSelector(store => store.story);
    const button = useSelector(store => store.button);
    const user = useSelector(store => store.user);
    const info = useSelector(store => store.info);
    const friend = useSelector(store => store.friend);

    useEffect(() => {

        console.log('useEffect()');
        // const dummyData = {
        //     user: 'gildong',
        //     info: {
        //         M_ID: 'gildong',
        //         M_SELF_INTRODUCTION: '나는 홍길동이다.',
        //         M_PROFILE_THUMBNAIL: 'profile_thumbnail.jpg', 
        //     },
        //     friend: [
        //         {
        //             F_OWNER_ID:'hihi',
        //         },
        //         {
        //             F_OWNER_ID:'chanho',
        //         },
        //         {
        //             F_OWNER_ID:'seari',
        //         }
        //     ],
        //     story: [
        //         {
        //             SP_OWNER_NO: 1,
        //             SP_PICTURE_NAME: 'picture1.jpg', 
        //         },
        //         {
        //             SP_OWNER_NO: 2,
        //             picSP_PICTURE_NAMEture: 'picture2.jpg',
        //         },
        //         {
        //             SP_OWNER_NO: 3,
        //             SP_PICTURE_NAME: 'picture3.jpg',
        //         },
        //     ],
        //         button: true, 
        //     };

        //     dispatch({
        //         type:'test',
        //         user:dummyData.user,
        //         info:dummyData.info,
        //         story:dummyData.story,
        //         button:dummyData.button,
        //         friend:dummyData.friend,
        //     });
        },[]);
        
        if (!user || !info || !story.length) {
            return <div>Loading...</div>;
        }

    console.log('user: ', user);                    
    console.log('info: ', info);
    console.log('story: ', story);
    console.log('button: ', button);
    console.log('friend: ', friend);
        
    //버튼 분기
    const btn = () => {

        switch(button) {
            case 0:
                return null; 
            case -1:
                return <input type="button" value="친구 추가" onClick={(e) => addFriendClickHandler(e)} />;
            case -2:
                return <input type="button" value="이미 친구임" />;
            default:
                return null; 
        }
    }

    const addFriendClickHandler = () => {
        console.log('addFriendClickHandler()');


    }

    return (
        <div id='my_profile_wrap'>

            <div className='profile_header'> 
            {
                info.M_PROFILE_THUMBNAIL !== null
                ?
                <img src={`${process.env.REACT_APP_HOST}/${info.M_ID}/${info.M_PROFILE_THUMBNAIL}`} />
                :
                <img src="/imgs/profile_default.png" />
            }

                <div className='post'>
                    <div>{story.length > 0 ? story.length : 0}</div>
                    <div>post</div>
                </div>
                <div className='friend'>
                    <div>{friend.friend_count > 0 ? friend.friend_count : 0}</div>
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
            
                {btn()}
            
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
