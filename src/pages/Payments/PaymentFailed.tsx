import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-10rem)] px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full max-w-md'
      >
        <Card className='border-2 border-dashed border-destructive/40 shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm'>
          <CardContent className='flex flex-col items-center justify-center text-center py-12 px-6'>
            {/* Icon */}
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <XCircle className='w-14 h-14 text-destructive mb-4' />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className='text-2xl font-bold text-destructive'
            >
              Payment Failed
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className='text-sm text-muted-foreground mt-2 max-w-sm'
            >
              Unfortunately, your payment could not be processed. Please try again or contact support if the
              issue persists.
            </motion.p>

            {/* Retry button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className='mt-6'
            >
              <Button variant='destructive' onClick={() => navigate("/my-requests")}>
                Retry Payment
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
