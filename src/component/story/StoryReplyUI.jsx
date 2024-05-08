import React, { useEffect, useState } from 'react';
import '../../css/story/storyReply.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ReplyUI from './ReplyUI';

const StoryReplyUI = () => {

	const [replys,setResplys] = useState([]);
	
	const [r_txt,setR_txt] = useState('');

	// const s_replys = useSelector((store) => store.s_replys );
	const loginedMember = useSelector(store => store.loginedMember);
	const s_no = useSelector(store => store.s_no);
	

	useEffect(() => {
		console.log("StoryReplyUI useEffect()");
		console.log("StoryReplyUI useEffect() s_no: " + s_no);
		axios_get_story_reply_list(s_no);
  	},[s_no]);

	const axios_get_story_reply_list = (s_no) => {
		console.log("axios_get_story_reply_list()");

		axios({
			url: `${process.env.REACT_APP_HOST}/story/reply/get_replys`,
			method: 'get',
			params:{
				"s_no" : s_no,
			}
		})
		.then(response => {	
			console.log("axios get story reply list success!!");
			console.log("data: ",response.data);
            setResplys(response.data);
			
		})
		.catch(err => {
            console.log("axios get story reply list error!!");
            console.log("err: ",err);
		})
		.finally(data => {
            console.log("axios get story reply list finally!!");
		});

	}

	

  	const handleKeyDown = (e = React.KeyboardEvent) => {
		// 키가 눌렸을 때 수행될 작업
		if (e.key === 'Enter') {
			storyReplySendBtnClickHandler();
		}
	}

	const storyReplySendBtnClickHandler = () => {
		console.log("storyReplySendBtnClickHandler()");		
		if(r_txt !== '') {
			console.log("r_txt: ",r_txt);
			// axios_story_reply_send();
		}
		setR_txt('');
	}

	

  return (
        <>
          	<div id='story_replys_wrap'>
				<h1 className='story_replys_header'>
					댓글
				</h1>
				<div id="story_replys_overflow">
				{	
					replys.length === 0
					?
					<div className='story_reply_empty'>
                        댓글이 없습니다.
                    </div>
					:
					replys.map((reply,idx) => {	
						console.log("reply=>>>>>>>>",reply);			
						return (
							<ReplyUI reply={reply} idx={idx}/>
						)
					})
				}
				</div>
				<div className='story_reply_input'>
					<div className='story_reply_input_profile_thum'>	
					{
						loginedMember !== undefined && loginedMember !== null && loginedMember !== ''
						?
						<img src={`${process.env.REACT_APP_HOST}/${loginedMember.M_ID}/${loginedMember.M_PROFILE_THUMBNAIL}`} alt="" />
						:
						<img src="/imgs/profile_default.png" alt="" />
					}						
					</div>
					<div className='story_reply_input_txt'>
						<input type="text" name='r_txt' value={r_txt} onKeyDown={handleKeyDown} onChange={(e) => setR_txt(e.target.value)}/>
						{
							r_txt !== ''
                            ?
							<button className='send_btn_activ' onClick={storyReplySendBtnClickHandler}><img src="/imgs/send_arrow.png" alt="버튼활성화" /></button>
                            :
                            <button className='send_btn_disabled'><img src="/imgs/send_arrow.png" alt="버튼비활성화" /></button>
						}
					</div>
				</div>
            </div>
        </>
  )
}

export default StoryReplyUI;