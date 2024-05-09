import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReReplyUI from './ReReplyUI';
import $ from 'jquery';
import { useSelector } from 'react-redux';

const ReplyUI = (props) => {
    
    const [reReplys,setReResplys] = useState([]);

    const [reReplyForMId,setReReplyForMId] = useState('');

    const [reReplyWriteView,setReReplyWriteView] = useState(false);

    const modal = useSelector(store => store.modal);

    useEffect(() => {
        console.log("ReplyUI useEffect()");
        setReReplyWriteView(!modal);
    },[props.reply,modal]);

    const axios_get_story_re_reply_list = (r_no) => {
		console.log("axios_get_story_re_reply_list()");

		axios({
			url: `${process.env.REACT_APP_HOST}/story/reply/get_re_replys`,
			method: 'get',
			params:{
				"r_no" : r_no,
			}
		})
		.then(response => {	
			console.log("axios get story re_reply list success!!");
			setReResplys(response.data);
		})
		.catch(err => {
            console.log("axios get story re_reply list error!!");
            console.log("err: ",err);
		})
		.finally(data => {
            console.log("axios get story re_reply list finally!!");
		});

	}

    const reReplyListBtnClickHandler = (e) => {
		console.log("reReplyListBtnClickHandler()");
		let r_no = e.target.dataset.r_no;
		axios_get_story_re_reply_list(r_no);
	}

    const reReplyWriteViewBtnClickHandler = (e) => {
        console.log("reReplyWriteViewBtnClickHandler()");
        // let target = e.target;
        setReReplyWriteView(true);
        setReReplyForMId(`${props.reply.R_NO}.${props.reply.R_M_ID}`);
    }

    const reReplyWriteViewCloseBtnClickHandler = () => {
        console.log("reReplyWriteViewCloseBtnClickHandler()");
        setReReplyWriteView(false);
        setReReplyForMId('');
    }

    return (
        <div idx={props.idx} className={`story_reply`}>
            <div>
                <div className="story_reply_writer_profile">
                    {
                        props.reply.M_PROFILE_THUMBNAIL !== undefined && props.reply.M_PROFILE_THUMBNAIL!== null
                        ?
                        <img src={`${process.env.REACT_APP_HOST}/${props.reply.R_M_ID}/${props.reply.M_PROFILE_THUMBNAIL}`} alt="" />
                        :
                        <img src="/imgs/profile_default.png" alt="" />
                    }
                </div>
            </div>
            <div className="story_reply_writer_info">
                <div className='story_reply_writer_id'>{props.reply.R_M_ID}</div>
                <div className='story_reply_writer_txt'>{props.reply.R_TXT}</div>
                {
                    !reReplyWriteView
                    ?
                    <div className='re_reply_write_btn' onClick={(e) => reReplyWriteViewBtnClickHandler(e)}>답글 달기</div>               
                    :
                    <div id={reReplyWriteView ? `re_reply_write_form_wrap_show` : `re_reply_write_form_wrap_hide`}>
                        <div className='re_reply_write_form_Profile'>
                            <img src="" alt="" />
                        </div>
                        <div className='re_reply_write_form_input'>
                            <input type="text" value={reReplyForMId} onChange={(e) => setReReplyForMId(e.target.value)}/>
                            <button><img src="/imgs/send_arrow.png" alt="" /></button>
                        </div> 
                        <div className='re_reply_write_close_btn' onClick={reReplyWriteViewCloseBtnClickHandler}>
                            <div></div>    
                            <div></div>    
                        </div>   
                    </div>
                }
                
                
                {
                    props.reply.re_replysCnt !== 0
                    ?	
                        reReplys.length !== 0
                        ?
                        reReplys.map((reReply,idx) => {
                            return (
                                <ReReplyUI idx={idx} reReply={reReply}/>
                            )
                        })
                        :				
                        <p className='re_reply_list_btn' data-r_no={props.reply.R_NO} onClick={(e) => reReplyListBtnClickHandler(e)}>
                            {`- 답글 ${props.reply.re_replysCnt}개 더 보기`}
                        </p>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default ReplyUI;