import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const StoryUi = (props) => {
	
	const dispatch = useDispatch();
	const [pictures,setPictures] = useState([]);

	
	const modal = useSelector(store => store.modal);

	useEffect(() => {
        console.log("StoryUi useEffect()");
        setPictures(props.pictures);
    },[modal]);

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
			s_no: props.s_no,
		});
	}

	const storyModifyBtnClickHandler = () => {
		console.log("storyModifyBtnClickHandler()");
		console.log(`${props.s_no}.no story Modify confirm!!`);

		dispatch({
			type:'story_modify_btn_click',
			s_no: props.s_no,
		});

	}
	const storyDeleteBtnClickHandler = () => {
		console.log("storyDeleteBtnClickHandler()");
		console.log(`${props.s_no}.no story Delete confirm!!`);
	}

	
	return (
		<li className={`story_li_${props.s_no}`}>
			<div className='story_header'>
				<div className='story_header_img'>
					{
						props.memberInfors.M_PROFILE_THUMBNAIL !== null
						?
						<img src={`${process.env.REACT_APP_HOST}/${props.memberInfors.M_ID}/${props.memberInfors.M_PROFILE_THUMBNAIL}`} alt=''/>
						:
						<img src="/imgs/profile_default.png" alt="" />
					}
				</div>
				<div className='story_header_member_info_wrap'>
					<h4>{props.m_id}</h4>
					<p>{props.m_name}</p>
				</div>
				<div className='story_header_menu_btn'>
					<a href="#none" >&#183; &#183; &#183;</a>
					<div className="story_header_menu_modal">
						<ul>
							<li onClick={(e) => storyModifyBtnClickHandler(e)}><Link to="/story/modify_story">게시물수정</Link></li>
							<li onClick={(e) => storyDeleteBtnClickHandler(e)}>게시물삭제</li>
						</ul>
					</div>
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
						pictures.map((picture,idx) => {
							let randomNum = Math.floor((Math.random() * 10)+3);
                            return (
                                <SwiperSlide key={idx}><div id='swiper_img'><img src={`${picture.SP_PICTURE_NAME}/${randomNum}00/${randomNum}00`} alt="" /></div></SwiperSlide>
                                // <SwiperSlide key={idx}>
								// 	<div id='swiper_img'>
								// 	<img src={`${process.env.REACT_APP_HOST}/${props.m_id}/${picture.SP_SAVE_DIR}/${picture.SP_PICTURE_NAME}`} alt="" />
								// 	</div>
								// </SwiperSlide>
                            )
                        })
					}
				</Swiper>
			</div>
			<div className='story_contents_Wrap'>
				<div className='story_content_icon_wrap'>
					<a href="#none">
						{
							props.storyIsLike !== 0
							?
							<img src="/imgs/story_like_r_icon.png" alt="like button" />
							:
							<img src="/imgs/story_like_w_icon.png" alt="like button" />
						}
						
					</a>
					<a href="#none" onClick={(e) => storyReplyBtnClickHandler(e)}>
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
						{
							props.replysCnt === 0
							?
							null
							:
							<p onClick={(e) => storyReplyBtnClickHandler(e)}>댓글 <span>{props.replysCnt.toLocaleString("ko-KR")}</span>개 모두 보기</p>
						}
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