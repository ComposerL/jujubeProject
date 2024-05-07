import React, { useEffect, useState } from 'react';
import '../../css/story/storyReply.css';
import { useSelector } from 'react-redux';

const StoryReplyUI = () => {

  const [replys,setResplys] = useState([]);

  const s_replys = useSelector((store) => store.s_replys );

  useEffect(() => {
    console.log("StoryReplyUI useEffect()");
    console.log("s_replys: ",s_replys);
    setResplys(s_replys);
  },[s_replys]);

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
						return (
							<div idx={idx} className={`story_reply`}>
								<div className="story_reply_writer_profile">
									<img src="/imgs/profile_default.png" alt="" />
								</div>
								<div className="story_reply_writer_info">
									<div className='story_reply_writer_id'>{reply.R_M_ID}</div>
									<div className='story_reply_writer_txt'>{reply.R_TXT}</div>
								</div>
							</div>
						)
					})
				}
				</div>
				<div className='story_reply_input'>
					<div className='story_reply_input_profile_thum'>
						<img src="/imgs/profile_default.png" alt="" />
					</div>
					<div className='story_reply_input_txt'>
						<input type="text" name='r_txt' />
						<button><img src="/imgs/send_arrow.png" alt="" /></button>
					</div>
				</div>
            </div>
        </>
  )
}

export default StoryReplyUI;