import { NavLink } from "react-router-dom";
import style from "./card.module.scss";

const defaultImg =
  "https://cdn.pixabay.com/photo/2017/01/25/17/35/camera-2008489_1280.png";

function Card({ img, title, genres, id, rating }) {
  return (
    <NavLink to={"film/" + id} className={style.card}>
      <img src={img || defaultImg} alt="Poster" />
      <div className={style.container}>
        <h4>
          <b>{title || "Без названия"}</b>
        </h4>
        <p>
          <small>{genres?.join(", ")}</small>
        </p>
      </div>

      <div className={style.rating}>{rating}</div>
    </NavLink>
  );
}

export default Card;
