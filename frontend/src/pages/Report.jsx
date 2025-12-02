import React from "react";
import { useSelector } from "react-redux";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { motion } from "framer-motion";

// Register chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Report = () => {
  const { transactions } = useSelector((state) => state.transactions);

  // =============================
  // Extract data
  // =============================
  const expenses = transactions?.filter((t) => t.type === "expense") || [];
  const incomes = transactions?.filter((t) => t.type === "income") || [];

  // =============================
  // Group by category
  // =============================
  const expenseCategoryTotals = expenses.reduce((acc, t) => {
    const cat = t.category || "Other";
    acc[cat] = (acc[cat] || 0) + Number(t.amount);
    return acc;
  }, {});
  const expenseLabels = Object.keys(expenseCategoryTotals);
  const expenseValues = Object.values(expenseCategoryTotals);

  // =============================
  // Group per month
  // =============================
  const monthMap = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
  };

  const monthlyIncome = {};
  const monthlyExpense = {};

  transactions?.forEach((t) => {
    if (!t.date) return;
    const month = monthMap[t.date.slice(5, 7)];

    if (t.type === "income") {
      monthlyIncome[month] = (monthlyIncome[month] || 0) + Number(t.amount);
    } else {
      monthlyExpense[month] = (monthlyExpense[month] || 0) + Number(t.amount);
    }
  });

  const months = Object.keys(monthMap);
  const incomeData = months.map((m) => monthlyIncome[m] || 0);
  const expenseData = months.map((m) => monthlyExpense[m] || 0);

  // =============================
  // Chart data
  // =============================
  const pieChartData = {
    labels: expenseLabels,
    datasets: [
      {
        label: "Expenses",
        data: expenseValues,
        backgroundColor: [
          "#3da1a9",
          "#4899ad",
          "#42b3ba",
          "#2e8f94",
          "#1e6e71",
          "#5f9ea0",
        ],
        borderWidth: 2,
        borderColor: "#0a474a",
      },
    ],
  };

  const barChartData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "cadetblue",
        borderRadius: 7,
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "#ff3b3b",
        borderRadius: 7,
      },
    ],
  };

  // =============================
  // Render UI
  // =============================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={pageContainer}
    >
      {/* HEADER */}
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        style={headerSection}
      >
        <h2 style={headerTitle}>Reports 📊</h2>
        <p style={headerSub}>Visual overview of your expenses and income</p>
      </motion.div>

      {/* PIE CHART */}
      <motion.div style={chartCard} whileHover={{ scale: 1.02 }}>
        <h3 style={chartHeading}>Expense Breakdown</h3>
        <div style={chartContainer}>
          {expenseValues.length > 0 ? (
            <Pie data={pieChartData} />
          ) : (
            <p style={emptyText}>No expense data available.</p>
          )}
        </div>
      </motion.div>
      <div style={{ height: 50 }} />
    </motion.div>
  );
};

// =============================
// UI STYLES
// =============================
const pageContainer = {
  minHeight: "100vh",
  width: "100%",
  background: "linear-gradient(180deg, #000 10%, #031f20 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "40px",
  color: "white",
};

const headerSection = {
  textAlign: "center",
  marginBottom: "20px",
};

const headerTitle = {
  fontSize: "2.7rem",
  fontWeight: 700,
  color: "cadetblue",
  letterSpacing: "1px",
};

const headerSub = {
  marginTop: "6px",
  color: "#8fbfc4",
  fontSize: "20px",
  opacity: 0.8,
};

const chartCard = {
  width: "100%",
  maxWidth: "850px",
  padding: "30px",
  margin: "20px 0",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "18px",
  boxShadow: "0 0 20px rgba(0,0,0,0.45)",
  backdropFilter: "blur(6px)",
  textAlign: "center",
  transition: "all 0.2s ease",
};

const chartHeading = {
  marginBottom: "22px",
  fontSize: "1.35rem",
  fontWeight: 600,
  color: "cadetblue",
  letterSpacing: "0.5px",
};

const chartContainer = {
  maxWidth: "600px",
  margin: "auto",
};

const emptyText = {
  margin: "50px 0",
  color: "gray",
  fontSize: "0.95rem",
};

export default Report;
