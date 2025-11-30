import { useState } from "react";
import { foodDatabase } from "../utils/foodData";

export default function FoodLog() {
  const [logs, setLogs] = useState(JSON.parse(localStorage.getItem("foodLogs")) || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [customFood, setCustomFood] = useState({ name: "", calories: "", protein: "" });

  const addFood = (food) => {
    const newLogs = [...logs, { ...food, id: Date.now() }];
    setLogs(newLogs);
    localStorage.setItem("foodLogs", JSON.stringify(newLogs));
  };

  const deleteFood = (id) => {
    const newLogs = logs.filter(item => item.id !== id);
    setLogs(newLogs);
    localStorage.setItem("foodLogs", JSON.stringify(newLogs));
  };

  const handleAddCustomFood = (e) => {
    e.preventDefault();
    if (!customFood.name || !customFood.calories) {
      alert("Please fill all fields");
      return;
    }
    addFood({
      name: customFood.name,
      calories: parseInt(customFood.calories),
      protein: parseInt(customFood.protein) || 0,
      iron: 0,
      vitaminC: 0
    });
    setCustomFood({ name: "", calories: "", protein: "" });
    setShowForm(false);
  };

  const clearLogs = () => {
    if (confirm("Delete all food logs?")) {
      setLogs([]);
      localStorage.removeItem("foodLogs");
    }
  };

  const filteredFoods = foodDatabase.filter(f =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCalories = logs.reduce((sum, item) => sum + item.calories, 0);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#000000ff", margin: "0 0 10px 0", fontSize: "32px" }}>
          🍎 Food Log
        </h1>
        <p style={{ color: "#a7a9a9", margin: 0, fontSize: "14px" }}>
          {logs.length} items logged • {totalCalories} calories today
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
        {/* Left: Food List */}
        <div style={{
          background: "rgba(84, 160, 255, 0.1)",
          border: "1px solid #54a0ff",
          borderRadius: "12px",
          padding: "20px"
        }}>
          <h2 style={{ color: "#ffe066", margin: "0 0 15px 0", fontSize: "18px" }}>
            📋 Today's Log
          </h2>

          {logs.length === 0 ? (
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px dashed #54a0ff",
              borderRadius: "8px",
              padding: "30px",
              textAlign: "center",
              color: "#000000ff"
            }}>
              <p style={{ fontSize: "24px", margin: "0 0 10px 0" }}>🥗</p>
              <p style={{ margin: 0, fontSize: "14px" }}>No foods logged yet</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>Add some foods to get started!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "10px", maxHeight: "500px", overflowY: "auto" }}>
              {logs.map((item, i) => (
                <div key={item.id || i} style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.3s ease"
                }}>
                  <div>
                    <p style={{ margin: "0 0 5px 0", color: "#000000ff", fontWeight: "bold", fontSize: "14px" }}>
                      {item.name}
                    </p>
                    <p style={{ margin: 0, color: "#a7a9a9", fontSize: "12px" }}>
                      🔥 {item.calories} cal · 💪 {item.protein}g protein
                    </p>
                  </div>
                  <button onClick={() => deleteFood(item.id || i)} style={{
                    background: "#ee5253",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold"
                  }}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {logs.length > 0 && (
            <button onClick={clearLogs} style={{
              width: "100%",
              marginTop: "15px",
              backgroundColor: "#ee5253",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px"
            }}>
              🗑️ Clear All
            </button>
          )}
        </div>

        {/* Right: Add Food */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Quick Add */}
          <div style={{
            background: "rgba(84, 160, 255, 0.1)",
            border: "1px solid #54a0ff",
            borderRadius: "12px",
            padding: "20px"
          }}>
            <h2 style={{ color: "#e0b51aff", margin: "0 0 15px 0", fontSize: "18px" }}>
              ⚡ Quick Add
            </h2>

            <input type="text" placeholder="Search foods..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #0973f5ff",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff",
                marginBottom: "15px",
                fontSize: "14px",
                boxSizing: "border-box"
              }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", maxHeight: "200px", overflowY: "auto" }}>
              {filteredFoods.map((f, i) => (
                <button key={i} onClick={() => addFood(f)} style={{
                  background: "rgba(0, 75, 18, 0.97)",
                  border: "1px solid #0371f7ff",
                  color: "#fffb01ff",
                  borderRadius: "8px",
                  padding: "10px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "bold",
                  transition: "all 0.2s ease"
                }}>
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Food */}
          <div style={{
            background: "rgba(84, 160, 255, 0.1)",
            border: "1px solid #54a0ff",
            borderRadius: "12px",
            padding: "20px",
            flex: 1
          }}>
            <button onClick={() => setShowForm(!showForm)} style={{
              width: "100%",
              background: "#54a0ff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "15px"
            }}>
              {showForm ? "✕ Cancel" : "+ Add Custom Food"}
            </button>

            {showForm && (
              <form onSubmit={handleAddCustomFood} style={{ display: "grid", gap: "10px" }}>
                <input type="text" placeholder="Food name" value={customFood.name}
                  onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })} style={{
                    padding: "10px",
                    border: "1px solid #54a0ff",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }} />
                <input type="number" placeholder="Calories" value={customFood.calories}
                  onChange={(e) => setCustomFood({ ...customFood, calories: e.target.value })} style={{
                    padding: "10px",
                    border: "1px solid #54a0ff",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }} />
                <input type="number" placeholder="Protein (g)" value={customFood.protein}
                  onChange={(e) => setCustomFood({ ...customFood, protein: e.target.value })} style={{
                    padding: "10px",
                    border: "1px solid #54a0ff",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#fff",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }} />
                <button type="submit" style={{
                  background: "#25d366",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}>
                  ✓ Add Food
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {logs.length > 0 && (
        <div style={{
          background: "rgba(84, 160, 255, 0.1)",
          border: "1px solid #54a0ff",
          borderRadius: "12px",
          padding: "15px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "15px",
          textAlign: "center"
        }}>
          <div>
            <p style={{ color: "#a7a9a9", margin: "0 0 5px 0", fontSize: "12px" }}>Total Calories</p>
            <p style={{ color: "#000000ff", margin: 0, fontSize: "20px", fontWeight: "bold" }}>{totalCalories}</p>
          </div>
          <div>
            <p style={{ color: "#a7a9a9", margin: "0 0 5px 0", fontSize: "12px" }}>Items Logged</p>
            <p style={{ color: "#000000ff", margin: 0, fontSize: "20px", fontWeight: "bold" }}>{logs.length}</p>
          </div>
          <div>
            <p style={{ color: "#a7a9a9", margin: "0 0 5px 0", fontSize: "12px" }}>Avg per Item</p>
            <p style={{ color: "#000000ff", margin: 0, fontSize: "20px", fontWeight: "bold" }}>
              {Math.round(totalCalories / logs.length)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
