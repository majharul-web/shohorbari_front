import UpdateProfileModal from "@/components/profile/UpdateProfileModal";
import NoDataFound from "@/components/ui/error/NoDataFound";
import Loader from "@/components/ui/loader/Loader";
import { useGetUserByTokenQuery } from "@/redux/api/authApi";
import { motion } from "framer-motion";
import React from "react";

const ProfilePage: React.FC = () => {
  const { data: user, isLoading, isError } = useGetUserByTokenQuery({}, { refetchOnMountOrArgChange: true });

  if (isLoading) return <Loader />;
  if (isError || !user) return <NoDataFound message='Failed to load user data.' />;

  return (
    <div className='min-h-[calc(100vh-10rem)] py-6 md:py-10 px-4 md:px-0'>
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='bg-muted text-primary-foreground py-10 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6 rounded-lg shadow-md'
      >
        <div className='flex items-center gap-6 w-full md:w-auto'>
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt='Profile'
              className='h-32 w-32 rounded-full object-cover border-4 border-primary'
            />
          ) : (
            <div className='h-32 w-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-muted-foreground border-4 border-primary'>
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </div>
          )}
          <div>
            <p className='text-2xl md:text-3xl font-bold'>
              {user.first_name} {user.last_name}
            </p>
            <p className='text-lg mt-1 uppercase'>{user.role}</p>
          </div>
        </div>

        <div className='flex gap-4 flex-wrap'>
          <UpdateProfileModal
            triggerLabel='Update Image'
            title='Update Profile Image'
            user={user}
            type='image'
          />
          <UpdateProfileModal
            triggerLabel='Update Profile Info'
            title='Update Profile Info'
            user={user}
            type='info'
          />
        </div>
      </motion.div>

      {/* User Info Cards */}
      <motion.div
        className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {[
          { label: "Email", value: user.email || "-" },
          { label: "Phone", value: user.phone_number || "-" },
          { label: "Address", value: user.address || "-" },
          {
            label: "Status",
            value: user.is_active ? "Active" : "Inactive",
            className: user.is_active ? "text-green-600 font-semibold" : "text-red-600 font-semibold",
          },
        ].map((info, idx) => (
          <div key={idx} className='bg-card p-6 rounded-2xl shadow-md border border-border'>
            <h2 className='font-semibold text-lg mb-2'>{info.label}</h2>
            <p className={info.className || ""}>{info.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
