require('dotenv').config();  // .env 파일 로드
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 데이터베이스 연결 설정 (환경 변수 사용)
const db = mysql.createConnection({
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// 데이터베이스 연결 확인
db.connect(err => {
    if (err) {
        console.error('❌ DB 연결 실패:', err);
    } else {
        console.log(`✅ DB 연결 성공 (${process.env.DB_HOST})`);
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

// 책 추가 API
app.post('/api/books', (req, res) => {
    const { title, author, price, stock } = req.body;
    db.query('INSERT INTO books (title, author, price, stock) VALUES (?, ?, ?, ?)', 
    [title, author, price, stock], (err, results) => {
        if (err) return res.status(500).json({ error: '책 추가 실패' });
        res.json({ message: '책 추가 성공', id: results.insertId });
    });
});

// 책 수정 API
app.put('/api/books/:id', (req, res) => {
    const { title, author, price, stock } = req.body;
    const { id } = req.params;
    db.query('UPDATE books SET title=?, author=?, price=?, stock=? WHERE id=?', 
    [title, author, price, stock, id], (err, results) => {
        if (err) return res.status(500).json({ error: '책 수정 실패' });
        res.json({ message: '책 수정 성공' });
    });
});

// 책 삭제 API
app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM books WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: '책 삭제 실패' });
        res.json({ message: '책 삭제 성공' });
    });
});

// 기본 루트 설정 (서버 상태 확인용)
app.get("/", (req, res) => {
    res.send("서점 관리 API 서버입니다. 사용 가능한 API: /api/books");
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://..호스트..:${PORT}`);
});
