import axiosInstance from "../../utils/axios/axios";

export const getTransactions = async (fType, fSearch, fPage) => {
    let query = '?_sort=id&_order=desc';

    if (fType !== 'all') {
        query = query + `&type=${fType}`;
    }
    if (fSearch !== '') {
        query = query + `&name_like=${fSearch}`;
    }
    if (fPage !== 0) {
        query = query + `&_page=${fPage}&_limit=10`;
    }
    const response = await axiosInstance.get(`/transactions${query}`);
    const datas = response.data || [];
    const totals = response.headers["x-total-count"] || response.data.length;
    const res = { totals, datas }
    return res;
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