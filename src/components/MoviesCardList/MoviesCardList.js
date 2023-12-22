import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

import { useGetSavedMoviesQuery} from "../../utils/store/query/user";
import { getSavedFilms } from "../../utils/store/slices/userslice";

function MoviesCardList({ isSavedMoviesPage }) {
  const loggedIn = useSelector((state) => state.userSlice.loggetIn);
  const films = useSelector((state) => state.filmSlice.films);
  const userFilms = useSelector((state) => state.userSlice.savedFilms);
  const dispatch = useDispatch();
  const {data} = useGetSavedMoviesQuery({}, {
    skip: !loggedIn,  
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (loggedIn && data) {
        dispatch(getSavedFilms(data));
    }
  }, [loggedIn, data]);
  
  if (!films.length) {
    return <Preloader />;
  }

  return (
    <section className="movies-list">
      <ul className="movies-list__wrapper">
        {!isSavedMoviesPage
          ? films.map((movie) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              isSavedMoviesPage={isSavedMoviesPage}
            />
          ))
          : userFilms.map((movie) => (
            <MoviesCard
              key={movie._id || movie.id}
              movie={movie}
              isSavedMoviesPage={isSavedMoviesPage}
            />
          ))}
      </ul>
    </section>
  );
}

MoviesCardList.propTypes = {
  isSavedMoviesPage: PropTypes.bool,
};

export default MoviesCardList;
