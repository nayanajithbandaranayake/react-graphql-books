import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FETCH_BOOKS_QUERY } from "./BookList";
import { useHistory } from "react-router-dom";

const ADD_BOOK = gql`
  mutation ($title: String!, $genre: String!, $author: String!) {
    addBook(title: $title, genre: $genre, author: $author) {
      title
    }
  }
`;

const AddBook = () => {
  const history = useHistory(null);
  const [addBook, { loading, error }] = useMutation(ADD_BOOK);

  const [bookData, setBookData] = useState({
    title: "",
    genre: "",
    author: "",
  });

  const handleChange = (e) => {
    setBookData((current) => {
      return {
        ...current,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({
      variables: {
        title: bookData.title,
        genre: bookData.genre.toLowerCase(),
        author: bookData.author.toLowerCase(),
      },
      refetchQueries: [FETCH_BOOKS_QUERY],
    });
    setBookData({
      title: "",
      genre: "",
      author: "",
    });
    if (!error && !loading) {
      history.push("/");
    }
  };

  return (
    <section className="d-flex flex-row justify-content-center align-items-center vh-100 vw-100">
      <form onSubmit={handleSubmit}>
        {loading && <div>Loading...</div>}
        {error && <div>Error {error.message}</div>}
        <div>
          <p className="fs-5">Title</p>
          <input
            className="form-control mb-4"
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="fs-5">Genre</p>
          <input
            className="form-control mb-4"
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="fs-5">Author</p>
          <input
            className="form-control mb-4"
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={loading}
        >
          + Add
        </button>
      </form>
    </section>
  );
};

export default AddBook;
