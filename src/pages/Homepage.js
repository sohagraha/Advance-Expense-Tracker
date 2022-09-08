import React from 'react';
import Balance from '../components/Balance';
import Form from '../components/Form';
import Layout from '../components/Layout';
import Transactions from '../components/Transactions';

const Homepage = () => {
    return (
        <>
            <Layout>
                <Balance />
                <Form />
                <Transactions />
            </Layout>
        </>
    );
};

export default Homepage;