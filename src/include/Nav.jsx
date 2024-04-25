import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';
import NavLi from '../component/main_nav/NavLi';

const Nav = () => {

    return (
        <nav id='nav_wrap'>
            <ul className='nav_menu'>
                <NavLi command="/" img_src="/imgs/home_icon.png" text="HOME"/>
                <NavLi command="/member/search_member_form" img_src="/imgs/create_icon_line.png" text="SEARCH"/>
                <NavLi command="/" img_src="/imgs/message_icon_line.png" text="MESSAGE"/>
                <NavLi command="/" img_src="/imgs/create_icon_line.png" text="CREATE"/>
                <NavLi command="/member/my_home" img_src="/imgs/my_icon_line.png" text="PROFILE"/>
            </ul>
            <div className="nav_detail_menu">
                
            </div>
        </nav>
    )
}

export default Nav;