import React, { useState } from 'react';

const Form = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();
    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter title"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === 'income'}
                            onChange={(e) => setType('income')}
                        />
                        <label f>Income</label>
                    </div>
                    <div className="radio_group">
                        <input type="radio"
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

                <button className="btn" type='submit'>Add Transaction</button>

                <button className="btn cancel_edit">Cancel Edit</button>
            </form>
        </div>
    );
};

export default Form;