import React from 'react'
import '../../css/member/follow_request_list.css';

const FollowRequestList = () => {
    return (
        <>
            <div id='follow_request_list_wrap'>
                <div className="follow_request_header">
                    ILCHON REQUEST LIST
                </div>
                <div className='follow_request_list_section_wrap'>
                    <div className='follow_request_list_section1'>
                        <div className="follow_request_list_section1_header">
                            일촌목록
                        </div>
                        <div className="follow_request_list_section1_article">
                            
                        </div>                     
                    </div>
                    <div className='follow_request_list_section_line'></div>
                    <div className='follow_request_list_section2'>
                        <div className="follow_request_list_section2_header">
                            받은요청
                        </div>
                        <div className="follow_request_list_section2_article">
                        
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FollowRequestList;