import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReReplyUI from './ReReplyUI';
import $ from 'jquery';
import { useSelector } from 'react-redux';

axios.defaults.withCredentials = true

const ReplyUI = (props) => {
    
    const [reReplys,setReResplys] = useState([]);
    const [rTxt,setRTxt] = useState('');
    const [reReplyWriteView,setReReplyWriteView] = useState(false);

    const modal = useSelector(store => store.modal);
    const loginedMember = useSelector(store => store.loginedMember);

    useEffect(() => {
        console.log("ReplyUI useEffect()");
        setReReplyWriteView(!modal);
        setReResplys([]);
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

    const axios_re_reply_write_confirm = () => {
		console.log("axios_re_reply_write_confirm()");

		let requestData = {
            's_no' : props.s_no,
            'r_origin_no' : props.reply.R_NO,
            'r_txt' : rTxt,
            'm_id' : props.reply.R_M_ID,
        }

		axios({
			url: `${process.env.REACT_APP_HOST}/story/reply/re_reply_write_confirm`,
			method: 'post',
			data: requestData,
            headers: {
                'Content-Type': 'application/json',
            }
		})
		.then(response => {	
			console.log("axios re_reply write confirm success!!");
			console.log("response: ",response.data);
			if(response.data === null){
				console.log("database error!!");
			}else if(response.data === 0){
				console.log("database insert fail!!")
			}else if(response.data === 1){
				alert("댓글 등록 성공!!");
				props.setReplyFlag(pv => !pv);               
                
			}

		})
		.catch(err => {
            console.log("axios re_reply write confirm error!!");
            console.log("err: ",err);
		})
		.finally(data => {
            console.log("axios re_reply write confirm finally!!");
            setReReplyWriteView(false);
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
        setRTxt('');
        
    }

    const reReplyWriteViewCloseBtnClickHandler = () => {
        console.log("reReplyWriteViewCloseBtnClickHandler()");
        setReReplyWriteView(false);
        setRTxt('');
    }

    const reReplyWriteSendBtnClickHandler = () => {
        console.log("reReplyWriteSendBtnClickHandler");    
        axios_re_reply_write_confirm();
        setRTxt('');    
    }

    const replyDeleteBtnClickHandler = (e) => {
        console.log("replyDeleteBtnClickHandler()");
        console.log(`${props.s_no}번 게시물 ${props.reply.R_NO}번 댓글 삭제`);
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
                <div className='story_reply_writer_id'>
                    {props.reply.R_M_ID}
                    {   
                        props.reply.R_M_ID === loginedMember.M_ID
                        ?
                        <span onClick={(e) => replyDeleteBtnClickHandler(e)} className='reply_delete_btn'>
                            댓글삭제
                        </span>
                        :
                        null
                    }
                </div>
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
                            <input type="text" value={rTxt} onChange={(e) => setRTxt(e.target.value)}/>
                            <button onClick={reReplyWriteSendBtnClickHandler}><img src="/imgs/send_arrow.png" alt="" /></button>
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