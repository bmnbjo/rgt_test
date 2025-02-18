# 도서 관리 페이지

## 프로젝트 개요
이 프로젝트는 React(프론트엔드) + Express(백엔드) + 원격 MySQL을 활용한 도서 재고 관리 시스템입니다.  
사용자는 도서를 추가, 수정, 삭제, 검색할 수 있으며, 페이지네이션 기능이 포함되어 있습니다.
원격 데이터베이스를 사용하므로, MySQL을 따로 설정할 필요 없습니다. 

## **개발 환경**
### **운영체제**
- **Windows 10 / 11**
- (Linux/macOS에서도 실행 가능하지만, Windows에서 개발됨)

### **백엔드 (Express)**
- **Node.js**: v20.18.1
- **npm**: 11.1.0
- **Express**: 4.18.2
- **Axios**: 1.4.0
- **dotenv**: 16.3.1
- **MySQL2**: 3.4.5

### **프론트엔드 (React)**
- **React**: 19.0.0
- **React Router DOM**: 7.1.5
- **React Scripts**: 5.0.1

### **데이터베이스**
- **Cloudtype 원격 MySQL 사용**
- **로컬에서 MySQL을 설정할 필요 없음**

---

## **프로젝트 실행 방법**
### **1. 프로젝트 다운로드 (Git Clone)**
### **2. 백엔드 실행 (Node.js + Express)** 
- 백엔드 폴더로 이동 : cd bookstore-backend 
- 패키지 설치 : npm install
- 환경 변수 파일 생성(bookstore-backend/.env) :
  ```plaintext
  PORT=5000
  DB_HOST=svc.sel4.cloudtype.app
  DB_PORT=30632
  DB_USER=book_sjh
  DB_PASSWORD=bobojh
  DB_NAME=bookstore 
- 서버 실행 : node server.js
### **3. 프론트 실행 (React)** 
- 프론트 폴더로 이동 : cd ../bookstore-frontend
- 패키지 설치 : npm install
- 환경 변수 파일 생성(bookstore-frontend/.env) 
 : REACT_APP_API_URL=http://localhost:5000/api/books
- 서버 실행 : npm start

감사합니다. 
