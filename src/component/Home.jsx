import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Home = () => {

    const dispatch = useDispatch();
    const sessionID = useSelector(store => store.sessionID);

    useEffect(() => {
        console.log("Home useEffect()");
        
        if(sessionID === ''){
            dispatch({
                type: 'session_out',
                sessionID: '',
            });
        }

    },[]);

    return (
        <div id='home_wrap'>
            <div>{process.env.REACT_APP_HOST}</div>
            <div>sessionID: {sessionID}</div>
        </div>
    )
}

export default Home;