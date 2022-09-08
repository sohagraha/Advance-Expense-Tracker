import axiosInstance from "../../utils/axios/axios";

export const getTransactions = async (fType, fSearch, fPage) => {
    let query = '?_sort=id&_order=desc';
    if (fType !== 'all') {
        query = query + `&type=${fType}`;
    }
    if (fSearch !== '') {
        query = query + `&q=${fSearch}`;
    }
    if (fPage) {
        query += `&_limit=4&_page=${fPage}`;
    }
    const response = await axiosInstance.get(`/transactions${query}`);
    return response.data;
}

export const addTransaction = async (data) => {
    const response = await axiosInstance.post('/transactions', data);
    return response.data;
}

export const editTransaction = async (id, data) => {
    const response = await axiosInstance.put(`/transactions/${id}`, data);
    return response.data;
}

export const deleteTransaction = async (id) => {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response.data;
}