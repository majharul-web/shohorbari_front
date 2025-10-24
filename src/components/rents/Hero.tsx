import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { motion } from "framer-motion";
import { Radar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const heroSlides = [
  { id: 1, image: "/hero1.jpg", title: "Find your dream home" },
  { id: 2, image: "/hero2.jpg", title: "Best rentals in town" },
  { id: 3, image: "/hero3.jpg", title: "Comfort & Convenience" },
];

const Hero = () => {
  const { data } = useGetAllCategoriesQuery({}, { refetchOnMountOrArgChange: true });
  const cats = data?.results || [];

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSearch = () => {
    const params: Record<string, string> = {};
    if (search) params.q = search;
    if (selectedCategory) params.category = selectedCategory;

    navigate({
      pathname: "/rents",
      search: new URLSearchParams(params).toString(),
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    appendDots: (dots: React.ReactNode) => <div className='mt-4 flex justify-center'>{dots}</div>,
    customPaging: (i: number) => (
      <motion.button className='w-3 h-3 rounded-full bg-gray-300 mx-1' whileHover={{ scale: 1.3 }} />
    ),
  };

  return (
    <section className='relative w-full h-[63vh] md:h-[63vh] overflow-hidden'>
      <Slider {...sliderSettings}>
        {heroSlides.map((slide) => (
          <div key={slide.id} className='relative w-full h-[60vh] md:h-[60vh]'>
            <img src={slide.image} alt={slide.title} className='w-full h-full object-cover brightness-75' />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'
            >
              <p className='text-white text-center mb-1'>THE BEST WAY TO</p>
              <h1 className='text-3xl md:text-5xl font-bold text-white mb-4'>{slide.title}</h1>
              <p className='text-white text-center mb-6'>We’ve more than 745,000 apartments, place & plot.</p>

              {/* Search & Category */}
              <div className='flex flex-col md:flex-row gap-3 w-full max-w-2xl mx-auto'>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className='px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-white text-gray-700 w-full md:w-1/3'
                >
                  <option value=''>All Categories</option>
                  {cats.map((cat: Record<string, any>) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type='text'
                  placeholder='Search city, neighborhood...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-white text-gray-700 w-full md:w-2/3'
                />

                <button
                  onClick={handleSearch}
                  className='flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/80 transition w-full md:w-auto'
                >
                  <Radar size={18} />
                  Search
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
