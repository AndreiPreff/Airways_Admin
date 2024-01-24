import { createAsyncThunk } from '@reduxjs/toolkit';
import repository from 'Airways_Common/components/repository';
import axios from 'axios';
import { ErrorResponse } from 'react-router-dom';

export const fetchHistory = createAsyncThunk(
  'chat/fetchHistory',
  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5001/chat/${roomId}`);

      if (response.status !== 200) {
        throw new Error('Failed to fetch message history');
      }

      return response.data;
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "GET/users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await repository.get("users/profile");
      return response.data;
      
    } catch (error) {
      const errorMessage = (error as ErrorResponse)?.data.message;
      return rejectWithValue({ error: errorMessage });
    }
  }
);




 
