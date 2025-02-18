import React, { useState } from "react";
import { addBook } from "../services/api";
import "../styles/BookForm.css";

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
    <div className="book-form-container">
      <h2>새 책 추가</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="제목" required />
        <input type="text" name="author" value={form.author} onChange={handleChange} placeholder="저자" required />
        <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="가격" required />
        <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="재고" required />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}

export default BookForm;
