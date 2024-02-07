import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserOrders, updateOrderStatus } from './manager.actions';

interface ManagerState {
  orders: any[];
  pending: boolean;
  error: string | null;
}

const initialState: ManagerState = {
  orders: [],
  pending: false,
  error: null,
};



export const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.orders = payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error?.message || 'Error fetching user orders';
      })
      .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
        state.orders = state.orders.map((order) => (order.id === payload.id ? payload : order));
      });
  },
});




