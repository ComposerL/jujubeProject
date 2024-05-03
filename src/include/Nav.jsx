import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/nav.css';
import NavLi from '../component/main_nav/NavLi';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Nav = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //hook

    //handler
    const navModalMouseEnterHandler = () => {      
        $('#nav_wrap div.nav_detail_menu div.nav_detail_modal_wrap').show();      
    }
    const navModalMouseLeaveHandler = () => {      
        $('#nav_wrap div.nav_detail_menu div.nav_detail_modal_wrap').hide();      
    }

    const signOutBtnClickHandler = () => {
        console.log("signOutBtnClickHandler()");
        axios_sign_out_confirm();
        sessionStorage.removeItem('sessionID');
        dispatch({
            type:'session_out',
            sessionID: null,
            loginedMember: '',
        });
        navigate('/');
    }

    const axios_sign_out_confirm = () => {
        console.log('axios_sign_out_confirm()');
        
        axios({
            url: `${process.env.REACT_APP_HOST}/member/sign_out_confirm`, 
            method: 'GET',
        })
        .then(response => {
            console.log('AXIOS SIGN OUT COMMUNICATION SUCCESS');

        })
        .catch(error => {
            console.log('AXIOS SIGN OUT COMMUNICATION ERROR');
            
        })
        .finally(() => {
            console.log('AXIOS SIGN OUT COMMUNICATION COMPLETE');

        });
    }
    
    return (
        <div id='nav_wrap'>
            <div id="nav_symbol_wrap">
                <img src="/imgs/symbol_1.png" alt="" />
            </div>
            <ul className='nav_menu'>
                <NavLi command="/" img_src="/imgs/nav_home_icon.png" text="HOME"/>
                <NavLi command="/member/search_member_form" img_src="/imgs/nav_search_icon.png" text="SEARCH"/>
                <NavLi command="/member/message" img_src="/imgs/nav_messege_icon.png" text="MESSAGE"/>
                <NavLi command="/story/create_story" img_src="/imgs/nav_create_icon.png" text="CREATE"/>
                <NavLi command="/member/my_home" img_src="/imgs/nav_my_icon.png" text="PROFILE"/>
            </ul>
            <div className="nav_detail_menu" onMouseEnter={navModalMouseEnterHandler} onMouseLeave={navModalMouseLeaveHandler}>
                <div className="nav_detail_img_wrap">
                    <img src="/imgs/nav_detail_icon.png" alt="" />
                </div>
                <div className='nav_detail_text_wrap' >
                    더 보기
                </div>
                <div className='nav_detail_modal_wrap'>
                    <div className='nav_detail_list_wrap'>
                        <ul className='nav_detail_list'>
                            <li><Link to="/member/modify_form">정보수정</Link></li>
                            <li onClick={signOutBtnClickHandler}><a href="">로그아웃</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;