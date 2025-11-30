import { color } from "framer-motion";
import React from "react";
import { FaChartPie, FaWallet, FaHistory, FaUserShield, FaListAlt, FaFolderPlus } from "react-icons/fa";

const cardStyle = {
  background : "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  transition: "0.3s",
  cursor: "pointer",
};

const cardHover = {
  boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
};

const iconContainer = {
  width: "60px",
  height: "60px",
  margin: "0 auto",
  borderRadius: "50%",
  background: "#EEF2FF",
  color: "cadetblue",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
};

const containerStyle = {
  padding: "40px",
  background: "black",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center",
  marginBottom: "25px",
  color: "white",
};

const descStyle = {
  marginTop: "6px",
  fontSize : "18px",
  color: "#6e7191"
};

const Features = () => {
  const [hoverIndex, setHoverIndex] = React.useState(null);

  const features = [
    {
      icon: <FaWallet size={32} />,
      title: "Smart Transaction Logging",
      desc: "Add income and expenses with dates, categories, and notes.",
    },
    {
      icon: <FaUserShield size={32} />,
      title: "Secure Authentication",
      desc: "JWT-powered login ensures only you can access your records.",
    },
    {
      icon: <FaFolderPlus size={32} />,
      title: "Custom Categories",
      desc: "Organize your finances using built-in or user-created categories.",
    },
    {
      icon: <FaChartPie size={32} />,
      title: "Analytics Dashboard",
      desc: "View monthly balance, total income, and spending highlights.",
    },
    {
      icon: <FaHistory size={32} />,
      title: "Transaction History",
      desc: "Search, sort, and filter all your past transactions easily.",
    },
    {
      icon: <FaListAlt size={32} />,
      title: "Visual Reports",
      desc: "Charts help visualize your spending patterns clearly.",
    },
  ];

  return (
    <section style={containerStyle}>
      <h2 style={titleStyle}>App Features</h2>

      <div style={gridStyle}>
        {features.map((item, index) => (
          <div
            key={index}
            style={hoverIndex === index ? { ...cardStyle, ...cardHover } : cardStyle}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={iconContainer}>{item.icon}</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "800" }}>
              {item.title}
            </h3>
            <p style={descStyle}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
