import React from 'react';
import { useSelector } from 'react-redux';
import numberWithCommas from '../utils/thousandSeparator/ThousandSeparator';

const Balance = () => {
    let { datas } = useSelector(state => state.transaction.transactions);
    datas = datas || [];
    const total = datas.reduce((acc, transaction) => {
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