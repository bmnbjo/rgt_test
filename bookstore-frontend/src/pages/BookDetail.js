import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/BookDetail.css";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", price: "", stock: "" });

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    const response = await axios.get(`http://localhost:5000/api/books/${id}`);
    setBook(response.data);
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:5000/api/books/${id}`, book);
    alert("수정 완료되었습니다.");
  };

  const handleStockChange = async (change) => {
    const newStock = Math.max(0, book.stock + change);
    setBook({ ...book, stock: newStock });
  };

  return (
    <div className="book-detail-container">
      <h2>📖 도서 상세 정보</h2>
      <div className="book-detail-form">
        <input type="text" name="title" value={book.title} onChange={handleChange} placeholder="제목" />
        <input type="text" name="author" value={book.author} onChange={handleChange} placeholder="저자" />
        <input type="number" name="price" value={book.price} onChange={handleChange} placeholder="가격" />
      </div>
      <div className="stock-control">
        <button onClick={() => handleStockChange(-1)}>-</button>
        <span>재고: {book.stock}권</span>
        <button onClick={() => handleStockChange(1)}>+</button>
      </div>
      <div className="book-detail-actions">
        <button className="save-btn" onClick={handleSave}>저장</button>
        <button className="back-btn" onClick={() => navigate("/")}>목록으로</button>
      </div>
    </div>
  );
}

export default BookDetail;
