import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/BookList.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bookstore-container">
      <h2 className="title">재고 관리</h2>
      <table className="book-table">
        <thead>
          <tr>
            <th className="table-header">제목</th>
            <th className="table-header">저자</th>
            <th className="table-header">가격</th>
            <th className="table-header">재고</th>
            <th className="table-header">관리</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id} className="book-item">
              <td className="book-title" onClick={() => navigate(`/books/${book.id}`)}>{book.title}</td>
              <td className="book-author">{book.author}</td>
              <td className="book-price">{book.price}원</td>
              <td className="book-stock">{book.stock}권</td>
              <td className="book-actions">
                <button className="edit-btn" onClick={() => navigate(`/books/${book.id}`)}>수정</button>
                <button className="delete-btn" onClick={() => handleDelete(book.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BookList;
