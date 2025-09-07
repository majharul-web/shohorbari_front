import type { UserPayloadObject } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: null | number;
  userName: string;
  userEmail: null | string;
  avatar: null | string;
  role: Record<string, any>;
  departmentId: null | number;
  department: Record<string, any>;
  phone: number | string;
  address: string;
  createdAt: string;
  status: string;
}

const initialState: AuthState = {
  userId: null,
  userName: "",
  userEmail: "",
  avatar: "",
  role: {},
  departmentId: null,
  department: {},
  phone: "",
  address: "",
  createdAt: "",
  status: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userId = action.payload.id;
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      state.avatar = action.payload.photo;
      state.role = action.payload.role as unknown as Record<string, any>;
      state.departmentId = action.payload.departmentId;
      state.department = action.payload.department as unknown as Record<string, any>;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.createdAt = action.payload.createdAt;
      state.status = action.payload.status;
    },
    userLoggedOut: (state) => {
      state.userId = null;
      state.userName = "";
      state.userEmail = "";
      state.avatar = "";
      state.role = {};
      state.department = {};
      state.departmentId = null;
      state.phone = "";
      state.address = "";
      state.createdAt = "";
      state.status = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
