import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/BookList.css";

function BookList() {
  const [books, setBooks] = useState([]); // 전체 도서 목록
  const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 도서 목록
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState("title"); // 검색 유형 (기본: 제목)
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const booksPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
    setFilteredBooks(data); // 초기 상태에서도 동일하게 설정
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);

    // 📌 삭제 후 현재 페이지의 데이터 개수 확인
    const totalPages = Math.ceil(updatedBooks.length / booksPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(totalPages, 1)); // 이전 페이지로 이동 (최소 1페이지)
    }
  };

  // 🔍 검색 버튼 클릭 시 필터링 실행 + 첫 페이지로 이동
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredBooks(books);
      setCurrentPage(1); // ✅ 검색 초기화 시 1페이지로 이동
      return;
    }

    const filtered = books.filter((book) =>
      book[searchType].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
    setCurrentPage(1); // ✅ 검색 후 항상 첫 페이지로 이동
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bookstore-container">
      <h2 className="title">재고 관리</h2>

      {/* ✅ 검색 기능 추가 (버튼 방식) */}
      <div className="search-container">
        <select onChange={(e) => setSearchType(e.target.value)} value={searchType}>
          <option value="title">제목</option>
          <option value="author">저자</option>
        </select>
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn">검색</button>
      </div>

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
        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BookList;
