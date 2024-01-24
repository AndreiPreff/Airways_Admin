import { RootState } from 'store';

export const selectChatMessages = (state: RootState) => state.chat.messages;
export const selectChatPending = (state: RootState) => state.chat.pending;
export const selectChatError = (state: RootState) => state.chat.error;
export const userProfileSelector = (state: RootState) => state.chat.user; 
export const authGetUserProfileErrorSelector = (state: RootState) => state.chat.errors?.getUserProfile;
// export const authGetUserProfilePendingSelector = (state: RootState) => state.chat.pending?.getUserProfile ?? false;
