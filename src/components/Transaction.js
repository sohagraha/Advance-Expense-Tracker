import React from 'react';
import editImage from '../assets/images/edit.svg';
import deleteImage from '../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import { removeTransaction } from '../features/transaction/transactionSlice';
import { editActive } from '../features/transaction/transactionSlice';
import numberWithCommas from '../utils/thousandSeparator/ThousandSeparator';
import { useMatch, useNavigate } from 'react-router-dom';
import { filterType } from '../features/filter/filterSlice';

const Transaction = ({ transaction }) => {
    const dispatch = useDispatch();
    const { name, type, amount, id } = transaction || {};

    const handleDelete = () => {
        dispatch(removeTransaction(id));
    }

    const match = useMatch("/");
    const navigate = useNavigate();

    const handleEdit = () => {
        dispatch(editActive(transaction))
        dispatch(filterType('all'));
        if (!match) {
            navigate("/")
        }
    }

    return (
        <div>
            <li className={`transaction ${type}`}>
                <p>{name}</p>
                <div className="right">
                    <p>৳ {numberWithCommas(parseInt(amount))}</p>
                    <button className="link">
                        <img className='icon' src={editImage} alt="edit" onClick={handleEdit} />
                    </button>
                    <button className="link">
                        <img className='icon' src={deleteImage} alt="" onClick={
                            handleDelete} />
                    </button>
                </div>
            </li>
        </div>
    );
};

export default Transaction;