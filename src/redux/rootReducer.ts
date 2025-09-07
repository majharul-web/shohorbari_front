import { baseApi } from "./api/baseApi";
import authReducer from "./slice/authSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
};
