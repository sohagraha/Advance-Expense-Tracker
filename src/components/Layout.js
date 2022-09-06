import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../features/transaction/transactionSlice';

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);
    return (
        <div className="App">
            <div className="header">
                <h1>Expense Tracker</h1>
            </div>

            <div className="main">
                <div className="container">
                    {children}
                </div>
            </div>

            <div className="footer">&copy;Sohag Raha</div>
        </div>
    );
};

export default Layout;