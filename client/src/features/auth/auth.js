import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice ({
    name: 'auth',
    initialState: {token: null},
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logout: (state, action) => {
            state.token = null
        },
    }
})

export const { setCredentials, logout } = auth.actions
export default auth.reducer
export const selectCurrentToken = (state) => state.auth.token

