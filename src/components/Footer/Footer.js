import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Aston</h2>
      <div className="footer__container">
        <p className="footer__copyright"> &copy; {new Date().getFullYear()}</p>
        <p className="footer__name">Медовник Даниил</p>
      </div>
    </footer>
  );
}

export default Footer;
