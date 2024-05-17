import React, { useEffect, useState } from 'react'
import '../../css/member/follow_request_list.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getCookie, removeCookie } from '../../util/cookie';
import { session_check } from '../../util/session_check';

const FollowRequestList = () => {

    const dispatch = useDispatch();

    const [friendRequestList, setFriendRequestList] = useState([]);
    const [friendResponseList, setFriendResponseList] = useState([]);

    useEffect(() => {
        console.log("[FollowRequestList] useEffect()");

        let session = session_check();
        if(session !== null){
            // console.log('[FollowList] session_check enter!!');
            axios_get_friend_request_list();
        }else{
            // console.log('[FollowList] session_check expired!!');
            sessionStorage.removeItem('sessionID');
            dispatch({
                type:'session_out',
            });
        }

    },[]);

    const axios_get_friend_request_list = () => {
        console.log("[FollowRequestList] axios_get_friend_request()");

        axios({
			url: `${process.env.REACT_APP_HOST}/member/get_friend_request_list`,
			method: 'get',
            headers: {
                'authorization': sessionStorage.getItem('sessionID'),
            }
		})
		.then(response => {	
			console.log("axios get friend request list success!!");
			console.log("response: ",response.data);
            if(response.data !== null){
                setFriendRequestList(response.data.friend_request_list);
                setFriendResponseList(response.data.friend_response_list);
                //friend_request_list 보낸요청
                //friend_response_list 받은요청
            }else{
                console.log("axios get friend request list response data is null!");
            }
		})
		.catch(err => {
            console.log("axios get friend request list error!!");
            console.log("err: ",err);
		})
		.finally(data => {
            console.log("axios get friend request list finally!!");
            sessionStorage.removeItem('sessionID');//
            sessionStorage.setItem('sessionID',getCookie('accessToken'));//
            removeCookie('accessToken');//
		});

    }

    return (
        <>
            <div id='follow_request_list_wrap'>
                <div className="follow_request_header">
                    ILCHON REQUEST LIST
                </div>
                <div className='follow_request_list_section_wrap'>
                    <div className='follow_request_list_section1'>
                        <div className="follow_request_list_section1_header">
                            보낸요청
                        </div>
                        <div id="follow_request_list_section1_article">
                            <ul>
                                {
                                    friendRequestList.map((friendReq,idx) => {
                                        return (                                            
                                            <li key={idx}>
                                                <div id="follow_request_list_section1_article_item">
                                                    <div className="follow_request_list_section1_article_item_profile">
                                                        <img src="" alt="" />
                                                    </div>
                                                    <div className='follow_request_list_section1_article_item_info'>
                                                        <p>{friendReq.FR_RES_ID}</p>
                                                        <p>{friendReq.FR_ILCHON_NAME}</p>
                                                    </div>                           
                                                </div>
                                                <div id="follow_request_list_section1_btn_area">
                                                                                                   
                                                    <div className="un_follow_btn">
                                                        취소
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>                     
                    </div>
                    <div className='follow_request_list_section_line'></div>
                    <div className='follow_request_list_section2'>
                        <div className="follow_request_list_section2_header">
                            받은요청
                        </div>
                        <div id="follow_request_list_section2_article">
                            <ul>
                            {
                                friendResponseList.map((friendRes,idx) => {
                                    return (
                                        <>
                                        <li key={idx}>
                                            <div id="follow_request_list_section2_article_item">
                                                <div className="follow_request_list_section2_article_item_profile">
                                                    <img src="" alt="" />
                                                </div>
                                                <div className='follow_request_list_section2_article_item_info'>
                                                    <p>{friendRes.FR_REQ_ID}</p>
                                                    <p>{friendRes.FR_ILCHON_NAME}</p>
                                                </div>
                                            </div>
                                            <div id="follow_request_list_section2_btn_area">
                                                <div className="follow_btn">
                                                    수락
                                                </div>                                                 
                                                <div className="un_follow_btn">
                                                    거절
                                                </div>
                                            </div>
                                        </li>
                                        <div id='follow_request_list_section2_accept_form'>
                                            <p>
                                                내 일촌명: 
                                                <span>
                                                    <input type="text" />
                                                </span>
                                                <button>전송</button>
                                            </p>
                                        </div>
                                        </>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowRequestList;