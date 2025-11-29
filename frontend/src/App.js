import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import Register from "./components/Register";
import {AddTransaction} from "./components/AddTransaction";
import Report from "./pages/Report";
import Transaction from "./components/Transaction";
import Header from "./components/Header";
import EditTransaction from "./components/EditTransaction";
import Home from "./pages/Home";
import Profile from "./pages/Profiles";
import OpenRoute from "./components/OpenRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/register" element={<OpenRoute><Register /></OpenRoute>} />

        {/* Protected Route */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add-transaction" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Report /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
        <Route path="/edit-transaction/:id" element={<ProtectedRoute><EditTransaction /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        {/* Page Not Found */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;