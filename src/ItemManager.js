import React, { useState } from 'react';
import './ItemManager.css';

function ItemManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', detail: '', amount: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'شراء',
      product: 'منتج A',
      quantity: 3,
      date: '2025-07-01 10:00'
    }
  ]);

  //  بيانات المستخدمين الوهمية
  const [users, setUsers] = useState([
    { id: 1, name: 'أحمد', role: 'مدير' },
    { id: 2, name: 'سارة', role: 'مشرف' },
    { id: 3, name: 'محمد', role: 'مستخدم' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userForm, setUserForm] = useState({ name: '', role: '' });
  const [editingUserIndex, setEditingUserIndex] = useState(null);

  //  تصفية المستخدمين
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();

    if (editingIndex !== null) {
      const updated = [...items];
      updated[editingIndex] = form;
      setItems(updated);
      setTransactions([...transactions, {
        id: Date.now(), type: 'تحديث منتج', product: form.name, quantity: form.amount, date
      }]);
      setEditingIndex(null);
    } else {
      setItems([...items, form]);
      setTransactions([...transactions, {
        id: Date.now(), type: 'إضافة للمخزن', product: form.name, quantity: form.amount, date
      }]);
    }

    setForm({ name: '', detail: '', amount: '' });
  };

  const handleEdit = (index) => {
    setForm(items[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const item = items[index];
    const date = new Date().toLocaleString();
    setTransactions([...transactions, {
      id: Date.now(), type: 'سحب من المخزن', product: item.name, quantity: item.amount, date
    }]);
    setItems(items.filter((_, i) => i !== index));
  };

  //  إدارة المستخدمين
  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (editingUserIndex !== null) {
      const updated = [...users];
      updated[editingUserIndex] = userForm;
      setUsers(updated);
      setEditingUserIndex(null);
    } else {
      setUsers([...users, { ...userForm, id: Date.now() }]);
    }
    setUserForm({ name: '', role: '' });
  };

  const handleUserEdit = (index) => {
    setUserForm(users[index]);
    setEditingUserIndex(index);
  };

  const handleUserDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h2> إدارة المنتجات</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="اسم المنتج" value={form.name} onChange={handleChange} required />
        <input name="detail" placeholder="الوصف" value={form.detail} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="الكمية" value={form.amount} onChange={handleChange} required />
        <button type="submit">{editingIndex !== null ? ' تحديث' : ' إضافة'}</button>
      </form>

      <h3> قائمة المنتجات</h3>
      <table className="item-table">
        <thead>
          <tr><th>الاسم</th><th>الوصف</th><th>الكمية</th><th>إجراءات</th></tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.detail}</td>
              <td>{item.amount}</td>
              <td>
                <button onClick={() => handleEdit(i)}> تعديل</button>
                <button className="delete-btn" onClick={() => handleDelete(i)}> حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3> سجل الحركات</h3>
      <table className="item-table">
        <thead>
          <tr><th>نوع الحركة</th><th>المنتج</th><th>الكمية</th><th>التاريخ</th></tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.type}</td>
              <td>{t.product}</td>
              <td>{t.quantity}</td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3> إدارة المستخدمين</h3>

      <input
        type="text"
        placeholder=" ابحث عن مستخدم..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <form className="form" onSubmit={handleUserSubmit}>
        <input name="name" placeholder="اسم المستخدم" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} required />
        <input name="role" placeholder="الدور" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} required />
        <button type="submit">{editingUserIndex !== null ? ' تحديث' : ' إضافة'}</button>
      </form>

      <table className="item-table">
        <thead>
          <tr><th>الاسم</th><th>الدور</th><th>إجراءات</th></tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, i) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleUserEdit(i)}> تعديل</button>
                <button className="delete-btn" onClick={() => handleUserDelete(i)}> حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemManager;
