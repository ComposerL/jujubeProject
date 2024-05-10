import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StoryUi from '../story/StoryUi';
import StoryReplyUI from '../story/StoryReplyUI';

const MyProfile = () => {

    const dispatch = useDispatch();
    const loginedMember = useSelector(store => store.loginedMember);
    const story = useSelector(store => store.story);
    const button = useSelector(store => store.button);
    const friend = useSelector(store => store.friend);
    const modal = useSelector(store => store.modal);

    const [mId, setMId] = useState('');
    const [mSelfIntroduction, setMSelfIntroduction] = useState('');
    const [mProfileThumbnail, setMProfileThumbnail] = useState('');
    
    const [mystory, setMystory] = useState([]);

    useEffect(() => {
       
        if (loginedMember) {
            setMId(loginedMember.M_ID);
            setMSelfIntroduction(loginedMember.M_SELF_INTRODUCTION);
            setMProfileThumbnail(loginedMember.M_PROFILE_THUMBNAIL);
        }

    },[loginedMember]);
        
        if (!loginedMember) {
            return <div>Loading...</div>;
        }   
        
        console.log('story: ', story);


    //버튼 분기
    const btn = () => {

        switch(button) {
            case 0:
                return null; 
            case -1:
                return <input type="button" value="친구 추가" onClick={addFriendClickHandler} />;
            case -2:
                return <input type="button" value="친구 삭제" onClick={deleteFriendClickHandler} />;
            default:
                return null; 
        }
    }

    const addFriendClickHandler = () => {
        console.log('addFriendClickHandler()');

        
    }

    const deleteFriendClickHandler = () => {
        console.log('deleteFriendClickHandler()');

        const isDeleteFriend = window.confirm("정말로 친구 삭제하시겠습니까?");

        if (isDeleteFriend) {
            axios_delete_friend();
            dispatch({
                type:'set_my_friend',
                button: -1,
            });
        }
    }

    const openStoryClickHandler = (story) => {
        console.log('addFriendClickHandler()', story);

        setMystory([story]);

    }


    const replyModalCloseBtnClickHandler = () => {
        console.log('replyModalCloseBtnClickHandler()');
        dispatch({
            type:'reply_modal_close',
            modal: false,
        });
    }

    const axios_delete_friend = () => {
       
    }

    return (
        <div id='my_profile_wrap'>

            <div className='profile_header'> 
            {
                mProfileThumbnail !== null
                ?
                <img src={`${process.env.REACT_APP_HOST}/${mId}/${mProfileThumbnail}`} />
                :
                <img src="/imgs/profile_default.png" />
            }

                <div className='post'>
                    <div>{story.length > 0 ? story.length : 0}</div>
                    <div>post</div>
                </div>
                <div className='friend'>
                    <div>{friend.friend_count > 0 ? friend.friend_count : 0}</div>
                    <div>friend</div>
                </div>
                
            </div>
            <div className='profile_member_name'>
                <p>{mId}</p>
            </div>
            <div className='profile_self_intro'>
                <p>{mSelfIntroduction ? mSelfIntroduction : '자기소개가 없습니다.'}</p>
            </div>
            <div className='profile_follow_btn'>
            
                {btn()}
            
            </div>

            <div className='profile_img_name'>게시물</div>

            <div id='profile_img' >
                
                    {
                        story.length === 0 
                        ? 
                        '내용이 없습니다.' 
                        : 
                        <div className='profile_item'>
                            {
                                story.map((story, idx) => {
                                    return (

                                        <div key={idx} onClick={() => openStoryClickHandler(story)}>
                                            
                                            {
                                                story.pictures.length === 0
                                                ?
                                                <img src="" alt="" />
                                                :
                                                <img src={`${process.env.REACT_APP_HOST}/${mId}/${story.pictures[0].SP_PICTURE_NAME}`} alt="" />

                                            }
                                            
                                        </div>
                                    )
                                })
                            }  
                        </div> 
                    }

                </div>
                

                <ul id='story_wrap'>
                    {
                        mystory.map((story, idx) => (
                            <StoryUi
                                key={idx}
                                s_no={story.S_NO}
                                m_id={story.memberInfors[0].M_ID}
                                m_name={story.memberInfors[0].M_NAME}
                                m_profile_thumbnail={story.memberInfors[0].M_PROFILE_THUMBNAIL}
                                pictures={story.pictures}
                                s_txt={story.S_TXT}
                                storyLikeCnt={story.storyLikeCnt}
                                storyIsLike={story.storyIsLike}
                                replysCnt={story.replysCnt}
                                s_mod_date={story.S_MOD_DATE}
                                memberInfors={story.memberInfors[0]}
                            />
                        ))
                    }
                </ul>   
            
            <div id={modal ? "reply_show_modal" : "reply_hide_modal"} >
            <div className='reply_modal_close_btn' onClick={replyModalCloseBtnClickHandler}>
                <div></div>
                <div></div>
            </div>
            <StoryReplyUI/>
        </div>

        </div>
    );
};

export default MyProfile;
