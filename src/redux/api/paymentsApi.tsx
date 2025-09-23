import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BASE_URL = "/payments";

export const PaymentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPayments: build.query({
      query: () => {
        return {
          url: `${BASE_URL}/`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.payments],
    }),
    getAllUserPayments: build.query({
      query: () => {
        return {
          url: `/my-payments/`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.payments],
    }),
    initiatePayment: build.mutation({
      query: (data) => ({
        url: "/payment/initiate/",
        method: "POST",
        data: {
          amount: data.amount,
          order_id: data.order_id,
        },
      }),
      invalidatesTags: [tagTypes.payments],
    }),

    paymentSuccess: build.mutation({
      query: (data) => {
        return {
          url: `/payment/success/`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.payments],
    }),
    paymentFailed: build.mutation({
      query: (data) => {
        return {
          url: `/payment/fail/`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.payments],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetAllUserPaymentsQuery,
  useInitiatePaymentMutation,
  usePaymentSuccessMutation,
  usePaymentFailedMutation,
} = PaymentsApi;
