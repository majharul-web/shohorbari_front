import Cookies from "js-cookie";

export const setToCookie = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  // expires will remove after refresh token
  Cookies.set(key, token);
};

export const getFromCookie = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return Cookies.get(key);
};
export const removeFromCookie = (key: string) => {
  return Cookies.remove(key);
};
