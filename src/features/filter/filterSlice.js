import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    isError: false,
    fType: 'all',
    fSearch: '',
    fPage: 1,
};


//async thunk   


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterType: (state, action) => {
            state.fType = action.payload;
        },
        filterSearch: (state, action) => {
            state.fSearch = action.payload;
        },
        filterPage: (state, action) => {
            state.fPage = action.payload;
        }
    },
});

export default filterSlice.reducer;
export const { filterType, filterSearch, filterPage } = filterSlice.actions;