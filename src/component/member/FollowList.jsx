import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/member/follow_list.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getCookie, removeCookie } from '../../util/cookie';
import { session_check } from '../../util/session_check';

const FollowList = () => {

    const dispatch = useDispatch();

    const [followMembers,setFollowMembers] = useState([]);

    useEffect(() => {
        // console.log("[FollowList] useEffect()");

        let session = session_check();
        if(session !== null){
            // console.log('[FollowList] session_check enter!!');
            axios_get_friend_list();
        }else{
            // console.log('[FollowList] session_check expired!!');
            sessionStorage.removeItem('sessionID');
            dispatch({
                type:'session_out',
            });
        }

    },[]);

    const axios_get_friend_list = () => {
        // console.log("[FollowList] axios_get_friend_list()");

		axios({
			url: `${process.env.REACT_APP_HOST}/member/get_friend_list`,
			method: 'get',
            headers: {
                'authorization': sessionStorage.getItem('sessionID'),
            }
		})
		.then(response => {	
			console.log("axios get friend list success!!");
			console.log("response: ",response.data);
            if(response.data !== null){
                setFollowMembers(response.data.friend_list);
            }else{
                console.log("axios get friend list response data is null!");
            }
		})
		.catch(err => {
            console.log("axios get friend list error!!");
            console.log("err: ",err);
		})
		.finally(data => {
            // console.log("axios get friend list finally!!");
            sessionStorage.removeItem('sessionID');//
            sessionStorage.setItem('sessionID',getCookie('accessToken'));//
            removeCookie('accessToken');//
		});

    }

    return (
        <>
            <div id='follow_list_wrap'>
                <div className="follow_header">
                    ILCHON LIST
                </div>
                <div className='follow_list_section_wrap'>
                    <Link to="/member/follow_request_list">
                        <div className='follow_request_list_btn'>
                            요청보기
                        </div>
                    </Link>
                    <ul id="Follow_list">
                        {
                            followMembers.map((followMember,idx) => {
                                return(
                                    <li key={idx}>
                                        <div className='Follow_list_info_btn_wrap'>
                                            <div className='Follow_list_result_frofile_thum_wrap'>
                                                {
                                                    followMember.memberInfo[0].M_PROFILE_THUMBNAIL !== null
                                                    ?                                                    
                                                    <img src={`${process.env.REACT_APP_HOST}/${followMember.F_ID}/${followMember.memberInfo[0].M_PROFILE_THUMBNAIL}`} />
                                                    :                         
                                                    <img src="/imgs/profile_default.png" />
                                                }
                                            </div>
                                            <div className='Follow_list_result_frofile_info_wrap'>
                                                <p>{followMember.F_ID}</p>
                                                <p>{followMember.F_ILCHON_NAME}</p>
                                            </div>
                                        </div>
                                        <div className="Follow_list_result_btn_area">                                        
                                            <div className="un_follow_btn">
                                                <img src='/imgs/follow_btn_icon_r.png'/>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default FollowList;