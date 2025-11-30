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
  // Dummy data
  const expenseData = {
    labels: ["Food", "Transport", "Shopping", "Entertainment", "Other"],
    datasets: [
      {
        label: "Expenses",
        data: [3000, 1500, 2200, 1800, 900],
        backgroundColor: [
          "#3da1a9", // cadetlike blue palette
          "#4899ad",
          "#42b3ba",
          "#2e8f94",
          "#1e6e71",
        ],
      },
    ],
  };

  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Income",
        data: [50000, 48000, 53000, 51000, 55000],
        backgroundColor: "cadetblue",
        borderRadius: 6,
      },
      {
        label: "Expense",
        data: [20000, 22000, 18000, 25000, 24000],
        backgroundColor: "#ff3b3b",
        borderRadius: 6,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "2.4rem",
          fontWeight: 700,
          color: "cadetblue",
          marginBottom: "35px",
          textShadow: "0px 3px 10px rgba(0,0,0,0.7)",
        }}
      >
        Reports 📊
      </h2>

      {/* --- Pie Chart Section --- */}
      <motion.div
        style={chartCard}
        whileHover={{ scale: 1.01 }}
      >
        <h3 style={chartHeading}>Expense Breakdown</h3>
        <Pie data={expenseData} />
      </motion.div>

      {/* --- Bar Chart Section --- */}
      <motion.div
        style={chartCard}
        whileHover={{ scale: 1.01 }}
      >
        <h3 style={chartHeading}>Income vs Expense (Monthly)</h3>
        <Bar data={monthlyData} />
      </motion.div>
    </motion.div>
  );
};

// Shared Card Style
const chartCard = {
  width: "100%",
  maxWidth: "680px",
padding: "28px",
  margin: "20px 0",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "14px",
  boxShadow: "0 0 30px rgba(0,0,0,0.65)",
  backdropFilter: "blur(6px)",
  textAlign: "center",
};

// Heading Style
const chartHeading = {
  marginBottom: "15px",
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "cadetblue",
};

export default Report;
