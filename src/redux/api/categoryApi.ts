import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BASE_URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    getAllCategories: build.query({
      query: () => {
        return {
          url: `${BASE_URL}/`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.category],
    }),
  }),
});

export const { useCreateCategoryMutation, useGetAllCategoriesQuery } = categoryApi;
