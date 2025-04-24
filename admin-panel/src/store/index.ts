import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {}, // подключим редьюсеры позже
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();