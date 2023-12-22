import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useSelector, useDispatch } from "react-redux";

import { getSavedFilms } from "../../utils/store/slices/userslice";
import {
  useSavedMoviesMutation,
  useDeleteMoviesMutation,
} from "../../utils/store/query/user";

function MoviesCard({ movie, isSavedMoviesPage }) {
  const navigate = useNavigate();
  const [saveMovie] = useSavedMoviesMutation();
  const [deleteMovie] = useDeleteMoviesMutation();
  const user = useSelector((state) => state.userSlice);
  const films = useSelector((state) => state.userSlice.savedFilms);
  const loggedIn = useSelector((state) => state.userSlice.loggetIn);
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);

  function clickMore() {
    navigate(`/movies/${movie.id}`);
  }
  useEffect(() => {
    const bool = films.some(
      (item) => item.id == movie.id
    );
    setIsSaved(bool);
  }, []);

  function handleSave() {
    try {
      if (isSaved) {
        deleteMovie({ id: movie.id }).then(() => {
          dispatch(getSavedFilms(films.filter((item) => item.id != movie.id)));
        });
      } else {
        saveMovie(movie).then(() => {
          dispatch(getSavedFilms([...films, movie]));
        });
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    console.log(movie);
    try {
      await deleteMovie({ id: movie.id });
      dispatch(
        getSavedFilms(
          user.savedFilms.filter((item) => item.id !== movie.id)
        )
      );
      setIsSaved(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li className="movies-card">
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <p className="movies-card__time">
          {Math.floor(movie.duration / 60)}ч{" "}
          {movie.duration - 60 * Math.floor(movie.duration / 60)}м
        </p>
        { loggedIn && <>
              { isSavedMoviesPage ? (
                <button
                  onClick={handleDelete}
                  className="movies-card__button movies-card__button_delete"
                  type="button"
                ></button>
              ) : (
                <button
                  onClick={handleSave}
                  className={`movies-card__button ${
                    isSaved ? "movies-card__button_active" : ""
                  }`}
                  type="button"
                ></button>
              )}
        </> }
        <button className="movies-card__more" type="button" onClick={clickMore}> Подробнее... </button>
      </div>
      <a
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
        className="movies-card__link"
      >
        <img
          className="movies-card__poster"
          src={
            movie.image.url
              ? `https://api.nomoreparties.co/${movie.image.url}`
              : movie.image
          }
          alt={`Постер ${movie.nameRU}`}
        />
      </a>
    </li>
  );
}

export default MoviesCard;
