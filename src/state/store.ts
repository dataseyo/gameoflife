import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import gridReducer from './gridSlice'
import configReducer from './configSlice'

const store = configureStore({
    reducer: {
        grid: gridReducer,
        config: configReducer
    }
})

export default store

// store typing
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch

// hooks typing
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector