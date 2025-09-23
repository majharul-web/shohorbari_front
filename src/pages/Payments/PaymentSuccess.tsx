import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-10rem)] px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full max-w-md'
      >
        <Card className='border-2 border-dashed border-green-500/40 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm'>
          <CardContent className='flex flex-col items-center justify-center text-center py-12 px-6'>
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <CheckCircle2 className='w-14 h-14 text-green-600 mb-4' />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className='text-2xl font-bold text-green-600'
            >
              Payment Successful 🎉
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className='text-sm text-muted-foreground mt-2 max-w-sm'
            >
              Thank you! Your payment has been processed successfully. A confirmation email has been sent to
              your inbox.
            </motion.p>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className='mt-6'
            >
              <Button onClick={() => navigate("/my-orders")} className='bg-green-600 hover:bg-green-700'>
                Continue to My Orders
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
