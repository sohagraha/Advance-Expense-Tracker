import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction } from '../features/transaction/transactionSlice';

const Form = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();
    const state = useSelector(state => state.transaction);
    const { isLoading, isError } = state;

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(createTransaction(
            {
                name,
                type,
                amount: parseInt(amount)
            }
        ))
    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input required type="text" name="name" placeholder="Enter title"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
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

                <div className="form-group">
                    <label>Amount</label>
                    <input type="text" name="amount" placeholder="Enter Amount"
                        value={amount} onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} className="btn" type='submit'>Add Transaction</button>
                {
                    isError ? <p className="error">There is an error</p> : null
                }
            </form>
            <button className="btn cancel_edit">Cancel Edit</button>
        </div>
    );
};

export default Form;