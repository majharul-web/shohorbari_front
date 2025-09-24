import SkeletonTopCategories from "@/components/category/SkeletonTopCategories";
import Hero from "@/components/rents/Hero";
import RentList from "@/components/rents/RentList";
import ReviewSlider from "@/components/rents/ReviewSlider";
import SkeletonReviewSlider from "@/components/rents/SkeletonReviewSliderProps";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { useGetAllReviewsQuery } from "@/redux/api/commonApi";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Static icons
const staticIcons = ["🏢", "🏡", "🏠", "🏬"];

const HomePage: React.FC = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({}, { refetchOnMountOrArgChange: true });
  const cats = data?.results || [];
  const navigate = useNavigate();

  // Assign static icons to dynamic categories
  const categoriesWithIcons = useMemo(() => {
    return cats.map((cat: any, idx: any) => ({
      ...cat,
      icon: staticIcons[idx % staticIcons.length], // cycle through static icons
    }));
  }, [cats]);

  // Take only last 4 categories
  const topCategories = useMemo(() => categoriesWithIcons.slice(-4), [categoriesWithIcons]);

  const handleCategoryClick = (catId: number) => {
    navigate(`/rents?category=${catId}`);
  };

  const { data: reviews, isLoading: loadingReviews } = useGetAllReviewsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className='w-full min-h-screen bg-background text-foreground'>
      {/* Hero Section */}
      <Hero />

      {/* Categories */}
      <section className='max-w-7xl mx-auto sm:px-4 py-16'>
        <h2 className='text-2xl md:text-3xl font-bold mb-8 text-center'>Top Categories</h2>
        {isLoading ? (
          <SkeletonTopCategories />
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8'>
            {topCategories.map((cat: Record<string, any>) => (
              <motion.div
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                className='flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer border border-border bg-card hover:bg-primary hover:text-white transition'
                onClick={() => handleCategoryClick(cat.id)}
              >
                <span className='text-4xl mb-2'>{cat.icon}</span>
                <span className='font-semibold text-center'>{cat.name}</span>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Listings */}
      <RentList clsses='max-w-7xl mx-auto  m:px-4 lg:px-8 py-16' />

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

      {loadingReviews ? <SkeletonReviewSlider count={3} /> : <ReviewSlider reviews={reviews?.results} />}

      {/* Call to Action */}
      <section className='bg-primary text-white py-16 text-center max-w-7xl mx-auto px-6 md:px-0 rounded-2xl mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>List Your Property Today</h2>
        <p className='mb-6'>Reach thousands of potential renters in minutes</p>
        <button
          className='px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition cursor-pointer'
          onClick={() => navigate("/rents")}
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default HomePage;
