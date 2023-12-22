import "./NotFound.css";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const handleClick = (evt) => {
    evt.preventDefault();
    navigate(-1);
  };
  return (
    <main>
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <Link to="/" onClick={handleClick} className="not-found__link">
          Назад
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
