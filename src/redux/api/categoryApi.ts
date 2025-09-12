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
    updateCategory: build.mutation({
      query: ({ id, ...payload }) => ({
        url: `${BASE_URL}/${id}/`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
