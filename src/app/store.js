import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transaction/transactionSlice";
import filterReducer from "../features/filter/filterSlice";

export const store = configureStore({
    reducer: {
        transaction: transactionReducer,
        filter: filterReducer,
    },
});
