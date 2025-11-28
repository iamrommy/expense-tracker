import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import Register from "./components/Register";
import Home from "./pages/Home";
import {AddTransaction} from "./components/AddTransaction";
import Report from "./pages/Report";
import Transaction from "./components/Transaction";
import Header from "./components/Hearder";
import EditTransaction from "./components/EditTransaction";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} />
        {/* Page Not Found */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
