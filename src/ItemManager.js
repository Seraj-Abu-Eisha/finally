import React, { useState } from 'react';
import './ItemManager.css';

function ItemManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', detail: '', amount: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = form;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, form]);
    }
    setForm({ name: '', detail: '', amount: '' });
  };

  const handleEdit = (index) => {
    setForm(items[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
    // Reset form if deleting the currently edited item
    if (editingIndex === index) {
      setForm({ name: '', detail: '', amount: '' });
      setEditingIndex(null);
    }
  };

  return (
    <div className="container">
      <h2>📦 Item Manager</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="detail"
          placeholder="Detail"
          value={form.detail}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          min="1"
        />
        <button type="submit">
          {editingIndex !== null ? '✏️ Update' : '➕ Add'}
        </button>
      </form>

      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            <div>
              <strong>{item.name}</strong> — {item.detail} (x{item.amount})
            </div>
            <div>
              <button onClick={() => handleEdit(index)}>Edit</button>{' '}
              <button className="delete-btn" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemManager;
