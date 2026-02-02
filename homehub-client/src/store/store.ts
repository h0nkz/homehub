import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import errandReducer from '../features/errand/errandSlice'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        errand: errandReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store