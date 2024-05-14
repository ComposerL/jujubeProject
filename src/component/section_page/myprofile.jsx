import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StoryUi from '../story/StoryUi';
import StoryReplyUI from '../story/StoryReplyUI';
import { getCookie,removeCookie } from '../../util/cookie';

const MyProfile = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginedMember = useSelector(store => store.loginedMember);
    const otherMember = useSelector(store => store.member);    
    const story = useSelector(store => store.story);
    const button = useSelector(store => store.button);
    const friend = useSelector(store => store.friend);
    const modal = useSelector(store => store.modal);
    const storymodal = useSelector(store => store.storymodal);
    
    // const [storyFlag , setStoryFlag] = useState(false);
    const [mId, setMId] = useState('');
    const [mSelfIntroduction, setMSelfIntroduction] = useState('');
    const [mProfileThumbnail, setMProfileThumbnail] = useState('');
    const [mystory, setMystory] = useState([]);

    console.log('button: ', button);

    useEffect(() => {
        
        if (loginedMember) {
            setMId(loginedMember.M_ID);
            setMSelfIntroduction(loginedMember.M_SELF_INTRODUCTION);
            setMProfileThumbnail(loginedMember.M_PROFILE_THUMBNAIL);

        } else 
        if (otherMember || loginedMember) {
            setMId(otherMember.M_ID || loginedMember.M_ID);
            setMSelfIntroduction(otherMember.M_SELF_INTRODUCTION);
            setMProfileThumbnail(otherMember.M_PROFILE_THUMBNAIL);
        }

        dispatch({
            type:'story_open_btn',
            storymodal:false
        })

        dispatch({
            type:'reply_modal_close',
            modal:false
        })

    },[loginedMember, otherMember, props.setStoryFlag]);
        
    if (!loginedMember || !story || !friend) {
         // 데이터가 없는 경우 처리
        return <div>Loading...</div>;
    }  


    //버튼 분기
    console.log("buttonnnnnnnnnnnnnnnnnnnnn: ", button.is_friend);
    console.log("buttonnnnnnnnnnnnnnnnnnnnn: ", button.is_friend_request);

    //{is_friend = false, is_friend_request = false}
    const FriendButton = () => {
        return (
            <div>
                {button.is_friend === true ? (
                    <input type="button" value="친구 삭제" onClick={deleteFriendClickHandler} />
                ) : (
                    button.is_friend_request === true ? (
                        <input type="button" value="친구 요청 취소" onClick={cancelFriendRequestHandler} />
                    ) : (
                        <input type="button" value="친구 추가" onClick={addFriendClickHandler} />
                    )
                )}
            </div>
        );
            
      
        
    }
        
    const axios_delete_friend = () => {
        console.log('axios_delete_friend()');

    }

    
    
    
    const addFriendClickHandler = () => {
    console.log('addFriendClickHandler()');

    const isAddFriend = window.confirm("정말로 친구를 추가하시겠습니까?");
        
    if (isAddFriend) {
      
        
        }
    }
    
    const cancelFriendRequestHandler = () => {
        console.log('cancelFriendRequestHandler()');
    }
    
    const deleteFriendClickHandler = () => {
        console.log('deleteFriendClickHandler()');
        
        const isDeleteFriend = window.confirm("정말로 친구 삭제하시겠습니까?");
        
        if (isDeleteFriend) {
            axios_delete_friend();
            
        }
    }
    
    const openStoryClickHandler = (story, e) => {
        console.log('openStoryClickHandler()');
        
        setMystory([story]);
        dispatch({
            type:'story_open_btn',
            storymodal: true,
        });
        
    }
    
    const ModalCloseBtnClickHandler = () => {
        console.log('closeStoryClickHandler()');

        dispatch({
            type:'story_open_btn',
            storymodal: false,
        });

    }
    
    const replyModalCloseBtnClickHandler = () => {
        console.log('replyModalCloseBtnClickHandler()');
        dispatch({
            type:'reply_modal_close',
            modal: false,
        });
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
                    <div>{friend.friend_list.length > 0 ? friend.friend_list.length : 0}</div>
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
            
                {FriendButton()}
            
            </div>

            <div className='profile_img_name'>게시물</div>

            <div id='profile_img'>
                
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
                                                <img src="#" alt="" />
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
            <div>
                <div id={storymodal ? "open_story_wrap" : "hide_story_wrap"}>
                    <div className='modal_close_btn' onClick={ModalCloseBtnClickHandler}>
                        <img src="/imgs/pngwing.com.png" alt="" />
                    </div>
                    <div id='story_wrap' >    
                        <ul>
                            
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
                                        setStoryFlag = {props.setStoryFlag}
                                    />
                                ))
                            }

                        </ul>   
                    </div>
                </div> 
            </div>
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
