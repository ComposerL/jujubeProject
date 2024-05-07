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
            {
				replys.map((reply,idx) => {					
					return (
						<div className={idx}>
							{reply.R_M_ID}: {reply.R_TXT}
						</div>
					)
				})
            }
				<div className='story_reply_input'>
					<input type="text" name='r_txt' />
				</div>
            </div>
        </>
  )
}

export default StoryReplyUI;