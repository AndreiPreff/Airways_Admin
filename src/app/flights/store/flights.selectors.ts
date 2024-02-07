import { RootState } from 'store';

export const selectAvailableTickets = (state: RootState) => state.flights.availableTickets?.data;
export const selectFlightsPending = (state: RootState) => state.flights.pending;
export const selectFlightsError = (state: RootState) => state.flights.error;
export const selectFlightsPassengerCount = (state: RootState) => state.flights.passengerCount;
