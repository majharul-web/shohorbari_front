import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActivateAccountMutation } from "@/redux/api/authApi";
import { isSuccess } from "@/utils/common";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ActivateAccount: React.FC = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [activateAccount] = useActivateAccountMutation();

  const [isSuccessFull, setIsSuccessFull] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const activate = async () => {
      if (!uid || !token) {
        setIsSuccessFull(false);
        setMessage("Invalid activation link.");
        return;
      }

      try {
        const res: any = await activateAccount({ uid, token }).unwrap();
        if (isSuccess(res.status)) {
          setIsSuccessFull(true);
          setMessage("Your account has been successfully activated. You can now log in.");
        } else {
          setIsSuccessFull(false);
          setMessage(res.message || "Activation failed. Link may have expired.");
        }
      } catch (err: any) {
        setIsSuccessFull(false);
        setMessage(err?.data?.detail || err?.data?.token?.[0] || "Something went wrong during activation.");
      }
    };

    activate();
  }, [uid, token, activateAccount]);

  return (
    <div className='min-h-[calc(100vh-10rem)] flex flex-col-reverse md:flex-row items-center px-4 py-10 md:py-0 gap-10 bg-background'>
      {/* Left Image Section with animation */}
      <motion.div
        className='flex-1'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src='/email_activation.png' alt='Account Activation' className='mw-fit h-auto' />
      </motion.div>

      {/* Activation Card with animation */}
      <motion.div
        className='flex-1 w-full max-w-md'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className='border border-border shadow-xl rounded-2xl bg-card'>
          <CardHeader className='text-center'>
            <motion.div
              className='flex justify-center mb-4'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isSuccessFull ? (
                <CheckCircle2 className='h-16 w-16 text-green-600 animate-bounce' />
              ) : (
                <XCircle className='h-16 w-16 text-destructive animate-pulse' />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CardTitle
                className={`text-2xl font-bold ${isSuccessFull ? "text-green-600" : "text-destructive"}`}
              >
                {isSuccessFull ? "Account Activated!" : "Activation Failed"}
              </CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent className='text-center space-y-6 px-6'>
            <motion.p
              className='text-muted-foreground text-sm md:text-base'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {message}
            </motion.p>

            <motion.div
              className='flex flex-col md:flex-row gap-3 md:gap-4 justify-center'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {isSuccessFull ? (
                <Link to='/login' className='flex-1'>
                  <Button className='w-full font-semibold'>Go to Login</Button>
                </Link>
              ) : (
                <Link to='/resend-activation' className='flex-1'>
                  <Button variant='outline' className='w-full font-semibold'>
                    Resend Activation Link
                  </Button>
                </Link>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ActivateAccount;
