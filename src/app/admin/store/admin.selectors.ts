import { RootState } from 'store';

export const selectAdminUsers = (state: RootState) => state.admin.users;
export const selectAdminPending = (state: RootState) => state.admin.pending;
export const selectAdminError = (state: RootState) => state.admin.error;
