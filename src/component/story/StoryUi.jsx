import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useDispatch } from 'react-redux';

const StoryUi = (props) => {
	
	const dispatch = useDispatch();
	const [pictures,setPictures] = useState([]);

	useEffect(() => {
        console.log("StoryUi useEffect()");
        setPictures(props.pictures);
    },[]);

	const storyTextBtnClickHandler = (e) => {
        console.log("storyTextBtnClickHandler()");
		let story_text_btn = e.target;
        $(story_text_btn).css({'width': '100%','white-space': 'initial', 'cursor':'inherit'});
    }

	const storyReplyBtnClickHandler = (e) => {
		console.log("storyReplyBtnClickHandler()");
		dispatch({
			type:'story_btn_click',
			modal: true,
			s_replys: props.s_replys,
		});
	}

	return (
		<li className={`story_li_${props.s_no}`}>
			<div className='story_header'>
				<div className='story_header_img'>
					<img src="/imgs/profile_default.png" alt="" />
					{/* <img src={props.m_profile_thumbnail} alt="" /> */}
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
				
				<Swiper
					modules={[Navigation, Pagination]}
					spaceBetween={0}
					slidesPerView={1}
					speed={100}
					// navigation
					pagination={{ clickable: true }}
					scrollbar={{ draggable: false }}
					style={{
						"--swiper-pagination-color": "#e8e8e8",
						"--swiper-navigation-color": "#e8e8e8",
					  }}
					>
					{
						pictures.map((picture, index) => {
							let randomNum = Math.floor((Math.random() * 10)+3);
                            return (
                                // <SwiperSlide key={index}>
								// // 	<p style={{'color':'#fff'}}>{picture.SP_NO}</p>
								// // 	<p style={{'color':'#fff'}}>{picture.SP_PICTURE_NAME}</p>
								// </SwiperSlide>
                                <SwiperSlide key={index}><img src={`${picture.SP_PICTURE_NAME}/${randomNum}00/${randomNum}00`} alt="" /></SwiperSlide>
                                // <SwiperSlide key={index}><img src={`process.env.REACT_APP_HOST/${props.m_id}/${props.s_no}/${picture.SP_PICTURE_NAME}`} alt="" /></SwiperSlide>
                            )
                        })
					}
				</Swiper>
			</div>
			<div className='story_contents_Wrap'>
				<div className='story_content_icon_wrap'>
					<a href="#none">
						<img src="/imgs/story_like_r_icon.png" alt="like button" />
					</a>
					<a href="#none">
						<img src="/imgs/story_reply_icon.png" alt="reply button" />
					</a>
					<a href="#none">
						<img src="/imgs/story_messege_icon.png" alt="message button" />
					</a>
				</div>
				<div className="like_count_wrap">
					<p>좋아요<span>{props.storyLikeCnt.toLocaleString("ko-KR")}</span>개</p>
				</div>
				<div className='story_contents_text_wrap'>
					<p className='story_text_btn' onClick={(e)=>storyTextBtnClickHandler(e)}>
						<span className='s_id'>{props.m_id}</span>
						<span className='s_text'>{props.s_txt}</span>
					</p>
					<div className='story_reply_wrap'>
						<p onClick={(e) => storyReplyBtnClickHandler(e)}>댓글 <span>{props.replysCnt.toLocaleString("ko-KR")}</span>개 모두 보기</p>
					</div>
					<div className='story_date'>
						<p>{props.s_mod_date}</p>
					</div>
				</div>
			</div>                    
		</li>
	)
}

export default StoryUi;