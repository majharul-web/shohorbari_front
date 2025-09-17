import { userLoggedIn } from "../slice/authSlice";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

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
    getUserByToken: build.query({
      query: () => {
        return {
          url: `/auth/users/me`,
          method: "GET",
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result: Record<string, any> = await queryFulfilled;

          const userData = {
            id: result?.data?.id,
            name: result?.data?.first_name + " " + result?.data?.last_name,
            email: result?.data?.email,
            phone: result?.data?.phone_number,
            photo: result?.data?.profile_image,
            isActive: result?.data?.is_active,
            role: result?.data?.role,
            address: result?.data?.address,
          };

          dispatch(userLoggedIn(userData));
        } catch (err) {
          // dispatch(userLoggedOut())
        }
      },
    }),

    activateAccount: build.mutation({
      query: (payload) => ({
        url: `${AUTH_URL}/users/activation/`,
        method: "POST",
        data: payload,
      }),
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
  useGetUserByTokenQuery,
  useActivateAccountMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyResetPasswordTokenQuery,
  useUserLogoutMutation,

  useResetPasswordRequestMutation,
} = authApi;
