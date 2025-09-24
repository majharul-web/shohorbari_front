import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";

const UserDashboards: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-[calc(100vh-150px)] px-4 py-10 bg-gray-50'>
      {/* Page Header */}
      <motion.div
        className='mb-8 text-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-3xl md:text-4xl font-bold text-foreground'>Welcome to Your Dashboard</h1>
        <p className='text-muted-foreground mt-2'>
          Here you can manage your ads, view requests, and update your profile.
        </p>
      </motion.div>

      {/* Dashboard Cards */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Example Card: My Ads */}
        <motion.div
          className='bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition cursor-pointer'
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className='text-xl font-semibold text-foreground mb-2'>My Ads</h2>
            <p className='text-sm text-muted-foreground'>
              Manage your listed properties and track their status.
            </p>
          </div>
          <Button variant='outline' className='mt-4' onClick={() => navigate("/dashboard/ads")}>
            View Ads
          </Button>
        </motion.div>

        {/* Example Card: Rent Requests */}
        <motion.div
          className='bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition cursor-pointer'
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className='text-xl font-semibold text-foreground mb-2'>Rent Requests</h2>
            <p className='text-sm text-muted-foreground'>
              Review incoming rent requests and approve or reject them.
            </p>
          </div>
          <Button variant='outline' className='mt-4' onClick={() => navigate("/dashboard/ad-request")}>
            View Requests
          </Button>
        </motion.div>

        {/* Example Card: Profile Settings */}
        <motion.div
          className='bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition cursor-pointer'
          whileHover={{ scale: 1.03 }}
        >
          <div>
            <h2 className='text-xl font-semibold text-foreground mb-2'>Profile</h2>
            <p className='text-sm text-muted-foreground'>
              Update your personal information and account settings.
            </p>
          </div>
          <Button variant='outline' className='mt-4' onClick={() => navigate("/dashboard/profile")}>
            Update Profile
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserDashboards;
