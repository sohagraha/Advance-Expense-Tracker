import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Transactions from "./components/Transactions";

function App() {
    return (
        <div className="App">
            <Layout>
                <Balance />
                <Form />
                <Transactions />
            </Layout>
        </div>
    );
}

export default App;
