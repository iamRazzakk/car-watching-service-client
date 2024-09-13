import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
    user:null | object,
    token: null | string
}
const initialState: TAuthState = {
    user:null ,
    token: null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload
        },
        logOut:(state)=>{
            state.user = null
            state.token = null
        }
        
    }
})

export const {setUser, logOut}= authSlice.actions
export default authSlice.reducer