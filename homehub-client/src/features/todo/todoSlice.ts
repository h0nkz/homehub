import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

interface TodoState {
    items: TodoItem[]
}

interface TodoItem {
    todo: string
    priority: number
    due: Date
    done: boolean
    id: string;
}

const initialState: TodoState = {
    items: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        toggle: (state, action: PayloadAction<TodoItem>) => {
            
            state.items.forEach(i => {
                if(i.id == action.payload.id)
                {
                    i.done = !i.done
                }
            })
        }
    }
})

export const { toggle } = todoSlice.actions

export const selectTodo = (state: RootState) => state.todo.items

export default todoSlice.reducer