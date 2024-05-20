import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import axios from 'axios';
import { getCookie, removeCookie } from '../../util/cookie';

const FollowRequestListSection2 = (props) => {

    const [idx, setIdx] = useState('');
    const [friendRes,setFriendRes] = useState({});
    const [responseIlchonName,setResponseIlchonName] = useState('');

    useEffect(() => {
        console.log('[FollowRequestListSection2] useEffect()');
        setIdx(props.idx);
        setFriendRes(props.friendRes);
    },[]);

    //handler
    const followRequestAcceptBtnClickHandler = (e) => {
        console.log("followRequestAcceptBtnClickHandler()");
        let btn = e.target;
        $(btn).parent('div').parent('div').siblings('.follow_request_list_section2_accept_form').css({'display':'block'});
    }

    const followRequestAcceptConfirmBtnClickHandler = (e) => {
        console.log("followRequestAcceptConfirmBtnClickHandler()");
        
        setResponseIlchonName('');
        axios_friend_request_confirm();
    }

    //비동기통신
    const axios_friend_request_confirm = () => {
        console.log("axios_friend_request_confirm()");

        let requestData = {
            'f_id': friendRes.FR_REQ_ID,
            'f_request_ilchon_name': friendRes.FR_ILCHON_NAME,
            'f_response_ilchon_name': responseIlchonName
        }

        axios({
			url: `${process.env.REACT_APP_HOST}/member/friend_request_confirm`,
			method: 'post',
            data: requestData,
            headers: {
                'authorization': sessionStorage.getItem('sessionID'),
            }
		})
		.then(response => {	
			console.log("axios get friend request confirm success!!");
            if(response.data !== null){
                console.log("response: ",response.data);

            }else{
                console.log("axios get friend request confirm response data is null!");
            }
		})
		.catch(err => {
            console.log("axios get friend request confirm error!!");
            console.log("err: ",err);
		})
		.finally(data => {
            console.log("axios get friend request confirm finally!!");
            sessionStorage.removeItem('sessionID');//
            sessionStorage.setItem('sessionID',getCookie('accessToken'));//
            removeCookie('accessToken');//
		});

    }

    return (
        <li key={idx}>
            <div className='follow_request_list_section2_article_item_wrap'>
                <div className="follow_request_list_section2_article_item">
                    <div className="follow_request_list_section2_article_item_profile">
                        <img src={`${process.env.REACT_APP_HOST}/${friendRes.FR_REQ_ID}/${friendRes.M_PROFILE_THUMBNAIL}`} alt="" />
                    </div>
                    <div className='follow_request_list_section2_article_item_info'>
                        <p>{friendRes.FR_REQ_ID}</p>
                        <p>{friendRes.FR_ILCHON_NAME}</p>                                                        
                    </div>
                </div>
                <div className="follow_request_list_section2_btn_area">
                    <div className="follow_btn" onClick={(e) => followRequestAcceptBtnClickHandler(e)}>
                        수락
                    </div>                                                 
                    <div className="un_follow_btn">
                        거절
                    </div>
                </div>
            </div>
            <div className='follow_request_list_section2_accept_form'>
                <p>
                    내 일촌명: 
                    <span>
                        <input type="text" name="f_response_ilchon_name" value={responseIlchonName} onChange={(e) => {setResponseIlchonName(e.target.value)}}/>
                    </span>
                    <button onClick={(e) => followRequestAcceptConfirmBtnClickHandler(e)}>전송</button>
                </p>
            </div>
        </li>
    )
}

export default FollowRequestListSection2