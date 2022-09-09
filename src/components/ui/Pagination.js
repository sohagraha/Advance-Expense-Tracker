import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterPage } from '../../features/filter/filterSlice';

const Pagination = () => {
    const { transactions } = useSelector((state) => state.transaction);
    const { fPage } = useSelector((state) => state.filter);
    const { totals } = transactions;
    const dispatch = useDispatch();
    const totalPageLength = Math.ceil(totals / 10);
    const range = [];
    for (let i = 1; i <= totalPageLength; i++) {
        range.push(i);
    }

    const handlePage = (page) => {
        dispatch(filterPage(page));
    };
    return (
        <div>
            {
                range.map((page, i) => (
                    (fPage === page) ?
                        <button
                            style={{
                                backgroundColor: 'green',
                                padding: '12px',
                                color: 'white',
                                margin: '5px',
                                borderRadius: '5px',
                            }}
                            key={i} onClick={() => handlePage(page)}>{page}</button> :
                        <button
                            style={{
                                backgroundColor: 'darkblue',
                                padding: '10px',
                                color: 'white',
                                margin: '5px',
                                borderRadius: '5px',
                            }}
                            key={i} onClick={() => handlePage(page)}>{page}</button>
                ))
            }
        </div>
    );
};

export default Pagination;