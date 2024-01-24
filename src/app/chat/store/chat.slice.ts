import { createSlice } from "@reduxjs/toolkit";
import { fetchHistory, getUserProfile } from "./chat.actions";

interface ChatState {
  messages: any;
  user: any;
  pending: boolean;
  error: string | null;
  errors: {
    getUserProfile: string | null;
  };
}

const initialState: ChatState = {
  messages: null,
  user: null,
  pending: false,
  error: null,
  errors: {
    getUserProfile: null,
  },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.messages = payload;
      })
      .addCase(fetchHistory.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.error = action.payload.error;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.pending = true; // Исправил здесь
        state.errors.getUserProfile = null;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.pending = false; // Исправил здесь
        state.user = payload;
      })
      .addCase(
        getUserProfile.rejected,
        (state, action: any & { payload: any }) => {
          state.pending = false; // Исправил здесь
          state.errors.getUserProfile = action.payload.error;
        }
      );
  },
});

export default chatSlice.reducer;
