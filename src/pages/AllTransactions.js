import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Transactions from '../components/all/Transactions';
import Layout from '../components/Layout';
import { filterSearch, filterType } from '../features/filter/filterSlice';
import { fetchTransactions } from '../features/transaction/transactionSlice';

const AllTransactions = () => {
    const { fType, fPage } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [type, setType] = useState('all');

    useEffect(() => {
        dispatch(filterType(type));
        dispatch(filterSearch(search))
    }, [dispatch, type, search])


    const handleChange = (e) => {
        setSearch((e.target.value));
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        }
    }
    useEffect(() => {
        dispatch(fetchTransactions({ fType, 'fSearch': search, fPage }));
    }, [search, dispatch, fType, fPage]);
    return (
        <>
            <Layout>
                <h1>All Transactions</h1>
                <div className="radio" style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '10px',
                    backgroundColor: 'skyblue',
                    color: 'black',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="all"
                            name="type"
                            checked={type === 'all'}
                            onChange={(e) => setType('all')}
                        />
                        <label>all</label>
                    </div>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === 'income'}
                            onChange={(e) => setType('income')}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input type="radio"
                            required
                            value="expense"
                            name="type"
                            checked={type === 'expense'}
                            onChange={(e) => setType('expense')}
                        />
                        <label >Expense</label>
                    </div>
                </div>
                <div>
                    search :
                    <input style={{
                        marginTop: '10px',
                        marginLeft: '10px',
                    }} type="text"
                        onChange={debounce(handleChange, 800)}
                    />
                </div>
                <Transactions />
            </Layout>
        </>
    );
};

export default AllTransactions;