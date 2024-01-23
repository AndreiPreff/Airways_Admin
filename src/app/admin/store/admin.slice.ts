import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, fetchAllUsers, updateUserInfo } from "./admin.actions";


//исправь any

interface AdminState {
  users: any;
  pending: boolean;
  error: string | null;
}

const initialState: AdminState = {
  users: null,
  pending: false,
  error: null,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.users = payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action:  any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.error;
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        state.users = state.users?.map((user: { id: any; }) => (user.id === payload.id ? payload : user));
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.users = state.users?.filter((user: { id: any; }) => user.id !== payload.id);
      });
  },
});

