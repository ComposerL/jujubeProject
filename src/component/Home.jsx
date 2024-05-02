import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

    const dispatch = useDispatch();
    const sessionID = useSelector(store => store.sessionID);
    const loginedMember = useSelector(store => store.loginedMember);

    useEffect(() => {
        console.log("Home useEffect()");
        
        if(sessionID === null){
            dispatch({
                type: 'session_out',
                loginedMember: '',
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