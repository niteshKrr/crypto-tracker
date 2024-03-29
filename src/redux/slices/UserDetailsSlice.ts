import { createSlice } from '@reduxjs/toolkit'

// Create a slice of state for the users' details
export const UserDetailsSlice = createSlice({
    name: 'userDetails',
    initialState: {
        address: [] as string[],
        chains: [] as string[],
        token:"",
    },
    reducers: {
        setStoreAddress: (state, action:PayloadType) => {
            state.address = action.payload
        },

        setStoreChains: (state, action:PayloadType) => {
            state.chains = action.payload
        },
        setToken:(state, action) =>{
            state.token = action.payload
        }
    },
})

type PayloadType = {
    payload: string[]
}

// Action creators are generated for each case reducer function
export const { setStoreAddress, setStoreChains, setToken } = UserDetailsSlice.actions

// this reducer will be passed in store's 'reducer' key
export default UserDetailsSlice.reducer