import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
    alert("Book updated successfully!");
  };

  const handleStockChange = async (change) => {
    const newStock = Math.max(0, book.stock + change);
    setBook({ ...book, stock: newStock });
  };

  return (
    <div>
      <h2>Book Details</h2>
      <input type="text" name="title" value={book.title} onChange={handleChange} placeholder="Title" />
      <input type="text" name="author" value={book.author} onChange={handleChange} placeholder="Author" />
      <input type="number" name="price" value={book.price} onChange={handleChange} placeholder="Price" />
      <div>
        <button onClick={() => handleStockChange(-1)}>-</button>
        <span>Stock: {book.stock}</span>
        <button onClick={() => handleStockChange(1)}>+</button>
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
}

export default BookDetail;
