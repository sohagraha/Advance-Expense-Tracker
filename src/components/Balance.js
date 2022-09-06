import React from 'react';
import { useSelector } from 'react-redux';
import numberWithCommas from '../utils/thousandSeparator/ThousandSeparator';

const Balance = () => {
    const { transactions } = useSelector(state => state.transaction);
    const total = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            return acc + parseInt(transaction.amount);
        }
        else if (transaction.type === 'expense') {
            return acc - parseInt(transaction.amount);
        }
        return acc;
    }, 0);


    return (
        <div>
            <div className="top_card">
                <p>Your Current Balance</p>
                <h3>
                    <span>৳</span>
                    <span>{
                        numberWithCommas(total)
                    }</span>
                </h3>
            </div>
        </div>
    );
};

export default Balance;