import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../features/transaction/transactionSlice';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';
import { filterPage, filterType } from '../features/filter/filterSlice';

const Transactions = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.transaction);
    const { transactions, isLoading, isError, error } = state;
    let { datas } = transactions;
    datas = datas || [];

    useEffect(() => {
        dispatch(filterType("all"))
        dispatch(fetchTransactions({ 'fType': 'all', 'fSearch': '', 'fPage': 0 }));
        dispatch(filterPage(1));
    }, [dispatch, datas.length]);

    let content = null;

    if (isLoading) {
        content = <div className="loading">Loading...</div>
    }
    if (!isLoading && isError) {
        content = <div className="error">{error}</div>
    }
    if (!isLoading && !isError && datas.length > 0) {
        content = datas.slice(0, 5).map((transaction, i) =>
            <Transaction key={i} transaction={transaction} />
        )
    }
    if (!isLoading && !isError && transactions.length === 0) {
        content = <div className="empty">No transactions</div>
    }

    return (
        <div>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>

            <Link to="/t">
                <button style={{
                    backgroundColor: 'rgb(0, 0, 0)',
                    width: '100%',
                    padding: '10px',
                    color: 'white',
                }}>View All</button>
            </Link>
        </div>
    );
};

export default Transactions;