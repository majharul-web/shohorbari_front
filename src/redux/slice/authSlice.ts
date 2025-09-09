import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userId: number | null;
  userName: string;
  userEmail: string | null;
  avatar: string | null;
  role: Record<string, any> | null;
  phone: string | number | null;
  address: string | null;
  isActive: boolean | string; // since your API returns is_active as boolean
}

const initialState: AuthState = {
  userId: null,
  userName: "",
  userEmail: null,
  avatar: null,
  role: null,
  phone: null,
  address: null,
  isActive: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        email: string;
        phone: string;
        photo: string;
        isActive: boolean | string;
        role: Record<string, any>;
        address: string;
      }>
    ) => {
      state.userId = action.payload.id;
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      state.avatar = action.payload.photo;
      state.role = action.payload.role;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.isActive = action.payload.isActive;
    },
    userLoggedOut: (state) => {
      Object.assign(state, initialState); // reset cleanly
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
