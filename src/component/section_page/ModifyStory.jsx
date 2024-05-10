import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ModifyStory = () => {

    const dispatch = useDispatch();

    const [sTxt, setSTxt] = useState('');
    const [sIsPublic, setSIsPublic] = useState('0');

    useEffect(() => {
    console.log('ModifyStory useEffect() called');
        axios_get_member();

    }, [])

    const axios_get_story = () => {
        console.log('ModifyStory axios_get_story() called');

        axios.get(`${process.env.REACT_APP_HOST}/story/story/get_story`, {
            
        })

    }

    const axios_get_member = () => {
        console.log("axios_get_member()");
        axios.get(`${process.env.REACT_APP_HOST}/member/get_member`, {
            
        })
        .then(respones => {
            console.log('AXIOS GET MEMBER COMMUNICATION SUCCESS');
            console.log(respones.data);
            if(respones.data === -1){
                console.log("Home session out!!");
                sessionStorage.removeItem('sessionID');
                dispatch({
                    type:'session_out',
                });
            }else{
    
                if(respones.data === null){
                    console.log("undefined member");
                    sessionStorage.removeItem('sessionID');
                    dispatch({
                        type:'session_out',
                    });
                }else{
                    console.log("member_id: " + respones.data.member.M_ID);
                    dispatch({
                        type:'session_enter',
                        loginedMember: respones.data.member.M_ID,
                    });
                    
                }
    
            }
        })
        .catch(error => {
            console.log('AXIOS GET MEMBER COMMUNICATION ERROR');
        })
    }

    return (
        <div id='modify_story_wrap'>

            <div className='story_img_wrap'>

                

            </div>

            {/* <div className="select_is_public">
                <div className='public_p'>
                    <span>공개여부 &nbsp; </span>
                </div>
                <div className="select_public">
                    <label>
                        <input type="radio" name="s_is_public" value="0" checked={isPublic === '0'} onChange={(e) =>setIsPublic(e.target.value)}/> 
                        <span> 전체공개 </span>
                    </label>
                </div>
                <div className="select_friend_public">
                    <label>
                        <input type="radio" name="s_is_public" value="1" checked={isPublic === '1'} onChange={(e) =>setIsPublic(e.target.value)}/> 
                        <span> 일촌공개 </span>
                    </label>
                </div>
                <div className="select_private">
                    <label>
                        <input type="radio" name="s_is_public" value="-1" checked={isPublic === '-1'} onChange={(e) =>setIsPublic(e.target.value)}/> 
                        <span> 비공개 </span>
                    </label>
                </div>
            </div> */}

            <div className='modify_s_txt_wrap'>
                <div className='modify_s_txt'>
                    <textarea name="s_txt" value={sTxt} id="s_txt" cols="50" rows="8" onChange={(e) => setSTxt(e.target.value)} placeholder='스토리 내용 작성' />
                </div>
            </div>

        </div>
    );
};

export default ModifyStory;