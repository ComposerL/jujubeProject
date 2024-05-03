import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const StoryUi = (props) => {
	

	const [pictures,setPictures] = useState([]);

	useEffect(() => {
        console.log("StoryUi useEffect()");
        setPictures(props.s_pictures);
    },[]);

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
                            return (
                                <SwiperSlide key={index}><img src={picture} alt="" /></SwiperSlide>
                                // <SwiperSlide key={index}><img src={`process.env.REACT_APP_HOST/${props.m_id}/${picture}`} alt="" /></SwiperSlide>
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
					<p>좋아요<span>{props.s_like_count.toLocaleString("ko-KR")}</span>개</p>
				</div>
				<div className='story_contents_text_wrap'>
					<p className='story_text_btn' onClick={(e)=>storyTextBtnClickHandler(e)}>
						<span className='s_id'>{props.m_id}</span>
						<span className='s_text'>{props.s_text}</span>
					</p>
					<div className='story_reply_wrap'>
						<p>댓글 <span>{props.s_reply_count.toLocaleString("ko-KR")}</span>개 모두 보기</p>
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