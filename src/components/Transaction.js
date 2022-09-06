import React from 'react';
import editImage from '../assets/images/edit.svg';
import deleteImage from '../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import { removeTransaction } from '../features/transaction/transactionSlice';
import { editActive } from '../features/transaction/transactionSlice';
import numberWithCommas from '../utils/thousandSeparator/ThousandSeparator';

const Transaction = ({ transaction }) => {
    const dispatch = useDispatch();
    const { name, type, amount, id } = transaction || {};

    const handleDelete = () => {
        dispatch(removeTransaction(id));
    }

    const handleEdit = () => {
        dispatch(editActive(transaction))
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