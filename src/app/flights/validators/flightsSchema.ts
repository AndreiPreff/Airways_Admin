import * as yup from 'yup';

export const flightschema = yup.object().shape({
    departureCity: yup.string().required('Departure City is required'),
    arrivalCity: yup.string().required('Arrival City is required'),
    departureDate: yup.string().required('Departure Date is required'),
    returnDate: yup.string().when('roundTrip', {
      is: true,
      then: yup.string().required('Return Date is required'),
    }),
    passengerCount: yup
      .number()
      .required('Passenger Count is required')
      .min(0, 'Passenger Count must be at least 0')
      .integer('Passenger Count must be an integer'),
    transfers: yup.number().required('Transfers is required').min(0, 'Transfers must be at least 0').integer('Transfers must be an integer'),
  });