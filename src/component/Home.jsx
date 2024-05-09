import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/home.css';

import '../css/story/story.css';
import StoryUi from './story/StoryUi';
import StoryReplyUI from './story/StoryReplyUI';

const Home = () => {

    const dispatch = useDispatch();
    const sessionID = useSelector(store => store.sessionID);
    const loginedMember = useSelector(store => store.loginedMember);
    const modal = useSelector(store => store.modal);

    const [allStorys,setAllStorys] = useState([]);

    

    useEffect(() => {
        console.log("Home useEffect()");
        axios_get_member();
    },[modal]);

    //비동기 통신
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
                        loginedMember: respones.data.member,
                    });
                    axios_get_all_storys(respones.data.member.M_ID);
                    
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
    
    //axios get all storys
    const axios_get_all_storys = (m_id) => {
        console.log("axios_get_all_storys()");
        axios({
			url: `${process.env.REACT_APP_HOST}/story/story/get_all_storys`,
			method: 'get',
			params:{
				"m_id" : m_id,
			}
		})
		.then(response => {	
			console.log("axios get all storys success!!");
			console.log("data: ",response.data);
            setAllStorys(response.data);
            
		})
		.catch(err => {
            console.log("axios get all storys error!!");
            console.log("err: ",err);
		})
		.finally(data => {
            console.log("axios get all storys finally!!");
		});	
    }

    //hadler
    const replyModalCloseBtnClickHandler = () => {
        console.log('replyModalCloseBtnClickHandler()');
        dispatch({
            type:'reply_modal_close',
            modal: false,
        });
    }

    return (
        <>  
        <div id='home_wrap'>
            <ul id='story_wrap'>
                {   

                    allStorys.map((allStory,idx) => {
                        return (
                            <StoryUi
                                s_no = {allStory.S_NO} 
                                m_id = {allStory.memberInfors[0].M_ID}
                                m_name = {allStory.memberInfors[0].M_NAME}
                                m_profile_thumbnail = {allStory.memberInfors[0].M_PROFILE_THUMBNAIL}
                                pictures = {allStory.pictures}
                                s_txt = {allStory.S_TXT}
                                storyLikeCnt = {allStory.storyLikeCnt}
                                storyIsLike = {allStory.storyIsLike}
                                replysCnt = {allStory.replysCnt}
                                s_mod_date = {allStory.S_MOD_DATE}
                                storyIdx = {idx}
                                memberInfors = {allStory.memberInfors[0]}
                            />
                        )
                    })
                }
            </ul>
            
        </div>
        <div id={modal ? "reply_show_modal" : "reply_hide_modal"} >
            <div className='reply_modal_close_btn' onClick={replyModalCloseBtnClickHandler}>
                <div></div>
                <div></div>
            </div>
            <StoryReplyUI/>
        </div>
        </>
    )
}

export default Home;