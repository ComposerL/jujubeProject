import React, { useEffect } from 'react';

const ReReplyUI = (props) => {

    useEffect(() => {
        console.log('ReReplyUI useEffect()');
    },[]);

    return (
        
        <div id='re_reply_list_wrap'>
            <div>            
                <div className="re_reply_writer_profile">
                    {
                        props.reReply.M_PROFILE_THUMBNAIL !== undefined && props.reReply.M_PROFILE_THUMBNAIL !== null
                        ?
                        <img src={`${process.env.REACT_APP_HOST}/${props.reReply.R_M_ID}/${props.reReply.M_PROFILE_THUMBNAIL}`} alt="" />
                        :
                        <img src="/imgs/profile_default.png" alt="" />
                    }
                </div>
            </div>
            <div className="re_reply_writer_info">
                <div className='re_reply_writer_id'>{`${props.reReply.R_M_ID}`}</div>
                <div className='re_reply_writer_txt'>{props.reReply.R_TXT}</div>
            </div>										
        </div>
    )
}

export default ReReplyUI;