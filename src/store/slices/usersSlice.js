import {createSlice} from '@reduxjs/toolkit'

export const initialState = {
    email: null,
    token: null,
    id: null,
};

const userSlaice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        
        removeUser(state){
            state.email = null;
            state.token = null;
            state.id = null;

        }
    }
});


export const {setUser, removeUser} = userSlaice.actions;

export default userSlaice.reducer;