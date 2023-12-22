import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies() {
  return (
    <>
      <main>
        <section className="movies saved-movies">
          <MoviesCardList isSavedMoviesPage={true} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
