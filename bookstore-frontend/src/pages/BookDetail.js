import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/BookDetail.css";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ title: "", author: "", price: "", stock: 0 });

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  console.log("API_BASE_URL:", API_BASE_URL);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error("도서 정보를 불러오는 중 오류 발생:", error);
      alert("도서 정보를 불러올 수 없습니다.");
    }
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, book);
      alert("수정 완료되었습니다.");
    } catch (error) {
      console.error("도서 수정 오류:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const handleStockChange = async (change) => {
    const newStock = Math.max(0, book.stock + change);
    try {
      await axios.put(`${API_BASE_URL}/${id}`, { ...book, stock: newStock });
      setBook({ ...book, stock: newStock });
    } catch (error) {
      console.error("재고 수정 오류:", error);
      alert("재고 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="book-detail-container">
      <h2>도서 상세 정보</h2>
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
