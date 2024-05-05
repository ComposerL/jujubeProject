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
    const [testAllStorys,setTestAllStorys] = useState([]);

    let testInitStory = [
        {   
            m_id:'gildong',
            m_name:'홍길동',
            m_profile_thumbnail:'https://picsum.photos/100/100', 
            s_pictures: [
                'https://picsum.photos/500/500',
                'https://picsum.photos/400/400',
                'https://picsum.photos/600/600',
                'https://picsum.photos/700/700'
            ],
            s_text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
            s_like_count: 12000,
            s_reply_count: 1200,
            s_replys:[
                {
                    r_id:'gildong',
                    r_text:'바보바보바보'
                },
                {
                    r_id:'chanho',
                    r_text:'멍청이멍청이'
                },
                {
                    r_id:'kang',
                    r_text:'후카후카'
                },
            ],
            s_mod_date:'5월 3일',
        },
        {   
            m_id:'chanho',
            m_name:'박찬호',
            m_profile_thumbnail:'https://picsum.photos/50/50', 
            s_pictures: [
                'https://picsum.photos/500/500',
                'https://picsum.photos/400/400',
                'https://picsum.photos/600/600',
                'https://picsum.photos/700/700'
            ],
            s_text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
            s_like_count: 1318,
            s_reply_count: 127,
            s_replys:[
                {
                    r_id:'hooka1',
                    r_text:'후카짱'
                },
                {
                    r_id:'hooka2',
                    r_text:'후카주세요'
                },
            ],
            s_mod_date:'5월 3일',
        },
        {   
            m_id:'rkdtmdgh3',
            m_name:'강승호',
            m_profile_thumbnail:'https://picsum.photos/210/210', 
            s_pictures: [
                'https://picsum.photos/500/500',
                'https://picsum.photos/400/400',
                'https://picsum.photos/600/600',
                'https://picsum.photos/700/700'
            ],
            s_text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
            s_like_count: 8045,
            s_reply_count: 842,
            s_replys:[
                {
                    r_id:'lsy',
                    r_text:'순대국고?'
                },
                {
                    r_id:'lsy2',
                    r_text:'라면학교고?'
                },
            ],
            s_mod_date:'5월 3일',
        },
    ]

    useEffect(() => {
        console.log("Home useEffect()");
        axios_get_member();
        setAllStorys(testInitStory);
    },[]);

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
                        loginedMember: respones.data.member.M_ID,
                    });
                    // axios_get_all_storys(respones.data.member.M_ID);
                    
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
            setTestAllStorys(response.data);
            console.log("testAllStorys: ",testAllStorys);
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
                    allStorys.map((story,idx) => {
                        return (
                            <StoryUi 
                                m_id = {story.m_id}
                                m_name = {story.m_name}
                                m_profile_thumbnail = {story.m_profile_thumbnail}
                                s_pictures = {story.s_pictures}
                                s_text = {story.s_text} 
                                s_like_count = {story.s_like_count}
                                s_reply_count = {story.s_reply_count}
                                s_replys = {story.s_replys}
                                s_mod_date = {story.s_mod_date}
                                storyIdx = {idx}
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