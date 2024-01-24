import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "Airways_Common/components/auth/store/auth.slice";
import { adminSlice } from "app/admin/store/admin.slice";
import { chatSlice } from "app/chat/store/chat.slice";
import { flightsSlice } from "app/flights/store/flights.slice";
import { managerSlice } from "app/manager/store/manager.slice";


const store = configureStore({
  reducer: {
   
    auth: authSlice.reducer,
    flights: flightsSlice.reducer,
    admin: adminSlice.reducer,
    manager:managerSlice.reducer,
    chat:chatSlice.reducer,

  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
