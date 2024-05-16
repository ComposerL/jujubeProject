import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/myHome.css';
import MyProfile from './myprofile';
import { getCookie, removeCookie } from '../../util/cookie';

axios.defaults.baseURL = process.env.REACT_APP_HOST;
axios.defaults.withCredentials = true;

const OtherHome = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const member = useSelector(store => store.member);
    const [storyFlag , setStoryFlag] = useState(false);

    useEffect(() => {

        axios_get_friend(member.M_ID);
        axios_get_other_profile(member.M_ID);
        axios_list_friend(member.M_ID)
            
    },[]);


    const axios_get_other_profile = () => {
        console.log('axios_get_other_profile()');
        axios({
            url: `${process.env.REACT_APP_HOST}/story/story/get_my_storys`,
            method: 'get',
            params: {
                'm_id': member.M_ID,
            },
            headers: {
                'authorization': sessionStorage.getItem('sessionID'),      
            },
        })
        .then(response => {
            console.log('AXIOS GET MY STORY COMMUNICATION SUCCESS');
            console.log(response.data);
            if (response.data === -1) {
                console.log("Home session out!!");
                sessionStorage.removeItem('sessionID');
                removeCookie('accessToken');
                dispatch({
                    type: 'session_out',
                });
                navigate('/');
            } else {
                if (response.data === null) {
                    console.log("undefined member");
                    sessionStorage.removeItem('sessionID');
                    sessionStorage.setItem('sessionID',getCookie('accessToken'));
                    dispatch({
                        type: 'session_out',
                    });
                    navigate('/');
                } else {
                    sessionStorage.removeItem('sessionID');
                    sessionStorage.setItem('sessionID',getCookie('accessToken'));
                    dispatch({
                        type: 'set_my_stories',
                        story: response.data,
                    });
                    
                }
            }
            
        })
        .catch(error => {
            console.log('AXIOS GET MY STORY COMMUNICATION ERROR', error);
        })
        .finally(() => {
            console.log('AXIOS GET MY STORY COMMUNICATION COMPLETE');
            sessionStorage.removeItem('sessionID');//
            sessionStorage.setItem('sessionID',getCookie('accessToken'));//
            removeCookie('accessToken');//
        });
    }

    const axios_list_friend = () => {
        console.log('axios_get_friend()');
        axios({
            url: `${process.env.REACT_APP_HOST}/member/get_friend_count`,
            method: 'get',
            params: {
                'm_id': member.M_ID
            },
            headers: {
                'authorization': sessionStorage.getItem('sessionID'),
            }
        })
        .then(response => {
                console.log('AXIOS GET MY FRIEND COMMUNICATION SUCCESS');
                console.log(response.data);
                if (response.data === -1) {
                    console.log("Home session out!!");
                    sessionStorage.removeItem('sessionID');
                    removeCookie('accessToken');
                    dispatch({
                        type: 'session_out',
                    });
                    navigate('/');
                } else {
                    if (response.data === null) {
                        console.log("undefined member");
                        
                        alert('친구목록을 불러오지 못했습니다. 다시 시도해주세요.');
                    } else {
                       
                        dispatch({
                            type: 'set_my_friend',
                            friend: response.data,
                        });
                        
                    }
                }
            
            })
            .catch(error => {
                console.log('AXIOS GET MY STORY COMMUNICATION ERROR', error);
            })
            .finally(() => {
                console.log('AXIOS GET MY STORY COMMUNICATION COMPLETE');
                sessionStorage.removeItem('sessionID');//
                sessionStorage.setItem('sessionID',getCookie('accessToken'));//
                removeCookie('accessToken');//
            });
        }

    const axios_get_friend = () => {
        console.log('axios_get_friend()');



        axios({
            url: `${process.env.REACT_APP_HOST}/member/get_friend_status`,
            method: 'post',
            data: {
                f_id: member.M_ID
            },
            headers: {
                'authorization': sessionStorage.getItem('sessionID'),      
            }, 
        })
        .then(response => {
                console.log('AXIOS GET MY friend COMMUNICATION SUCCESS');
                console.log(response.data);
                if (response.data === -1) {
                    console.log("Home session out!!");
                    sessionStorage.removeItem('sessionID');
                    dispatch({
                        type: 'session_out',
                    });
                    navigate('/');
                } else {
                    if (response.data === null) {
                        console.log("undefined member");
                        alert('친구상태를 불러오지 못했습니다. 다시 시도해주세요.');
                    } else {
                        dispatch({
                            type:'set_my_button',
                            button: response.data
                        })
                        
                    }
                }
            
            })
            .catch(error => {
                console.log('AXIOS GET MY STORY COMMUNICATION ERROR', error);
            })
            .finally(() => {
                console.log('AXIOS GET MY STORY COMMUNICATION COMPLETE');
                sessionStorage.removeItem('sessionID');//
                sessionStorage.setItem('sessionID',getCookie('accessToken'));//
                removeCookie('accessToken');//
            });
        }
    

    return (
        <div>
            <MyProfile setStoryFlag={setStoryFlag}/>
        </div>
        
    )
}

export default OtherHome;
