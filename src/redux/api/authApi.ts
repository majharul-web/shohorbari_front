import { userLoggedIn } from "../slice/authSlice";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";
const VERIFY_URL = "v1/users";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (userData) => ({
        url: `${AUTH_URL}/users/`,
        method: "POST",
        data: userData,
      }),
    }),

    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/jwt/create/`,
        method: "POST",
        data: loginData,
      }),
    }),
    userLogout: build.mutation({
      query: (logoutData) => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        dta: logoutData,
      }),
    }),
    verifyToken: build.query({
      query: () => {
        return {
          url: `${VERIFY_URL}/profile`,
          method: "GET",
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result: Record<string, any> = await queryFulfilled;
          const userData = {
            id: result?.data?.ID,
            name: result?.data?.Name,
            email: result?.data?.Email,
            phone: result?.data?.Phone,
            photo: result?.data?.Photo,
            status: result?.data?.Status,
            role: result?.data?.Role,
            departmentId: result?.data?.DepartmentID,
            address: result?.data?.Address,
            createdAt: result?.data?.CreatedAt,
            department: result?.data?.Department,
          };
          dispatch(userLoggedIn(userData));
        } catch (err) {
          // dispatch(userLoggedOut())
        }
      },
    }),
    getPermissions: build.query({
      query: () => {
        return {
          url: `${VERIFY_URL}/permission`,
          method: "GET",
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result: Record<string, any> = await queryFulfilled;
          const permissionData = result?.data?.data;
        } catch (err) {
          // dispatch(userLoggedOut())
        }
      },
      providesTags: [],
    }),
    verifyResetPasswordToken: build.query({
      query: (payload) => {
        return {
          url: `${AUTH_URL}/verify-password-reset-token`,
          method: "GET",
          params: payload,
        };
      },
    }),

    resetPassword: build.mutation({
      query: (resetPasswordPayload) => ({
        url: `${AUTH_URL}/password-reset`,
        method: "POST",
        data: resetPasswordPayload,
      }),
    }),
    forgotPassword: build.mutation({
      query: (forgotPasswordPayload) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        data: forgotPasswordPayload,
      }),
    }),
    resetPasswordRequest: build.mutation({
      query: (forgotPasswordPayload) => ({
        url: `${AUTH_URL}/reset-password-request`,
        method: "POST",
        data: forgotPasswordPayload,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUserLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyTokenQuery,
  useVerifyResetPasswordTokenQuery,
  useUserLogoutMutation,
  useGetPermissionsQuery,
  useResetPasswordRequestMutation,
} = authApi;
