import React, { useEffect, useState } from 'react';
import { getCookie } from '../util/cookie';
import { useDispatch } from 'react-redux';


const Home = () => {

    const dispatch = useDispatch();
    const [cookie, setCookie] = useState();

    useEffect(() => {
        console.log("Home useEffect()");

        setCookie(getCookie(""));//서버에서 넘어오는 쿠키 키값 입력
        
        if(cookie === ''){
            dispatch({
                type: 'session_out',
                cookie: '',
            });
        }

    },[]);

    return (
        <div id='home_wrap'>
            {process.env.REACT_APP_HOST}
            
        </div>
    )
}

export default Home;