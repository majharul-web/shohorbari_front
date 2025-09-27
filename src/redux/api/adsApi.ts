import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BASE_URL = "/ads";

export const adsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // requests
    getAllAddRequests: build.query({
      query: (args) => {
        return {
          url: `/my-requests/`,
          method: "GET",
          params: args,
        };
      },
      providesTags: [tagTypes.ads_requests],
    }),

    deleteAdRequest: build.mutation({
      query: (args: Record<string, any>) => ({
        url: `${BASE_URL}/${args.add_id}/requests/${args.id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ads_requests],
    }),
    updateAdsStatus: build.mutation({
      query: (args: Record<string, any>) => ({
        url: `${BASE_URL}/${args.add_id}/requests/${args.id}/change_status/`,
        method: "POST",
        data: { status: args.status },
      }),
      invalidatesTags: [tagTypes.ads_requests],
    }),
    createAdRequest: build.mutation({
      query: ({ add_id, ...rest }: Record<string, any>) => ({
        url: `${BASE_URL}/${add_id}/requests/`,
        method: "POST",
        data: rest,
      }),
      invalidatesTags: [tagTypes.ads_requests],
    }),
    getAdRequest: build.query({
      query: (payload: Record<string, any>) => ({
        url: `${BASE_URL}/${payload.add_id}/requests/`,
        method: "GET",
      }),
      providesTags: [tagTypes.ads_requests],
    }),

    // reviews
    giveReview: build.mutation({
      query: ({ adId, ...payload }) => ({
        url: `${BASE_URL}/${adId}/reviews/`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.ads],
    }),

    getProductReviews: build.query({
      query: (args) => {
        return {
          url: `${BASE_URL}/${args.adId}/reviews/`,
          method: "GET",
          params: args,
        };
      },
      providesTags: [tagTypes.reviews, tagTypes.ads],
    }),

    // ads

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

    approveAd: build.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}/approve/`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.ads],
    }),
    uploadAdditionalImages: build.mutation({
      query: ({ adId, formData }) => ({
        url: `${BASE_URL}/${adId}/images/`,
        method: "POST",
        data: formData,
        contentType: "multipart/form-data",
        // send FormData directly
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
  useUploadAdditionalImagesMutation,
  useGetAllAddRequestsQuery,
  useDeleteAdRequestMutation,
  useUpdateAdsStatusMutation,
  useCreateAdRequestMutation,
  useGetProductReviewsQuery,
  useGetAdRequestQuery,
} = adsApi;
