import "./Movies.css";
import { ErrorBoundary } from "react-error-boundary";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import ErrorFallback from "../ErrorBoundary/ErrorFallback";

function Movies() {
  return (
    <>
      <main>
        <section className="movies">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SearchForm />
            <MoviesCardList isSavedMoviesPage={false} />
          </ErrorBoundary>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
