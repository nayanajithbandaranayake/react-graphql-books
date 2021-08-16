import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FETCH_BOOKS_QUERY } from "./BookList";

export const FETCH_BOOK_DATA = gql`
  query ($id: ID!) {
    book(id: $id) {
      title
      genre
      id
      author {
        name
        books {
          title
          id
        }
      }
    }
  }
`;

const DELETE_BOOK = gql`
  mutation ($id: ID!) {
    deleteBook(id: $id) {
      title
    }
  }
`;

const BookDetails = ({ bookId, setBookId }) => {
  const [deleteBook, mutationData] = useMutation(DELETE_BOOK, {
    variables: {
      id: bookId,
    },
    refetchQueries: [FETCH_BOOKS_QUERY, FETCH_BOOK_DATA],
  });

  const { data, loading, error } = useQuery(FETCH_BOOK_DATA, {
    variables: {
      id: bookId,
    },
  });
  if (loading) {
    return (
      <aside>
        <h2>Fetching...</h2>
      </aside>
    );
  }
  if (error && bookId)
    return (
      <aside>
        <h2>{error.message}</h2>
      </aside>
    );
  if (bookId === 0 || !data.book)
    return (
      <aside>
        <h2>Click on a book to view details.</h2>
      </aside>
    );
  if (mutationData.error && bookId)
    return (
      <aside>
        <h2>{mutationData.error.message}</h2>
      </aside>
    );

  if (mutationData.loading)
    return (
      <aside>
        <h2>Deleting...</h2>
      </aside>
    );

  return (
    <aside className="book-list-container">
      <div>
        <Link to={`/update/${bookId}`} className="btn btn-warning">
          Update
        </Link>
        <button
          type="button"
          className="btn btn-danger mx-2"
          onClick={() => {
            deleteBook();
          }}
        >
          Delete
        </button>
      </div>
      <div>
        <h3 className="fs-3 mb-5">{data.book.title}</h3>
        <p className="fs-4">{data.book.author.name}</p>
        <p className="fs-5 mb-5">{data.book.genre}</p>
        <ul>
          {data.book.author.books.map((item) => {
            const { title, id, genre } = item;
            return (
              <li key={id}>
                <p className="fs-5">{title}</p>
                <p className="fs-5">{genre}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default BookDetails;
