import React from 'react';
import '../../css/member/search_member.css';

const SearchMember = () => {
    return (
        <div id='search_member_wrap'>
            <h3>회원찾기</h3>
            <div className="logined_view_input_text_wrap">
                <input type="text" name='search_member' placeholder='회원아이디를 입력하세요'/>
                <span className='search_btn'>
                    <img src="/imgs/search_icon.png" alt="" />
                </span>
            </div>
        </div>
    )
}

export default SearchMember;