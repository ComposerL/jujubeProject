import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import '../../css/myHome.css';
import MyProfile from './myprofile';

axios.defaults.withCredentials = true;

const MyHome = () => {
    
    //hook
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const otherUserId = useSelector(store => store.otherUser);

    useEffect(() => {
        console.log("MyHome useEffect()");
        if(otherUserId) {
            
            axios_get_profile(otherUserId);

        } else {

            axios_get_member();

        }
    }, [otherUserId]);

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
                        type:'session_enter',
                        loginedMember: respones.data.member.M_ID,
                        member:respones.data,
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
                    console.log('member: ', response.data);
                    if (m_id === "") {
                        dispatch({
                            type: 'set_my_stories',
                            story: response.data,
                            button: true,
                        });
                    } else {
                       
                        dispatch({
                            type: 'set_other_user_stories',
                            otherUserId: m_id,
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
            
                {otherUserId ? (
                    <otherUserProfile />
                ) : (
                    <MyProfile />
                )}
          
        </div>
        
    )
}

export default MyHome;