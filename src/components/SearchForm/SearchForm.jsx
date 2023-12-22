import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { searchFilm, nullSearchFilm } from "../../utils/store/slices/filmslice";
import { useDebounce } from "../hooks/useDebounce";
import "./SearchForm.css";

function SearchForm() {
  const [activeFilm, setActiveFilm] = useState({});
  const [errMessage, setErrMesage] = useState(false);
  const films = useSelector((state) => state.filmSlice.films);
  const searchStr = useSelector((state) => state.filmSlice.searchStr);
  const [input, setInput] = useState(searchStr);
  const searchFilms = useSelector((state) => state.filmSlice.searchFilms);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    if (Object.entries(activeFilm).length === 0) {
      setErrMesage(true);
    }
  }, [activeFilm]);

  useEffect(() => {
    input.length > 0
      ? dispatch(searchFilm(debouncedInput))
      : dispatch(nullSearchFilm());
  }, [debouncedInput]);

  function inputChange(e) {
    setInput(e.target.value);
    e.target.value !== ""
      ? dispatch(searchFilm(e.target.value))
      : dispatch(nullSearchFilm());
  }

  function changeFilm(item) {
    setActiveFilm(item);
    setInput(item.nameRU + " // " + item.nameEN);
    setErrMesage(false);
  }

  function search(e) {
    e.preventDefault();
    const find = films.find(
      (item) =>
        item.nameEN.toLowerCase() === input.toLowerCase() ||
        item.nameRU.toLowerCase() === input.toLowerCase()
    );
    setActiveFilm(find ? find : {});
    const arrSearch = JSON.parse(localStorage.getItem("searchedFilms")) || [];
    arrSearch.push(input.split(" // ")[0]);
    localStorage.setItem("searchedFilms", JSON.stringify(arrSearch));
    if (!errMessage) {
      navigate(`/movies/${activeFilm.id}`);
    }
  }

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={search} noValidate>
        <input
          type="text"
          placeholder="Фильм"
          className="search-form__input"
          value={input}
          onInput={inputChange}
          required
        />
        <button disabled={errMessage} className="search-form__button">
          Найти
        </button>
      </form>
      <div className="search-form__items">
        {searchFilms.map((item) => (
          <div
            onClick={() => changeFilm(item)}
            className="search-form__item"
            key={item.id}
          >
            {item.nameRU + " // " + item.nameEN}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchForm;
