import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';
import NavLi from '../component/main_nav/NavLi';
import $ from 'jquery';


const Nav = () => {
    
    //hook

    //handler
    const navModalMouseEnterHandler = () => {      
        $('#nav_wrap div.nav_detail_menu div.nav_detail_modal_wrap').show();      
    }
    const navModalMouseLeaveHandler = () => {      
        $('#nav_wrap div.nav_detail_menu div.nav_detail_modal_wrap').hide();      
    }

    return (
        <div id='nav_wrap'>
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
                            <li><Link to="/">로그아웃</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;