import { Pie, Bar } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement 
} from "chart.js";
import { motion } from "framer-motion";
import "./Report.css";

// Register all chart components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Report = () => {
  // Dummy Data (Replace with backend data later)
  const expenseData = {
    labels: ["Food", "Transport", "Shopping", "Entertainment", "Other"],
    datasets: [
      {
        label: "Expenses",
        data: [3000, 1500, 2200, 1800, 900],
        backgroundColor: [
          "#ff7860",
          "#ffaf40",
          "#36c2ce",
          "#8b5cf6",
          "#ffdd57",
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
        backgroundColor: "#00ff8f",
      },
      {
        label: "Expense",
        data: [20000, 22000, 18000, 25000, 24000],
        backgroundColor: "#ff3b3b",
      },
    ],
  };

  return (
    <motion.div
      className="reports-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="reports-title">Reports 📊</h2>

      {/* Pie Chart */}
      <div className="chart-container">
        <h3>Expense by Category</h3>
        <Pie data={expenseData} />
      </div>

      {/* Bar Chart */}
      <div className="chart-container">
        <h3>Monthly Income vs Expense</h3>
        <Bar data={monthlyData} />
      </div>
    </motion.div>
  );
};

export default Report;
