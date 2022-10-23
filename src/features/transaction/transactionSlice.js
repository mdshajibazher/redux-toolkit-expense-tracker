import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTransaction, editTransaction, getTransactions,deleteTransaction} from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: "",
}

export const fetchTransactions = createAsyncThunk('transaction/fetchTransactions', async () => {
    return await getTransactions();
});

export const createTransaction = createAsyncThunk('transaction/createTransaction',async (data)=> {
    return await addTransaction(data)
});

export const changeTransaction = createAsyncThunk('transaction/changeTransaction',async (id,data) => {
    return await editTransaction(id,data);
});

export const removeTransaction =  createAsyncThunk('transaction/removeTransaction', async (id) => {
   return await deleteTransaction(id);
});

//create slice

const transactionSlice = createSlice({
   name: 'transaction',
    initialState,
    extraReducers: (builder) =>  {
       builder
           .addCase(fetchTransactions.pending, (state,action) => {
               state.isError = false;
               state.isLoading = true;
            })

           .addCase(fetchTransactions.fulfilled, (state,action) => {
               state.isError = false;
               state.isLoading = false;
               state.transactions = action.payload;
           })

           .addCase(fetchTransactions.rejected, (state,action) => {
               state.isError = true;
               state.isLoading = false;
               state.error = action?.error?.message;
               state.transactions = [];
           })

            //create


           .addCase(createTransaction.pending, (state,action) => {
               state.isError = false;
               state.isLoading = true;
           })

           .addCase(createTransaction.fulfilled, (state,action) => {
               state.isError = false;
               state.isLoading = false;
               state.transactions.push(action.payload)
           })

           .addCase(createTransaction.rejected, (state,action) => {
               state.isError = true;
               state.isLoading = false;
               state.error = action?.error?.message;
           })


           //edit
           .addCase(changeTransaction.pending, (state,action) => {
               state.isError = false;
               state.isLoading = true;
           })

           .addCase(changeTransaction.fulfilled, (state,action) => {
               state.isError = false;
               state.isLoading = false;
               const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id);
               state.transactions[indexToUpdate] = action.payload;
           })

           .addCase(changeTransaction.rejected, (state,action) => {
               state.isError = true;
               state.isLoading = false;
               state.error = action?.error?.message;
           })



           //delete


           .addCase(removeTransaction.pending, (state,action) => {
               state.isError = false;
               state.isLoading = true;
           })

           .addCase(removeTransaction.fulfilled, (state,action) => {
               state.isError = false;
               state.isLoading = false;
                state.transactions = state.transactions.filter(t => t.id !== action.payload);
           })

           .addCase(removeTransaction.rejected, (state,action) => {
               state.isError = true;
               state.isLoading = false;
               state.error = action?.error?.message;
           })
    }

});


export default transactionSlice.reducer;