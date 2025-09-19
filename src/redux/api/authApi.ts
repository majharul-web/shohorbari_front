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
    resendActivation: build.mutation({
      query: (payload) => ({
        url: `${AUTH_URL}/users/resend_activation/`,
        method: "POST",
        data: payload,
      }),
    }),
    resetPasswordEmail: build.mutation({
      query: (payload) => ({
        url: `${AUTH_URL}/users/reset_password/`,
        method: "POST",
        data: payload,
      }),
    }),
    resetPasswordConfirm: build.mutation({
      query: (payload) => ({
        url: `${AUTH_URL}/users/reset_password_confirm/`,
        method: "POST",
        data: payload,
      }),
    }),
    changePassword: build.mutation({
      query: (payload) => ({
        url: `${AUTH_URL}/users/set_password/`,
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useUserLoginMutation,
  useGetUserByTokenQuery,
  useActivateAccountMutation,
  useResendActivationMutation,
  useUserLogoutMutation,
  useResetPasswordEmailMutation,
  useResetPasswordConfirmMutation,
  useChangePasswordMutation,
} = authApi;
