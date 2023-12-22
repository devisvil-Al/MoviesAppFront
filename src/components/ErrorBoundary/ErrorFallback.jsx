import "./ErrorFallback.css";

function ErrorFallback() {
  return (
    <p className="error">
      Во время запроса произошла ошибка. Возможно, проблема с соединением или
      сервер недоступен. Подождите немного и попробуйте ещё раз.
    </p>
  );
}

export default ErrorFallback;
