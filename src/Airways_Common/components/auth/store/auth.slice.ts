import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth-state";
import { getUserProfile, resetPassword, signIn, signOut, signUp } from "./auth.actions";


const initialState: AuthState = {
  isAuthorized: false,
  user: null,
  pending: {
    signIn: false,
    signUp: false,
    signOut: false,
    resetPassword: false,
    getUserProfile: false,
  },
  errors: {
    signIn: null,
    signUp: null,
    signOut: null,
    resetPassword: null,
    getUserProfile: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.pending.signIn = true;
        state.errors.signIn = null;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.pending.signIn = false;
        state.isAuthorized = true;
      })
      .addCase(signIn.rejected, (state, action: any & { payload: any }) => {
        state.pending.signIn = false;
        state.errors.signIn = action.payload.error;
      })
      .addCase(signUp.pending, (state) => {
        state.pending.signUp = true;
        state.errors.signUp = null;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.pending.signUp = false;
        state.isAuthorized = true;
      })
      .addCase(signUp.rejected, (state, action: any & { payload: any }) => {
        state.pending.signUp = false;
        state.errors.signUp = action.payload.error;
      })
      .addCase(signOut.pending, (state) => {
        state.pending.signOut = true;
        state.errors.signOut = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.pending.signOut = false;
        state.isAuthorized = false;
      })
      .addCase(signOut.rejected, (state, action: any & { payload: any }) => {
        state.pending.signOut = false;
        state.errors.signOut = action.payload.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.pending.resetPassword = true;
        state.errors.resetPassword = null;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.pending.resetPassword = false;
      })
      .addCase(
        resetPassword.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.resetPassword = false;
          state.errors.resetPassword = action.payload.error;
        }
      )
      .addCase(getUserProfile.pending, (state) => {
        state.pending.getUserProfile = true;
        state.errors.getUserProfile = null;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.pending.getUserProfile = false;
        state.user = payload;
      })
      .addCase(
        getUserProfile.rejected,
        (state, action: any & { payload: any }) => {
          state.pending.getUserProfile = false;
          state.errors.getUserProfile = action.payload.error;
        }
      );
  },
});
export const { resetUser } = authSlice.actions;