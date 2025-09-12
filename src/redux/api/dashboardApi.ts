import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BASE_URL = "/dashboard/stats";

export const DashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllStates: build.query({
      query: () => {
        return {
          url: `${BASE_URL}/`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const { useGetAllStatesQuery } = DashboardApi;
