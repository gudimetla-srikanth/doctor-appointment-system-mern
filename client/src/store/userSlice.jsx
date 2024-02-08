import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: {},
        doctor: {},
        renderval: true
    },
    reducers: {
        userData: (state, action) => {
            state.user = action.payload
        },
        doctorData: (state, action) => {
            state.doctor = action.payload
        },
        rendervalchange: (state, action) => {
            state.renderval = action.payload
        }
    }
})

export const { userData, doctorData, rendervalchange } = userSlice.actions

export default userSlice.reducer