import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    return (
        <div className="App">
            <div className="header">
                <h1>Expense Tracker</h1>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '10px',
            }}>
                <Link to="/">
                    <button style={{
                        padding: '5px 10px',
                        backgroundColor: 'rgb(0, 0, 0)',
                        color: 'white',
                        borderRadius: '5px',
                    }}>
                        Home
                    </button>
                </Link>
                <Link to="/transactions">
                    <button style={{
                        padding: '5px 10px',
                        backgroundColor: 'rgb(0, 0, 0)',
                        color: 'white',
                        borderRadius: '5px',
                    }}>
                        All Transaction
                    </button>
                </Link>
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