import "./History.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";

import { setSearchStr } from "../../utils/store/slices/filmslice";
import { getSearchedFilms, setSearchedFilms } from "../../utils/const/const";

function History() {
  const [searchFilms, setSearchFilms] = useState(getSearchedFilms);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function setSearch(film) {
    dispatch(setSearchStr(film));
    navigate("/movies/");
  }

  function delHistory(film) {
    const arrSearch = getSearchedFilms;
    arrSearch.splice(arrSearch.indexOf(film), 1);
    setSearchedFilms("searchedFilms", arrSearch);
    setSearchFilms(arrSearch);
  }

  return (
    <main>
      <section className="history">
        <h1 className="history__title"> История поиска</h1>
        <ul className="history__items">
          {searchFilms.map((film, index) => (
            <li className="history__item" key={index}>
              <div
                onClick={() => setSearch(film)}
                type="button"
                className="history__name"
              >
                {film}
              </div>
              <button
                onClick={() => delHistory(film)}
                className="history__delete"
                type="button"
              ></button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default History;
