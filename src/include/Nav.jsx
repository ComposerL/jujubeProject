import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {

    // redex setting
    const dispatch = useDispatch();
    const state_isLogin = useSelector((state) => state.isLogin);

    return (
        <nav id='nav_wrap'>
            <Link to="/">HOME</Link>
        
            &nbsp;&nbsp;
            {
            state_isLogin
            ?
            <>
            <Link to="/member/modify_form">MODIFY</Link>&nbsp;&nbsp;
            <Link >DELETE</Link>&nbsp;&nbsp;
            <Link >LOGOUT</Link>&nbsp;&nbsp;
            </>
            :
            <>
            <Link to="/member/sing_up_form">JOIN</Link>&nbsp;
            <Link to="/member/sign_in_form">LOGIN</Link>&nbsp;
            </>
            }
        </nav>
    )
}

export default Nav;