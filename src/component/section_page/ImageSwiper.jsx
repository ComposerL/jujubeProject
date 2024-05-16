import $ from 'jquery';
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper/modules';
import '../../css/story/img_swiper.css';

const ImageSwiper = ({ imagePreviews, setUploadImage, setImagePreviews }) => {

    useEffect(() => {
        console.log('imagePreviews---', imagePreviews);
    }, [])

    const picDeleteClickBtn = (e) => {
        console.log('picDeleteClickBtn()');

        let idx = parseInt(e.currentTarget.dataset.idx);

        setImagePreviews((prevPreviews) => {
            const newPreviews = [...prevPreviews];
            newPreviews.splice(idx, 1);
            return newPreviews;
        });

        setUploadImage((prevPreviews) => {
            const newPreviews = [...prevPreviews];
            newPreviews.splice(idx, 1);
            return newPreviews;
        });

    };

    const plusImgBtnClick = () => {
        console.log('plusImgBtnClick()')

        $('#create_story_wrap .input_file_img label').click();

    }

    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            modules={[Navigation, Pagination]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log('swiper')}
        >
            {
                imagePreviews.map((image, index) =>
                    <SwiperSlide key={index}>
                        <div className='img_wrap'>
                            <img src={image} alt={`Slide ${index}`} />
                        </div>
                        <div className='delete_box' data-idx={`${index}`}
                            style={{
                                position : 'absolute',
                                top : '10px',
                                right : '15px',
                                cursor : 'pointer',
                                zIndex : '1000'
                            }}
                            onClick={(e) => picDeleteClickBtn(e)}
                        >
                            <span>X</span>
                        </div>
                    </SwiperSlide>
                )
            }
            <SwiperSlide>
                <div className="img_wrap">
                    <div className='plus_img_wrap'
                        onClick={plusImgBtnClick}
                    >
                        <img src="/imgs/modify_add_icon.png" alt="" />
                    </div>
                    <div className='delete_box'>
                        <span></span>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default ImageSwiper;