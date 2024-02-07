import { RootState } from 'store';

export const selectUserOrders = (state: RootState) => state.manager.orders;
export const selectOrderPending = (state: RootState) => state.manager.pending;
export const selectOrderError = (state: RootState) => state.manager.error;
