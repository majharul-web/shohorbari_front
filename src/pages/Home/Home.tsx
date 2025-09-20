import Hero from "@/components/rents/Hero";
import RentList from "@/components/rents/RentList";
import ReviewSlider from "@/components/rents/ReviewSlider";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// Demo categories
const categories = [
  { id: 1, name: "Apartment", icon: "🏢" },
  { id: 2, name: "Villa", icon: "🏡" },
  { id: 3, name: "Studio", icon: "🏠" },
  { id: 4, name: "Office", icon: "🏬" },
];

// Hero slider demo
const heroSlides = [
  { id: 1, image: "/home1.jpg", title: "Find your dream home" },
  { id: 2, image: "/home1.jpg", title: "Best rentals in town" },
  { id: 3, image: "/home1.jpg", title: "Comfortable living awaits" },
];

const demoListings = [1, 2, 3, 4, 5, 6];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSearch = () => {
    const params: any = {};
    if (search) params.q = search;
    if (selectedCategory) params.category = selectedCategory;
    navigate({
      pathname: "/rents",
      search: new URLSearchParams(params).toString(),
    });
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className='w-full min-h-screen bg-background text-foreground'>
      {/* Hero Section */}
      <Hero />

      {/* Categories */}
      <section className='max-w-7xl mx-auto px-6 py-16'>
        <h2 className='text-2xl md:text-3xl font-bold mb-8 text-center'>Top Categories</h2>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8'>
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer border border-border bg-card hover:bg-primary hover:text-white transition`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className='text-4xl mb-2'>{cat.icon}</span>
              <span className='font-semibold text-center'>{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <RentList clsses='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16' />

      {/* How it Works Section */}
      <section className='bg-muted p-16'>
        <h2 className='text-2xl md:text-3xl font-bold mb-12 text-center'>How It Works</h2>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            { title: "Search Property", desc: "Find the perfect property easily." },
            { title: "Contact Owner", desc: "Reach out directly to the property owner." },
            { title: "Move In", desc: "Finalize the deal and move in comfortably." },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className='bg-card p-6 rounded-lg text-center border border-border'
            >
              <h3 className='font-semibold text-lg mb-2'>{step.title}</h3>
              <p className='text-sm text-muted-foreground'>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className='max-w-7xl mx-auto px-6 py-16'>
        <h2 className='text-2xl md:text-3xl font-bold mb-12 text-center'>What Our Users Say</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {[
            { name: "Masud Rana", comment: "Found my dream home in 2 days!" },
            { name: "Sadia Khan", comment: "Easy to use and reliable service." },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className='p-6 border border-border rounded-lg bg-card'
            >
              <p className='mb-4 text-muted-foreground'>"{testimonial.comment}"</p>
              <p className='font-semibold'>{testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </section> */}
      <ReviewSlider />

      {/* Call to Action */}
      <section className='bg-primary text-white py-16 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>List Your Property Today</h2>
        <p className='mb-6'>Reach thousands of potential renters in minutes</p>
        <button className='px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition'>
          Get Started
        </button>
      </section>
    </div>
  );
};

export default HomePage;
