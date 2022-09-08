import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransaction, editActive, removeTransaction } from '../features/transaction/transactionSlice';

const Form = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector(state => state.transaction);
    const { isLoading, isError } = state;

    const editing = useSelector(state => state?.transaction?.editing);

    useEffect(() => {
        const { id, name, type, amount } = editing || {};
        if (id) {
            setName(name);
            setType(type);
            setAmount(amount);
            setEditMode(true);
        }
        else {
            reset();
        }
    }, [editing]);

    const reset = () => {
        setName('');
        setType('');
        setAmount('');
    }

    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(createTransaction(
            {
                name,
                type,
                amount: parseInt(amount)
            }
        ))
        reset();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(changeTransaction(
            {
                id: editing.id,
                data: {
                    name,
                    type,
                    amount: parseInt(amount)
                }
            }
        ))
        setEditMode(false);
        reset();
    }


    const changeEditMode = () => {
        dispatch(editActive({}))
        setEditMode(false);
        reset();
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>
            <form onSubmit={editMode ? handleUpdate : handleCreate}>
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

                <button disabled={isLoading} className="btn" type='submit'>
                    {
                        editMode ? 'Update Transaction' : 'Add Transaction'
                    }
                </button>
                {
                    isError ? <p className="error">There is an error</p> : null
                }
            </form>
            {
                editMode ? <button className="btn cancel_edit" onClick={changeEditMode}>Cancel Edit</button> : null
            }
        </div>
    );
};

export default Form;