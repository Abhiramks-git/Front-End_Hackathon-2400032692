import { useEffect, useState } from "react";
import { rda } from "../utils/foodData";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("foodLogs")) || [];
    setLogs(saved);
    setLoading(false);
  }, []);

  const totals = logs.reduce(
    (acc, item) => {
      acc.calories += item.calories;
      acc.protein += item.protein;
      acc.iron += item.iron;
      acc.vitaminC += item.vitaminC;
      return acc;
    },
    { calories: 0, protein: 0, iron: 0, vitaminC: 0 }
  );

  const getPercentage = (current, target) => Math.min((current / target) * 100, 100);
  const getProgressColor = (percentage) => {
    if (percentage >= 90) return "#25d366";
    if (percentage >= 70) return "#ffc107";
    return "#54a0ff";
  };

  const deficits = [];
  if (totals.calories < rda.calories) deficits.push("💪 Increase calorie intake");
  if (totals.protein < rda.protein) deficits.push("🥚 Add protein-rich foods");
  if (totals.iron < rda.iron) deficits.push("🥬 Eat leafy greens or meat");
  if (totals.vitaminC < rda.vitaminC) deficits.push("🍊 Add fruits like oranges");

  const StatCard = ({ label, current, target, icon }) => {
    const percentage = getPercentage(current, target);
    const progressColor = getProgressColor(percentage);

    return (
      <div style={{
        background: "rgba(84, 160, 255, 0.1)",
        border: "1px solid #54a0ff",
        borderRadius: "12px",
        padding: "20px",
        flex: 1,
        minWidth: "200px",
        transition: "all 0.3s ease"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
          <span style={{ fontSize: "24px" }}>{icon}</span>
          <p style={{ margin: 0, color: "#a7a9a9", fontSize: "12px", fontWeight: "500" }}>{label}</p>
        </div>
        <p style={{ margin: "0 0 10px 0", color: "#ffe066", fontSize: "20px", fontWeight: "bold" }}>
          {current}/{target}
        </p>
        <div style={{
          background: "rgba(255, 255, 255, 0.1)",
          height: "8px",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "8px"
        }}>
          <div style={{
            background: progressColor,
            height: "100%",
            width: `${percentage}%`,
            transition: "width 0.5s ease"
          }} />
        </div>
        <p style={{ margin: 0, color: "#a7a9a9", fontSize: "11px" }}>
          {Math.round(percentage)}% of daily goal
        </p>
      </div>
    );
  };

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center", color: "#a7a9a9" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#ffe066", margin: "0 0 10px 0", fontSize: "32px" }}>
          📊 Nutrition Dashboard
        </h1>
        <p style={{ color: "#a7a9a9", margin: 0, fontSize: "14px" }}>
          {logs.length} foods logged • {new Date().toLocaleDateString()}
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "15px",
        marginBottom: "30px"
      }}>
        <StatCard label="Calories" current={totals.calories} target={rda.calories} icon="🔥" />
        <StatCard label="Protein" current={totals.protein} target={rda.protein} icon="💪" />
        <StatCard label="Iron" current={Math.round(totals.iron)} target={rda.iron} icon="🔋" />
        <StatCard label="Vitamin C" current={Math.round(totals.vitaminC)} target={rda.vitaminC} icon="🍊" />
      </div>

      <div style={{
        background: "rgba(84, 160, 255, 0.1)",
        border: "1px solid #54a0ff",
        borderRadius: "12px",
        padding: "20px"
      }}>
        <h2 style={{ color: "#ffe066", margin: "0 0 15px 0", fontSize: "18px" }}>
          💡 Recommendations
        </h2>

        {deficits.length === 0 ? (
          <div style={{
            background: "rgba(37, 211, 102, 0.1)",
            border: "1px solid #25d366",
            borderRadius: "8px",
            padding: "15px",
            textAlign: "center"
          }}>
            <p style={{ color: "#25d366", margin: 0, fontWeight: "bold", fontSize: "16px" }}>
              ✅ Your diet is well balanced!
            </p>
            <p style={{ color: "#a7a9a9", margin: "5px 0 0 0", fontSize: "12px" }}>
              Keep maintaining this great nutrition plan
            </p>
          </div>
        ) : (
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gap: "10px"
          }}>
            {deficits.map((d, i) => (
              <li key={i} style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "12px 15px",
                color: "#a7a9a9",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "14px"
              }}>
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>

      {logs.length > 0 && (
        <div style={{
          marginTop: "30px",
          background: "rgba(84, 160, 255, 0.05)",
          border: "1px solid rgba(84, 160, 255, 0.2)",
          borderRadius: "12px",
          padding: "15px",
          textAlign: "center"
        }}>
          <p style={{ color: "#a7a9a9", margin: "0 0 10px 0", fontSize: "12px" }}>
            Average per food item
          </p>
          <p style={{ color: "#ffe066", margin: 0, fontSize: "14px", fontWeight: "bold" }}>
            {Math.round(totals.calories / logs.length)} cal • {Math.round(totals.protein / logs.length)}g protein
          </p>
        </div>
      )}
    </div>
  );
}
