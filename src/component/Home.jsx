import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/home.css';

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
            <div>{process.env.REACT_APP_HOST}</div>
            <div>sessionID: {sessionID}</div>
            <div>loginedMember: {loginedMember}</div>
        </div>
    )
}

export default Home;