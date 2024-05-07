import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper/modules';
import '../../css/story/img_swiper.css';

const ImageSwiper = ({ imagePreview  }) => {
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
                imagePreview.map((image, index) =>
                    <SwiperSlide key={index}>
                        <div className='img_wrap'>
                            <img src={image} alt={`Slide ${index}`} />
                        </div>
                    </SwiperSlide>
                )
            }
        </Swiper>
    );
};

export default ImageSwiper;