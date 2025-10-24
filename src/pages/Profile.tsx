import UpdateProfileModal from "@/components/profile/UpdateProfileModal";
import NoDataFound from "@/components/ui/error/NoDataFound";
import Loader from "@/components/ui/loader/Loader";
import { useGetUserByTokenQuery } from "@/redux/api/authApi";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, UserCheck } from "lucide-react";
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
        className='bg-muted py-10 px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6 rounded-lg shadow-md'
      >
        <div className='flex items-center gap-6 w-full md:w-auto'>
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt='Profile'
              className='h-32 w-32 rounded-full object-cover border-4 border-[#567DF2] shadow-sm'
            />
          ) : (
            <div className='h-32 w-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-muted-foreground border-4 border-[#567DF2] shadow-sm'>
              {user.first_name?.[0]}
              {user.last_name?.[0]}
            </div>
          )}
          <div>
            <p className='text-2xl md:text-3xl font-bold text-gray-900'>
              {user.first_name} {user.last_name}
            </p>
            <p className='text-lg mt-1 uppercase text-gray-600 tracking-wide'>{user.role}</p>
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

      {/* About Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className='max-w-4xl mx-auto mt-8 bg-card rounded-2xl shadow-md border border-border p-6'
      >
        <div className='flex items-center gap-2 mb-3'>
          <Info className='w-5 h-5 text-[#567DF2]' />
          <h2 className='text-lg font-semibold text-gray-900'>About</h2>
        </div>
        <p className='text-gray-600 leading-relaxed'>
          {user.bio ||
            "No bio available. Update your profile to tell others a bit about yourself, your interests, and what you do."}
        </p>
      </motion.div> */}

      {/* User Info Cards */}
      <motion.div
        className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          {
            label: "Email",
            value: user.email || "-",
            icon: <Mail className='w-5 h-5 text-[#567DF2]' />,
          },
          {
            label: "Phone",
            value: user.phone_number || "-",
            icon: <Phone className='w-5 h-5 text-[#567DF2]' />,
          },
          {
            label: "Address",
            value: user.address || "-",
            icon: <MapPin className='w-5 h-5 text-[#567DF2]' />,
          },
          {
            label: "Status",
            value: user.is_active ? "Active" : "Inactive",
            icon: <UserCheck className='w-5 h-5 text-[#567DF2]' />,
            className: user.is_active ? "text-green-600 font-semibold" : "text-red-600 font-semibold",
          },
          // {
          //   label: "Joined Date",
          //   value: user.created_at ? new Date(user.created_at).toLocaleDateString() : "-",
          //   icon: <Calendar className='w-5 h-5 text-[#567DF2]' />,
          // },
        ].map((info, idx) => (
          <div
            key={idx}
            className='bg-card p-6 rounded-2xl shadow-md border border-border flex flex-col gap-2'
          >
            <div className='flex items-center gap-2'>
              {info.icon}
              <h2 className='font-semibold text-lg text-gray-900'>{info.label}</h2>
            </div>
            <p className={info.className || "text-gray-600"}>{info.value}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
