import { Button } from "@/components/ui/button";
import { useInitiatePaymentMutation } from "@/redux/api/paymentsApi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SkeletonInitiatePayment from "./SkeletonInitiatePayment";

const InitiatePaymentPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const amount = params.get("amount");
  const orderId = params.get("orderId");

  const [error, setError] = useState<string | null>(null);
  const [initiatePayment, { isLoading, isSuccess, isError }] = useInitiatePaymentMutation();

  const handlePayment = async () => {
    if (!amount || !orderId) {
      setError("Invalid payment details. Please try again.");
      return;
    }

    try {
      setError(null);
      const res = await initiatePayment({
        amount: Number(amount),
        order_id: Number(orderId),
      }).unwrap();
      if (res && res.payment_url) {
        window.location.href = res.payment_url; // Redirect to payment gateway
      } else {
        setError("Failed to get payment URL. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Payment initiation failed. Please try again.");
    }
  };

  useEffect(() => {
    if (amount && orderId) {
      handlePayment();
    }
  }, [amount, orderId]);

  if (isLoading) return <SkeletonInitiatePayment />;

  return (
    <div className='max-w-lg mx-auto mt-16 p-6 bg-white rounded-2xl shadow-md text-center'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Initiate Payment</h1>

      {error && <p className='mb-3 text-red-600 font-medium bg-red-50 p-2 rounded'>{error}</p>}

      {!isSuccess ? (
        <>
          <p className='text-gray-600 mb-2'>
            Amount: <span className='font-semibold'>{amount}</span>
          </p>
          <p className='text-gray-600 mb-6'>
            Order ID: <span className='font-semibold'>{orderId}</span>
          </p>

          <Button onClick={handlePayment} disabled={isLoading} className='w-full ' loading={isLoading}>
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </>
      ) : (
        <p className='text-green-600 font-semibold text-lg'>
          ✅ Payment initiated successfully! Redirecting...
        </p>
      )}
    </div>
  );
};

export default InitiatePaymentPage;
