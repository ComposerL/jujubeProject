import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../css/myHome.css';
import MyProfile from './myprofile';

axios.defaults.baseURL = process.env.REACT_APP_HOST;
axios.defaults.withCredentials = true;

const MyHome = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginedMember = useSelector(store => store.loginedMember);
    const user = useSelector(store => store.user);
        

    console.log('user MyHome:');

    useEffect(() => {
        console.log("MyHome useEffect()");
        
            axios_get_member();
        
    },[]);

    const axios_get_member = () => {
        console.log("axios_get_member()");
        
        axios.get(`${process.env.REACT_APP_HOST}/member/get_member`, {
            method:'get',
            params: {
                
            }
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
                navigate('/');
            }else{
                
                if(respones.data === null){
                    console.log("undefined member");
                    console.log("Home session out!!");
                    sessionStorage.removeItem('sessionID');
                    dispatch({
                        type:'session_out',
                    });
                    navigate('/');
                }else{                    
                    console.log("member_id: " + respones.data.member.M_ID);

                        dispatch({
                            type:'set_my_user',
                            user:respones.data.member.M_ID,
                            info: {
                                M_ID: respones.data.member.M_ID,
                                M_SELF_INTRODUCTION: respones.data.member.M_SELF_INTRODUCTION,
                                M_PROFILE_THUMBNAIL: respones.data.member.M_PROFILE_THUMBNAIL,
                            },
                        });

                        dispatch({
                            type:'session_enter',
                            loginedMember: respones.data.member.M_ID,
                        });
                        
                    axios_get_profile(respones.data.member.M_ID);
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
    
    const axios_get_profile = (m_id) => {
        console.log('axios_get_profile()');
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
                    const ownID = response.data.map(item => item.S_OWNER_ID);
                    const firstOwner = ownID[0];
                    console.log('firstOwner: ', firstOwner); 
                    if (firstOwner === loginedMember) {
                        dispatch({
                            type: 'set_my_stories',
                            button: true,
                            story: response.data,
                        });
                    } else {
                        dispatch({
                            type: 'set_other_stories',
                            button: false,
                            story: response.data,
                        });
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

export default MyHome;
