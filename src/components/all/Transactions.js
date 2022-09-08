import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../features/transaction/transactionSlice';
import Transaction from '../Transaction';

const Transactions = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.transaction);
    const filter = useSelector(state => state.filter);
    const { transactions, isLoading, isError, error } = state;
    const { fType, fSearch, fPage } = filter;

    useEffect(() => {
        dispatch(fetchTransactions({ fType, fSearch, fPage }));
    }, [dispatch, fType, fSearch, fPage]);

    let content = null;

    if (isLoading) {
        content = <div className="loading">Loading...</div>
    }
    if (!isLoading && isError) {
        content = <div className="error">{error}</div>
    }
    if (!isLoading && !isError && transactions.length > 0) {
        content = transactions.map((transaction, i) =>
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
        </div>
    );
};

export default Transactions;