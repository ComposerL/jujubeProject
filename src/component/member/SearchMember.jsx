import React, { useEffect, useRef, useState, KeyboardEvent } from 'react';
import '../../css/member/search_member.css';
import $ from 'jquery';

const SearchMember = () => {

    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        console.log("searchMember useEffect()");
        $('#search_member_wrap input[name="search_member"]').focus();
        setSearchId('');
    },[]);

    const searchBtnClickHandler = () => {
        console.log("searchBtnClickHandler()");
        if(searchId !== ''){
            $('#search_member_wrap div.search_result_wrap').show();
            setSearchId('');
        }else{
            alert('Please input search member id');
            $('#search_member_wrap div.search_result_wrap').hide();
        }        
    }

    const handleKeyDown = (e = React.KeyboardEvent) => {
        // 키가 눌렸을 때 수행될 작업
        console.log('Key down:', e.key);
        if (e.key === 'Enter') {
            searchBtnClickHandler();
        }
    };
    
    return (
        <div id='search_member_wrap'>
            <h3>회원찾기</h3>
            <div className="logined_view_input_text_wrap">
                <input type="text" name='search_member' value={searchId} onKeyDown={handleKeyDown} onChange={(e)=>{ console.log("change"); setSearchId(e.target.value) }} placeholder='회원아이디를 입력하세요'/>
                <span tabIndex={0} className='search_btn'  >
                    <img src="/imgs/search_icon.png" />
                </span>
            </div>
            <div className='search_result_wrap'>
                <ul className='search_result'>
                    <li>
                        <div className='search_result_frofile_thum_wrap'>
                            <img src="" alt="" />
                        </div>
                        <div className='search_result_frofile_info_wrap'>
                            <p>gildong</p>
                            <p>hong gil dong</p>
                        </div>
                    </li>
                    <li>
                        <div className='search_result_frofile_thum_wrap'>
                            <img src="" alt="" />
                        </div>
                        <div className='search_result_frofile_info_wrap'>
                            <p>chanho</p>
                            <p>park chan ho</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SearchMember;