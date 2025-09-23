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
  }),
});

export const { useGetAllPaymentsQuery, useGetAllUserPaymentsQuery } = PaymentsApi;
