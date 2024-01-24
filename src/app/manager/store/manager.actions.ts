import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from 'Airways_Common/components/repository';
import { ErrorResponse } from 'types/error.type';


export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userEmail: string) => {
    const response = await repository.post('/orders/getUserOrders', { email: userEmail });
    return response.data;
  }
);


export const updateOrderStatus = createAsyncThunk(
  'PATCH/orders/cancelOrder',
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await repository.patch(`/orders/${orderId}`, { status: 'CANCELLED' });
      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.response?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);



