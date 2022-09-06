import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTransactions, addTransaction, deleteTransaction, editTransaction } from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    error: null,
    isError: false,
};


//async thunk   

const fetchTransactions = createAsyncThunk(
    'transaction/fetchTransactions',
    async () => {
        const response = await getTransactions();
        return response;
    }
);

const changeTransaction = createAsyncThunk(
    'transaction/editTransaction',
    async ({ id, data }) => {
        const response = await editTransaction(id, data);
        return response;
    }
);

const createTransaction = createAsyncThunk(
    'transaction/addTransaction',
    async (data) => {
        const response = await addTransaction(data);
        return response;
    }
);

const removeTransaction = createAsyncThunk(
    'transaction/deleteTransaction',
    async (id) => {
        const response = await deleteTransaction(id);
        return response;
    }
);

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }
        );
        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions = action.payload;
        }
        );
        builder.addCase(fetchTransactions.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
            state.transactions = [];
        }
        );
        builder.addCase(changeTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }
        );
        builder.addCase(changeTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions = state.transactions.map(transaction => transaction.id === action.payload.id ? action.payload : transaction);
        }
        );
        builder.addCase(changeTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        }
        );
        builder.addCase(createTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }
        );
        builder.addCase(createTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions.push(action.payload);
        }
        );
        builder.addCase(createTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        }
        );
        builder.addCase(removeTransaction.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }
        );
        builder.addCase(removeTransaction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.transactions = state.transactions.filter(transaction => transaction.id !== action.payload.id);
        }
        );
        builder.addCase(removeTransaction.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error?.message;
        }
        );

    }
});

export default transactionSlice.reducer;