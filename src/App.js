import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AllTransactions from "./pages/AllTransactions";
import Homepage from "./pages/Homepage";
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/t" element={<AllTransactions />} />
            </Routes>
        </div>
    );
}

export default App;
