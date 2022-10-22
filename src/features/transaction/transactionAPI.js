import axiosInstance from "../../utils/axios";

export const getTransactions = async  () => {
    const response = await axiosInstance.get('/transactions');
    return response.data;
}

export const addTransaction = async  (data) => {
    const response = await axiosInstance.post('/transaction',data);
    return response.data;
}

export const editTransaction = async  (id,data) => {
    const response = await axiosInstance.put(`/transaction/${id}`,data);
    return response.data;
}

export const deleteTransaction = async  (id) => {
    const response = await axiosInstance.delete(`/transaction/${id}`);
    return response.data;
}