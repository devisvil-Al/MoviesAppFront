import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { useColor } from "../context/ColorContext";

import {
  getUserInfo,
  clearUserData,
  setLogOut
} from "../../utils/store/slices/userslice";
import { useGetDataUserQuery } from "../../utils/store/query/user";

function Profile() {
  const user = useSelector((state) => state.userSlice);
  const { data } = useGetDataUserQuery({}, { refetchOnMountOrArgChange: true });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { color } = useColor();

  useEffect(() => {
    if (data) {
      dispatch(getUserInfo(data));
    }
  }, [data, user]);

  function logOut() {
    dispatch(setLogOut());
    dispatch(clearUserData());
    navigate("/", { replace: true });
  }
  return (
    <main>
      <section className="profile" style={{ background: color }}>
        <div className="profile__wrapper">
          <h1 className="profile__title">Привет, {user.name}!</h1>
          <div className="profile__form">
            <div className="profile__form-row">
              <h2 className="profile__label">E-mail</h2>
              <p className="profile__email">{user.email}</p>
            </div>
            <div className="profile__buttons">
              <Link to="/history" className="profile__button">
                История поиска
              </Link>
              <Link to="/" onClick={logOut} className="profile__button">
                Выйти из аккаунта
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default Profile;
