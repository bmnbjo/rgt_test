import React, { useState } from "react";
import { addBook } from "../services/api";

function BookForm({ refreshBooks }) {
  const [form, setForm] = useState({ title: "", author: "", price: "", stock: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook(form);
    refreshBooks();  // 추가 후 목록 갱신
    setForm({ title: "", author: "", price: "", stock: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="author" value={form.author} onChange={handleChange} placeholder="Author" required />
      <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
      <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;
