import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../features/transaction/transactionSlice';
import Transaction from './Transaction';

const Transactions = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.transaction);
    const { transactions, isLoading, isError, error } = state;

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    let content = null;

    if (isLoading) {
        content = <div className="loading">Loading...</div>
    }
    if (!isLoading && isError) {
        content = <div className="error">{error}</div>
    }
    if (!isLoading && !isError && transactions.length > 0) {
        content = transactions.map((transaction) =>
            <Transaction key={transaction.id} transaction={transaction} />
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