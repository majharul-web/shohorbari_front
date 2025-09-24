import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BASE_URL = "/payments";

export const commonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReviews: build.query({
      query: () => {
        return {
          url: `/all-reviews/`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.reviews, tagTypes.ads],
    }),
    // getAllUserPayments: build.query({
    //   query: () => {
    //     return {
    //       url: `/my-payments/`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: [tagTypes.payments],
    // }),
    // initiatePayment: build.mutation({
    //   query: (data) => ({
    //     url: "/payment/initiate/",
    //     method: "POST",
    //     data: {
    //       amount: data.amount,
    //       order_id: data.order_id,
    //     },
    //   }),
    //   invalidatesTags: [tagTypes.payments],
    // }),
  }),
});

export const { useGetAllReviewsQuery } = commonApi;
