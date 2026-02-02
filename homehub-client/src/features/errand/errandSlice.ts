import { createSlice } from "@reduxjs/toolkit"

interface ErrandState {
    errands: ScoutingErrand[]
}

interface ScoutingErrand {
    location: string
    objective: string
    interval: number
    active: boolean
    created: Date
}

const initialState: ErrandState = {
    errands: []
}

export const errandSlice = createSlice({
    name: 'errand',
    initialState,
    reducers: {
        
    }
})

export const {} = errandSlice.actions

export default errandSlice.reducer