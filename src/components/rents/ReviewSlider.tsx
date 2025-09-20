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

const reviews: Review[] = [
  {
    id: 1,
    name: "Leslie Alexander",
    role: "Nintendo",
    rating: 5,
    comment:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    name: "Floyd Miles",
    role: "Bank of America",
    rating: 5,
    comment:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Leslie Alexander",
    role: "Nintendo",
    rating: 5,
    comment:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Floyd Miles",
    role: "Bank of America",
    rating: 5,
    comment:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

const ReviewSlider: React.FC = () => {
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
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
      {
        breakpoint: 0,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
    appendDots: (dots: React.ReactNode) => <div className='mt-4 flex justify-center'>{dots}</div>,
    customPaging: (i: number) => (
      <motion.button className='w-3 h-3 rounded-full bg-gray-300 mx-1' whileHover={{ scale: 1.3 }} />
    ),
  };

  return (
    <div className='max-w-7xl mx-auto py-16 px-6'>
      <h2 className='text-2xl md:text-3xl font-bold mb-2'>People Love Living with Realton</h2>
      <p className='text-gray-500 mb-8'>Aliquam lacinia diam quis lacus euismod</p>

      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id} className='p-3'>
            <div className='bg-white rounded-xl shadow-md p-6 flex flex-col justify-between h-full'>
              <div>
                <h4 className='font-semibold mb-2'>Great Work</h4>
                <p className='text-gray-700 mb-4'>{review.comment}</p>
                <div className='flex space-x-1 mb-4'>
                  {Array(review.rating)
                    .fill(0)
                    .map((_, idx) => (
                      <span key={idx} className='text-yellow-500'>
                        ★
                      </span>
                    ))}
                </div>
              </div>
              <div className='flex items-center gap-3 mt-4'>
                <img src={review.avatar} alt={review.name} className='w-10 h-10 rounded-full object-cover' />
                <div>
                  <p className='font-semibold'>{review.name}</p>
                  <p className='text-gray-500 text-sm'>{review.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSlider;
