import React, { useEffect, useState} from 'react';
import '../../css/member/search_member.css';
import $ from 'jquery';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../util/cookie';

axios.defaults.withCredentials = true;

const SearchMember = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchId, setSearchId] = useState('');
    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        console.log("searchMember useEffect()");
        $('#search_member_wrap input[name="search_member"]').focus();
        setSearchId('');
    },[]);

    const searchBtnClickHandler = () => {
        console.log("searchBtnClickHandler()");
        if(searchId !== ''){
            $('#search_member_wrap div.search_result_wrap').show();
            axios_get_search_member();
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

    //비동기 통신
    const axios_get_search_member = () => {
        console.log('axios_get_search_member()');
        
        axios({
            url: `${process.env.REACT_APP_HOST}/member/get_search_member`, 
            method: 'GET',
            params: {
                search_member : searchId,
            },
            headers: {
                'authorization': sessionStorage.getItem('sessionID'),      
            },
        })
        .then(response => {
            console.log('AXIOS GET SEARCH MEMBER COMMUNICATION SUCCESS');
            console.log('data ---> ', response.data);
            
            if(response.data === -1){
                alert('session out!!');
                removeCookie('accessToken');
                dispatch({
                    type:'session_out',
                });
                navigate('/');
            }else{
                if (response.data !== null) {
                    console.log("회원 정보 조회 성공!!");
                    
                    setMemberList(response.data);
                } else {
                    alert('회원 정보 조회 실패!!');
                }
            }
            
        })
        .catch(error => {
            console.log('AXIOS GET SEARCH MEMBER COMMUNICATION ERROR');
            
        })
        .finally(() => {
            console.log('AXIOS GET SEARCH MEMBER COMMUNICATION COMPLETE');
            sessionStorage.removeItem('sessionID');//
            sessionStorage.setItem('sessionID',getCookie('accessToken'));//
        });
    
    }
    
    const testClickHandler = (member) => {/////////////////////////
        console.log('testClickHandler()');

        dispatch({
            type:'get_other_id',
            member:member,
        })
        navigate('/member/other_home');
    }

    return (
        <div id='search_member_wrap'>
            <h3>회원찾기</h3>
            <div className="logined_view_input_text_wrap">
                <input type="text" name='search_member' value={searchId} onKeyDown={handleKeyDown} onChange={(e)=>{ console.log("change"); setSearchId(e.target.value) }} placeholder='회원아이디를 입력하세요'/>
                <span tabIndex={0} className='search_btn' onClick={searchBtnClickHandler} >
                    <img src="/imgs/search_icon.png" />
                </span>
            </div>
            <div className='search_result_wrap'>
                <ul className='search_result'>
                    {   
                        memberList.map((member, index) => {
                            return (
                                <li key={index} onClick={() => testClickHandler(member)}>
                                    <div className='search_result_frofile_thum_wrap'>
                                        {
                                            member.M_PROFILE_THUMBNAIL !== null
                                            ?
                                            <img src={`${process.env.REACT_APP_HOST}/${member.M_ID}/${member.M_PROFILE_THUMBNAIL}`} />
                                            :
                                            <img src="/imgs/profile_default.png" />
                                        }
                                    </div>
                                    <div className='search_result_frofile_info_wrap'>
                                        <p>{member.M_ID}</p>
                                        <p>{member.M_NAME}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default SearchMember;