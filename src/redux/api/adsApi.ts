import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BASE_URL = "/ads";

export const adsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAd: build.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.ads],
    }),

    getAllAds: build.query({
      query: (args) => {
        return {
          url: `${BASE_URL}/`,
          method: "GET",
          params: args,
        };
      },
      providesTags: [tagTypes.ads],
    }),

    getAdById: build.query({
      query: ({ id }) => ({
        url: `${BASE_URL}/${id}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.ads],
    }),

    updateAd: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `${BASE_URL}/${id}/`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.ads],
    }),
    deleteAd: build.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ads],
    }),
    giveReview: build.mutation({
      query: ({ adId, ...payload }) => ({
        url: `${BASE_URL}/${adId}/reviews/`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.ads],
    }),
    approveAd: build.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}/approve/`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.ads],
    }),
  }),
});

export const {
  useCreateAdMutation,
  useGetAllAdsQuery,
  useDeleteAdMutation,
  useUpdateAdMutation,
  useGetAdByIdQuery,
  useGiveReviewMutation,
  useApproveAdMutation,
} = adsApi;
