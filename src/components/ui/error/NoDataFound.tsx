import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const NoDataFound = ({ message }: { message?: string }) => {
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-10rem)]'>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full max-w-md'
      >
        <Card className='border-2 border-dashed border-primary/40 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm'>
          <CardContent className='flex flex-col items-center justify-center text-center py-12 px-6'>
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <AlertCircle className='w-12 h-12 text-primary mb-4' />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className='text-xl font-bold text-foreground'
            >
              No Data Found
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className='text-sm text-muted-foreground mt-2'
            >
              {message || "Sorry, we couldn't find any data to display."}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NoDataFound;
