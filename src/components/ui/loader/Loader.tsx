import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-40'>
      <Loader2 className='animate-spin text-primary' size={32} />
    </div>
  );
};

export default Loader;
