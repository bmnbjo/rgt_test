require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//  MariaDB 연결 정보 설정
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'book_sjh',
    password: 'bobojh',
    database: 'bookstore'
});

// DB 연결 확인
db.connect(err => {
    if (err) {
        console.error('❌ DB 연결 실패:', err);
    } else {
        console.log('✅ DB 연결 성공');
    }
});

// 책 목록 조회 API
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            return res.status(500).json({ error: '데이터 조회 실패' });
        }
        res.json(results);
    });
});

// 책 상세 조회 API (GET /api/books/:id)
app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM books WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: '책 조회 실패' });
        if (result.length === 0) return res.status(404).json({ error: '책을 찾을 수 없음' });
        res.json(result[0]);
    });
});

// 책 추가 API
app.post('/api/books', (req, res) => {
    const { title, author, price, stock } = req.body;
    db.query('INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)', 
    [title, author, price, stock], (err, results) => {
        if (err) return res.status(500).json({ error: '책 추가 실패' });
        res.json({ message: '책 추가 성공', id: results.insertId });
    });
});

//  책 수정 API
app.put('/api/books/:id', (req, res) => {
    const { title, author, price, stock } = req.body;
    const { id } = req.params;
    db.query('UPDATE books SET title=?, author=?, price=?, stock=? WHERE id=?', 
    [title, author, price, stock, id], (err, results) => {
        if (err) return res.status(500).json({ error: '책 수정 실패' });
        res.json({ message: '책 수정 성공' });
    });
});

//  책 삭제 API
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM books WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: '책 삭제 실패' });
        res.json({ message: '책 삭제 성공' });
    });
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` 서버 실행 중: http://localhost:${PORT}`);
});
