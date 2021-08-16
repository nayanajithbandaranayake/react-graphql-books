import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import BookDetails from "./BookDetails";
import { Link } from "react-router-dom";

export const FETCH_BOOKS_QUERY = gql`
  query {
    books {
      title
      id
    }
  }
`;
const BookList = () => {
  const [activeBookId, setActiveBookId] = useState(0);

  const { loading, error, data } = useQuery(FETCH_BOOKS_QUERY);

  return (
    <section className="book-list">
      <div className="book-list-container">
        <div>
          <h1 className="book-list-title">My Favourites</h1>
          <Link to="/add" className="btn btn-primary mt-4">
            Add a Book
          </Link>
        </div>
        <ul className="books-container">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>{error.message}</h2>
          ) : (
            data.books.map((book) => {
              const { title, id } = book;
              return (
                <li
                  className="cursor-pointer fs-5"
                  key={id}
                  onClick={() => setActiveBookId(id)}
                >
                  {title}
                </li>
              );
            })
          )}
        </ul>
      </div>
      <BookDetails bookId={activeBookId} setBookId={setActiveBookId} />
    </section>
  );
};

export default BookList;
