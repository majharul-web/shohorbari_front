import { userLoggedOut } from "@/redux/slice/authSlice";
import axios from "axios";
import { authKey } from "../constant/storageKey";
import { instance as axiosInstance } from "../helpers/axios/axiosInstance";
import { getBaseUrl } from "../helpers/config/envConfig";
import type { AppDispatch } from "../redux/store";
import { getFromCookie, removeFromCookie, setToCookie } from "../utils/cookie";

export const logout = (dispatch: AppDispatch, router?: any) => {
  dispatch(userLoggedOut());
  removeFromCookie(authKey);
  removeFromCookie("refreshToken");
  localStorage.clear();
  if (router) router.push("/login");
};

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToCookie(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromCookie(authKey);
  if (authToken) {
    // const decodedData = decodedToken(authToken)
    return authToken;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromCookie(authKey);
  return !!authToken;
};

export const removeUserInfo = () => {
  return removeFromCookie(authKey);
};

// Function to refresh the access token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = getFromCookie("refreshToken");
    const response = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_API}v1/auth/refresh-token`, {
      refreshToken,
    });
    const newAccessToken = response.data.access_token;
    setToCookie(authKey, newAccessToken as string);
    return newAccessToken;
  } catch (error) {
    // Handle refresh token error
    console.error("Error refreshing access token:", error);
    removeFromCookie(authKey);
  }
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
