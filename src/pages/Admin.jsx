import React, { useState } from "react";
import { foodDatabase as initialFoodDatabase } from "../utils/foodData";

export default function Admin() {
  const [foodList, setFoodList] = useState(initialFoodDatabase);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ name: "", calories: "", protein: "" });

  // Add Food Item
  const handleAdd = () => {
    if (form.name && form.calories && form.protein) {
      setFoodList([...foodList, { ...form, calories: parseInt(form.calories), protein: parseInt(form.protein) }]);
      setForm({ name: "", calories: "", protein: "" });
    }
  };

  // Edit Food Item
  const handleEdit = (idx) => {
    setEditingIndex(idx);
    setForm(foodList[idx]);
  };

  const handleUpdate = () => {
    const updated = [...foodList];
    updated[editingIndex] = { ...form, calories: parseInt(form.calories), protein: parseInt(form.protein) };
    setFoodList(updated);
    setEditingIndex(null);
    setForm({ name: "", calories: "", protein: "" });
  };

  // Delete Food Item
  const handleDelete = (idx) => {
    const updated = foodList.filter((_, i) => i !== idx);
    setFoodList(updated);
    setEditingIndex(null);
    setForm({ name: "", calories: "", protein: "" });
  };

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>
      <p>Manage food database (add, edit, delete items).</p>
      
      {/* Add/Edit Form */}
      <div style={{ marginBottom: "1.2rem", background: "#23242f", borderRadius: "0.7em", padding: "1rem 1.5rem" }}>
        <input
          type="text"
          placeholder="Food Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ marginRight: 12, padding: "0.3em 0.7em", borderRadius: "0.4em" }}
        />
        <input
          type="number"
          placeholder="Calories"
          value={form.calories}
          onChange={e => setForm({ ...form, calories: e.target.value })}
          style={{ marginRight: 12, padding: "0.3em 0.7em", borderRadius: "0.4em", width: 80 }}
        />
        <input
          type="number"
          placeholder="Protein"
          value={form.protein}
          onChange={e => setForm({ ...form, protein: e.target.value })}
          style={{ marginRight: 12, padding: "0.3em 0.7em", borderRadius: "0.4em", width: 70 }}
        />
        {editingIndex === null ? (
          <button onClick={handleAdd}>Add Item</button>
        ) : (
          <button onClick={handleUpdate} style={{ background: "#feaf2f", color: "#242424" }}>Update</button>
        )}
      </div>

      {/* Food List */}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {foodList.map((f, i) => (
          <li key={i} style={{
            background: "#353259",
            marginBottom: "0.66em",
            padding: "0.93em 1em",
            borderRadius: "0.55em",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span>
              <b>{f.name}</b> - {f.calories} cal, {f.protein}g protein
            </span>
            <span>
              <button style={{ marginRight: 8 }} onClick={() => handleEdit(i)}>Edit</button>
              <button style={{ background: "#ee5253", color: "#fff" }} onClick={() => handleDelete(i)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}