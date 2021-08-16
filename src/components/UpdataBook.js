import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FETCH_BOOKS_QUERY } from "./BookList";
import { FETCH_BOOK_DATA } from "./BookDetails";
import { useHistory, useParams } from "react-router-dom";

const UPDATE_BOOK = gql`
  mutation ($title: String!, $genre: String!, $author: String!, $id: ID!) {
    updateBook(title: $title, genre: $genre, author: $author, id: $id) {
      title
    }
  }
`;

const UpdateBook = () => {
  const history = useHistory(null);
  const { id } = useParams();
  const { data, loading, error } = useQuery(FETCH_BOOK_DATA, {
    variables: {
      id,
    },
  });
  const [updateBook, mutationData] = useMutation(UPDATE_BOOK);

  const [bookUpdateData, setBookUpdateData] = useState(data.book);
  const handleChange = (e) => {
    if (e.target.name === "author") {
      setBookUpdateData((current) => {
        return {
          ...current,
          author: {
            ...current.author,
            name: e.target.value,
          },
        };
      });
    } else {
      setBookUpdateData((current) => {
        return {
          ...current,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook({
      variables: {
        title: bookUpdateData.title,
        genre: bookUpdateData.genre.toLowerCase(),
        author: bookUpdateData.author.name,
        id,
      },
      refetchQueries: [FETCH_BOOKS_QUERY],
    });
    if (!mutationData.error && !mutationData.loading) {
      history.push("/");
    }
  };

  return (
    <section className="d-flex flex-row justify-content-center align-items-center vh-100 vw-100">
      {loading ? (
        <h2>Fetching...</h2>
      ) : error ? (
        <h2>Error {error.message}</h2>
      ) : mutationData.error ? (
        <h2>{mutationData.error.message}</h2>
      ) : mutationData.loading ? (
        <h2>Updating....</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <p className="fs-5">Title</p>
            <input
              className="form-control mb-4"
              type="text"
              name="title"
              value={bookUpdateData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="fs-5">Genre</p>
            <input
              className="form-control mb-4"
              type="text"
              name="genre"
              value={bookUpdateData.genre}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="fs-5">Author</p>
            <input
              className="form-control mb-4"
              type="text"
              name="author"
              value={bookUpdateData.author.name}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-warning mt-4"
            disabled={loading}
          >
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default UpdateBook;
