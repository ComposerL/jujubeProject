import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { axios_get_member } from '../util/sessionCheck';

const Home = () => {

    const dispatch = useDispatch();
    const sessionID = useSelector(store => store.sessionID);
    const loginedMember = useSelector(store => store.loginedMember);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Home useEffect()");
        let result = axios_get_member();
        if(result === null){
            sessionStorage.removeItem('sessionID');
            dispatch({
                type:'session_out',
                sessionID: null,
                loginedMember: '',
            });
            navigate('/');
        }else{
            dispatch({
                type:'session_enter',
                loginedMember: result,
            });
        }
    },[]);

    

    return (
        <div id='home_wrap'>
            <div>{process.env.REACT_APP_HOST}</div>
            <div>sessionID: {sessionID}</div>
            <div>loginedMember: {loginedMember}</div>
        </div>
    )
}

export default Home;