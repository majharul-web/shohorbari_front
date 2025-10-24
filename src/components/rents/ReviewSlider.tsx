import { motion } from "framer-motion";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface ReviewSliderProps {
  reviews?: Record<string, any> | Review[];
}

const ReviewSlider: React.FC<ReviewSliderProps> = ({ reviews = [] }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
    appendDots: (dots: React.ReactNode) => <div className='mt-6 flex justify-center'>{dots}</div>,
    customPaging: () => (
      <motion.button className='w-3 h-3 rounded-full bg-gray-300 mx-1' whileHover={{ scale: 1.3 }} />
    ),
  };

  return (
    <div className='max-w-7xl mx-auto px-6 md:px-0'>
      <h2 className='text-2xl md:text-3xl font-bold mb-2 text-[#567DF2]'>
        What Our Residents Say About Realton
      </h2>
      <p className='text-gray-500 mb-8'>
        Discover why people love calling our modern, comfortable, and well-connected spaces their home.
      </p>

      {reviews.length > 0 ? (
        <Slider {...settings}>
          {reviews.map((review: Record<string, any>) => (
            <div key={review.id} className='p-3 h-full'>
              {/* Outer wrapper ensures equal height */}
              <div className='h-full flex'>
                <div className='bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between w-full min-h-[300px] md:min-h-[300px]'>
                  {/* Review content */}
                  <div className='flex-1'>
                    <h4 className='font-semibold mb-2 text-lg text-[#567DF2]'>Great Work</h4>
                    <p className='text-gray-700 mb-4 leading-relaxed'>{review.comment}</p>
                    <div className='flex space-x-1 mb-4'>
                      {Array(review.rating)
                        .fill(0)
                        .map((_, idx) => (
                          <span key={idx} className='text-yellow-400'>
                            ★
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Reviewer info */}
                  <div className='flex items-center gap-3 mt-auto border-t border-gray-100 pt-4'>
                    <img
                      src={review.user?.profile_image || review.avatar}
                      alt={review.name}
                      className='w-10 h-10 rounded-full object-cover border border-gray-200'
                    />
                    <div>
                      <p className='font-semibold capitalize text-gray-800'>
                        {review?.user?.name || review.name}
                      </p>
                      <p className='text-gray-500 text-sm capitalize'>{review?.user?.role || review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className='flex flex-col items-center justify-center gap-4'>
          <img className='w-[150px]' src='/no-data.png' alt='' />
          <p className='text-center text-gray-500'>No reviews available.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSlider;
