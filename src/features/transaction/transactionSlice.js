import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions, addTransaction, deleteTransaction, editTransaction } from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    error: null,
    isError: false,
    editActive: {},
};


//async thunk   

export const fetchTransactions = createAsyncThunk(
    'transaction/fetchTransactions',
    async ({ fType, fSearch, fPage }) => {
        const response = await getTransactions(fType, fSearch, fPage);
        return response;
    }
);

export const changeTransaction = createAsyncThunk(
    'transaction/editTransaction',
    async ({ id, data }) => {
        const response = await editTransaction(id, data);
        return response;
    }
);

export const createTransaction = createAsyncThunk(
    'transaction/addTransaction',
    async (data) => {
        const response = await addTransaction(data);
        return response;
    }
);

export const removeTransaction = createAsyncThunk(
    'transaction/deleteTransaction',
    async (id) => {
        const response = await deleteTransaction(id);
        return response;
    }
);

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload;
        },
        editInActive: (state) => {
            state.editing = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }
        ).addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions = action.payload;
        }
        ).addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
            state.transactions = [];
        }
        ).addCase(changeTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }
        ).addCase(changeTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions.datas = state.transactions.datas.map(transaction => transaction.id === action.payload.id ? action.payload : transaction);
        }
        ).addCase(changeTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        }
        ).addCase(createTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }
        ).addCase(createTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions.datas.push(action.payload);
        }
        ).addCase(createTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        }
        ).addCase(removeTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }
        ).addCase(removeTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions.datas = state.transactions.datas.filter(transaction => transaction.id !== action.meta.arg);
        }
        ).addCase(removeTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        }
        );

    }
});

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;