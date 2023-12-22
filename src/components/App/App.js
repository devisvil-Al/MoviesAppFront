import "./App.css";

import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import { ColorProvider } from "../context/ColorContext";

const Main = lazy(() => import("../Main/Main"));
const Movies = lazy(() => import("../Movies/Movies"));
const Movie = lazy(() => import("../Movie/Movie"));
const SavedMovies = lazy(() => import("../SavedMovies/SavedMovies"));
const Profile = lazy(() => import("../Profile/Profile"));
const Register = lazy(() => import("../Register/Register"));
const Login = lazy(() => import("../Login/Login"));
const NotFound = lazy(() => import("../NotFound/NotFound"));
const ProtectedRoute = lazy(() => import("../ProtectedRoute/ProtectedRoute"));
const History = lazy(() => import("../History/History"));

function App() {
  return (
    <div className="app">
      <div className="app__container">
        <ColorProvider>
          <Header />
        </ColorProvider>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={<Movies />} />
            <Route
              path="/saved-movies"
              element={<ProtectedRoute element={<SavedMovies />} />}
            />
            <Route
              path="/movies/:id"
              element={<Movie />}
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={
                    <ColorProvider>
                      <Profile />
                    </ColorProvider>
                  }
                />
              }
            />
            <Route
              path="/history"
              element={<ProtectedRoute element={<History />} />}
            />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
