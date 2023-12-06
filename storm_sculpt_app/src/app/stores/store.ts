import WeatherDetailsReducer from '../api/apiSlice2';
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';


export const store = configureStore({
  reducer: {
    WeatherDetails: WeatherDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
