import { motion } from "framer-motion";
import React from "react";
const demoListings = [1, 2, 3, 4, 5, 6];

interface IProps {
  title?: string;
  clsses?: string;
}

const RentList: React.FC<IProps> = ({ title = "Featured Rentals", clsses }) => {
  return (
    <section className={clsses}>
      <h2 className='text-2xl md:text-3xl font-bold mb-8 '>{title}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8'>
        {demoListings.map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.03 }}
            className='border border-border rounded-lg overflow-hidden bg-card'
          >
            <img
              src={`/demo-house-${item}.jpg`}
              alt={`House ${item}`}
              className='w-full h-48 md:h-56 object-cover'
            />
            <div className='p-4'>
              <h3 className='font-semibold text-lg mb-1'>Beautiful Apartment {item}</h3>
              <p className='text-sm text-muted-foreground mb-2'>Dhaka, Bangladesh</p>
              <p className='font-bold text-primary'>৳ {50_000 + item * 1000}/month</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RentList;
