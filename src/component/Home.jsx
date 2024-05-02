import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/story/story.css';

const Home = () => {

    const dispatch = useDispatch();
    const sessionID = useSelector(store => store.sessionID);
    const loginedMember = useSelector(store => store.loginedMember);

    useEffect(() => {
        console.log("Home useEffect()");
        axios_get_member();
    },[]);

    const axios_get_member = () => {
        console.log("axios_get_member()");
        axios.get(`${process.env.REACT_APP_HOST}/member/get_member`, {
            
        })
       .then(respones => {
            console.log('AXIOS GET MEMBER COMMUNICATION SUCCESS');
            console.log(respones.data);
            if(respones.data === -1){
                console.log("Home session out!!");
                sessionStorage.removeItem('sessionID');
                dispatch({
                    type:'session_out',
                });
            }else{
    
                if(respones.data === null){
                    console.log("undefined member");
                    sessionStorage.removeItem('sessionID');
                    dispatch({
                        type:'session_out',
                    });
                }else{
                    console.log("member_id: " + respones.data.member.M_ID);
                    dispatch({
                        type:'session_enter',
                        loginedMember: respones.data.member.M_ID,
                    });
                }
    
            }
       })
       .catch(error => {
            console.log('AXIOS GET MEMBER COMMUNICATION ERROR');
        
        })
        .finally(() => {
            console.log('AXIOS GET MEMBER COMMUNICATION COMPLETE');
             
        });
    }

    

    return (
        <div id='home_wrap'>
            <ul id='story_wrap'>
                <li>
                    <div className='story_header'>
                        <div className='story_header_img'>
                            <img src="/imgs/profile_default.png" alt="" />
                        </div>
                        <div className='story_header_member_info_wrap'>
                            <h4>gildong</h4>
                            <p>홍길동</p>
                        </div>
                        <div className='story_header_menu_btn'>
                            <a href="#none">&#183; &#183; &#183;</a>
                        </div>
                    </div>
                    <div className='story_pictures_wrap'>
                        <img src="https://picsum.photos/400/400" alt="" />
                    </div>
                    <div className='story_contents_Wrap'>
                        <div className='story_content_icon_wrap'>
                            <a href="#none">
                                <img src="/imgs/story_like_r_icon.png" alt="" />
                            </a>
                            <a href="#none">
                                <img src="/imgs/story_reply_icon.png" alt="" />
                            </a>
                            <a href="#none">
                                <img src="/imgs/story_messege_icon.png" alt="" />
                            </a>
                        </div>
                        <div className="like_count_wrap">
                            <p>좋아요<span>12,000</span>개</p>
                        </div>
                        <div className='story_contents_text_wrap'>
                            <p>
                                <span className='s_id'>gildong</span>
                                <span className='s_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                            </p>
                        </div>
                    </div>                    
                </li>
            </ul>
        </div>
    )
}

export default Home;