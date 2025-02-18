import React, { useState } from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";

function Home() {
  const [reload, setReload] = useState(false);

  const refreshBooks = () => setReload(!reload);

  return (
    <div>
      
      <BookForm refreshBooks={refreshBooks} />
      <BookList key={reload} />
    </div>
  );
}

export default Home;
