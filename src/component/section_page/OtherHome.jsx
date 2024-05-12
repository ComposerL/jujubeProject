import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/myHome.css';
import { jwtDecode } from 'jwt-decode';
import MyProfile from './myprofile';

axios.defaults.baseURL = process.env.REACT_APP_HOST;
axios.defaults.withCredentials = true;

const OtherHome = () => {
    
    const loginedMember = useSelector(store => store.loginedMember);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("otherHome useEffect()");
        
        axios_get_search_member();
            let token = sessionStorage.getItem('sessionID');
            console.log('token----', jwtDecode(token)) ;
    },[]);

    const axios_get_search_member = () => {
        console.log('axios_get_search_member()');
        
        axios({
            url: `${process.env.REACT_APP_HOST}/member/get_search_member`, 
            method: 'GET',
            params: {
                //  'm_id': m_id,
            }
        })
        .then(response => {
            console.log('AXIOS GET SEARCH MEMBER COMMUNICATION SUCCESS');
            console.log('data ---> ', response.data);
            
            if(response.data === -1){
                alert('session out!!');
                dispatch({
                    type:'session_out',
                });
                navigate('/');
            }else{
                if (response.data === null) {
                    alert('회원 정보 조회 실패!!');
                    
                } else {
                    console.log("회원 정보 조회 성공!!");
                    dispatch({
                        type:'set_my_info',
                        info: response.data
                    })
                    axios_get_other_profile(response.data.member.M_ID);
                    axios_get_friend(response.data.member.M_ID);
                }
            }
            
        })
        .catch(error => {
            console.log('AXIOS GET SEARCH MEMBER COMMUNICATION ERROR');
            
        })
        .finally(() => {
            console.log('AXIOS GET SEARCH MEMBER COMMUNICATION COMPLETE');

        });
    
    }
    
    const axios_get_other_profile = (m_id) => {
        console.log('axios_get_other_profile()');
        axios({
            url: `${process.env.REACT_APP_HOST}/story/story/get_my_storys`,
            method: 'get',
            params: {
                'm_id': m_id,
            } 
        })
        .then(response => {
            console.log('AXIOS GET MY STORY COMMUNICATION SUCCESS');
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
                    sessionStorage.removeItem('sessionID');
                    dispatch({
                        type: 'session_out',
                    });
                    navigate('/');
                } else {
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
        });
    }

    const axios_get_friend = (m_id) => {
        console.log('axios_get_friend()');
        axios({
            url: `${process.env.REACT_APP_HOST}/member/get_friend_list`,
            method: 'get',
            params: {
                'm_id': m_id
            } 
        })
        .then(response => {
                console.log('AXIOS GET MY STORY COMMUNICATION SUCCESS');
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
                        sessionStorage.removeItem('sessionID');
                        dispatch({
                            type: 'session_out',
                        });
                        navigate('/');
                    } else {

                        if (response.data === loginedMember) {
                            dispatch({
                                type:'set_my_friend',
                                button: -2,
                            }) 
                        } else {
                            dispatch({
                                type:'set_my_friend',
                                button: -1,
                            })
                        }
                        
                    }
                }
            
            })
            .catch(error => {
                console.log('AXIOS GET MY STORY COMMUNICATION ERROR', error);
            })
            .finally(() => {
                console.log('AXIOS GET MY STORY COMMUNICATION COMPLETE');
            });
        }
    

    return (
        <div>
            <MyProfile />
        </div>
        
    )
}

export default OtherHome;
