import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import style from "./style.module.scss";

function Films() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://yts.mx/api/v2/list_movies.json")
      .then((res) => res.json())
      .then(({ data }) => setMovies(data.movies))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <img
        src="https://media4.giphy.com/media/wnYB3vx9t6PXiq1ubB/giphy.gif?cid=bd60e2b0b6ibsfgcip82c514vyf0pitf5l3b29026xo20lav&rid=giphy.gif&ct=g"
        alt="loading"
      />
    );
  }

  return (
    <React.Fragment>
      <h1>Фильмы</h1>
      <div className={style.films}>
        {movies.map((movie, i) => (
          <Card
            img={movie.medium_cover_image}
            title={movie.title}
            genres={movie.genres}
            key={movie.id}
            id={movie.id}
            rating={movie.rating}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default Films;
