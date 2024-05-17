import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoryReplyUI from '../story/StoryReplyUI';
import StoryUi from '../story/StoryUi';
import axios from 'axios';
import { removeCookie } from '../../util/cookie';
import { useNavigate } from 'react-router-dom';

const MyProfile = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const story = useSelector(store => store.story);
    const button = useSelector(store => store.button);
    const friend = useSelector(store => store.friend);
    const modal = useSelector(store => store.modal);
    const storymodal = useSelector(store => store.storymodal);
    const storyMemberInfo = useSelector(store => store.storyMemberInfo);
    
    const [storyFlag, setStoryFlag] = useState(false);
    const [mId, setMId] = useState('');
    const [mSelfIntroduction, setMSelfIntroduction] = useState('');
    const [mProfileThumbnail, setMProfileThumbnail] = useState('');
    const [storys,setStorys] = useState([]);
    const [mystory, setMystory] = useState([]);
    const [storyModal, setStoryModal] = useState(false);
    const member_info = JSON.parse(sessionStorage.getItem('member_info'));

    useEffect(() => {
        console.log('myprofile useEffct');
      
            setMId(member_info.M_ID);
            setMSelfIntroduction(member_info.M_SELF_INTRODUCTION);
            setMProfileThumbnail(member_info.M_PROFILE_THUMBNAIL);

        

        setStorys(story);

        setStoryModal(true);

        // dispatch({ type: 'story_open_btn', storymodal: false });
        // dispatch({ type: 'reply_modal_close', modal: false });

    },[member_info, storys, props.setStoryModal]);
    
    // props.setStoryFlag
    //버튼 분기
    const FriendButton = () => {
        return (
            <div>
                {button.is_friend === true ? (
                    <input type="button" value="친구 삭제" onClick={'deleteFriendClickHandler'} /> 
                ) : (
                    button.is_friend_request === true ? (
                        <input type="button" value="친구 요청 취소" onClick={'cancelFriendRequestHandler'} />
                    ) : (
                        button.is_friend === false && button.is_friend_request === false ? <input type="button" value="친구 추가" onClick={'addFriendClickHandler'} /> : null
                        
                    )
                )}
            </div>

        );
            
      
        
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

        setStoryModal(false);

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
    
    const deleteFriendClickHandler = () => {

    }
    
    const cancelFriendRequestHandler = () => {
        console.log('deleteFriendClickHandler()');

        const isConfirmed = window.confirm("정말로 일촌 요청을 취소하시겠습니까?");

        if (isConfirmed) {
            console.log("delete()");
            axios_request_cancel();
            
        }

    }

    const axios_request_cancel = () => {
        console.log('axios_request_cancel()');

        axios({
            url: `${process.env.REACT_APP_HOST}/member/friend_request_cancel`,
            method: 'get',
            data: {
                f_id: member_info.M_ID
            },
            headers: {
                'authorization': sessionStorage.getItem('sessionID'),
            }
        })
        .then(response => {
                console.log('AXIOS GET MY FRIEND COMMUNICATION SUCCESS');
                console.log(response.data);
                if (response.data === -1) {
                    console.log("Home session out!!");
                    sessionStorage.removeItem('sessionID');
                    removeCookie('accessToken');
                    dispatch({
                        type: 'session_out',
                    });
                    navigate('/');
                } else {
                    if (response.data === null) {
                        console.log("undefined member");
                        
                        alert('일촌요청 취소를 실패했습니다. 다시 시도해주세요.');
                    } else {
                        
                        alert('일촌요청을 취소했습니다.');

                        dispatch({
                            type: 'set_my_button',
                            friend: response.data,
                        });
                        
                    }
                }
                
            })
            .catch(error => {
                console.log('AXIOS GET MY STORY COMMUNICATION ERROR', error);
            })
            .finally(() => {
                console.log('AXIOS GET MY STORY COMMUNICATION COMPLETE');
                
            });
    

    }

    const axios_delete_member = () => {
        console.log('axios_delete_member()');

        axios({
            url: `${process.env.REACT_APP_HOST}/member/friend_delete_confirm`,
            method: 'post',
            data: {
                f_id: member_info.M_ID,
            },
            headers: {
                'authorization': sessionStorage.getItem('sessionID'),      
            }, 
        })
        .then(response => {
                console.log('AXIOS DELETE FRIEND COMMUNICATION SUCCESS');
                console.log(response.data);
                if (response.data === -1) {
                    console.log("Home session out!!");
                    sessionStorage.removeItem('sessionID');
                    dispatch({
                        type: 'session_out',
                    });
                    navigate('/');
                } else {
                    if (response.data === null) {
                        console.log("undefined member");
                        alert('일촌 삭제에 실패했습니다. 다시 시도해주세요.');
                    } else {
                        alert("일촌 삭제가 완료되었습니다.");
                        dispatch({
                            type:'set_my_button',
                            button:response.data
                        });
                        dispatch({
                            type: 'set_my_friend',
                            friend: response.data,
                        });
                    }
                }
            
            })
            .catch(error => {
                console.log('AXIOS GET FRIEND DELETE COMMUNICATION ERROR', error);
            })
            .finally(() => {
                console.log('AXIOS GET FRIEND DELETE COMMUNICATION COMPLETE');
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
                    <div>{friend.friend_count > 0 ? friend.friend_count : 0}</div>
                    <div>friend</div>
                </div>
            </div>
            <div className='profile_member_name'>
                <p>{member_info.M_ID}</p>
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
                        storys === null || storys.length === 0
                        ? 
                        '내용이 없습니다.' 
                        : 
                        <div className='profile_item'>
                            {
                                storys.map((story, idx) => {
                                    return (
                                        <div key={idx} onClick={() => openStoryClickHandler(story)}>                                   
                                            
                                            {
                                                story.length === 1
                                                ?
                                                <img src="#" alt="" />
                                                :
                                                <img src={`${process.env.REACT_APP_HOST}/${mId}/${story.pictures[0].SP_SAVE_DIR}/${story.pictures[0].SP_PICTURE_NAME}`} alt="" />
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