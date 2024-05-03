import React from 'react'
import $ from 'jquery';

const StoryUi = (props) => {


	const storyTextBtnClickHandler = (e) => {
        console.log("storyTextBtnClickHandler()");
		let story_text_btn = e.target;
        $(story_text_btn).css({'width': '100%','white-space': 'initial', 'cursor':'inherit'});
    }

	return (
		<li className={`story_li_${props.storyIdx}`}>
			<div className='story_header'>
				<div className='story_header_img'>
					{/* <img src="/imgs/profile_default.png" alt="" /> */}
					<img src={props.m_profile_thumbnail} alt="" />
				</div>
				<div className='story_header_member_info_wrap'>
					<h4>{props.m_id}</h4>
					<p>{props.m_name}</p>
				</div>
				<div className='story_header_menu_btn'>
					<a href="#none">&#183; &#183; &#183;</a>
				</div>
			</div>
			<div className='story_pictures_wrap'>
				<img src={props.s_pictures} alt="" />
			</div>
			<div className='story_contents_Wrap'>
				<div className='story_content_icon_wrap'>
					<a href="#none">
						<img src="/imgs/story_like_r_icon.png" alt="" />
					</a>
					<a href="#none">
						<img src="/imgs/story_reply_icon.png" alt="" />
					</a>
					<a href="#none">
						<img src="/imgs/story_messege_icon.png" alt="" />
					</a>
				</div>
				<div className="like_count_wrap">
					<p>좋아요<span>{props.s_like_count}</span>개</p>
				</div>
				<div className='story_contents_text_wrap'>
					<p className='story_text_btn' onClick={(e)=>storyTextBtnClickHandler(e)}>
						<span className='s_id'>{props.m_id}</span>
						<span className='s_text'>{props.s_text}</span>
					</p>
					<div className='story_reply_wrap'>
						<p>댓글 <span>{props.s_reply_count}</span>개 모두 보기</p>
					</div>
					<div className='story_date'>
						<p>{props.s_mod_date}</p>
					</div>
				</div>
			</div>                    
		</li>
	)
}

export default StoryUi