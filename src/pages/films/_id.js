import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { getMovie, getComments } from "../../api/movie";

function FilmId(props) {
  const [state, setState] = useState({
    film: {},
    comments: [],
    loading: true,
    commentValue: "",
  });

  useEffect(() => {
    const { match, history } = props;
    const id = match.params?.id;

    Promise.all([getMovie(id) /*, getComments(id) */])
      .then(([movie /*, comments */]) => {
        setState({
          ...state,
          film: movie,
          comments: [
            { text: "Классный!", name: "Bob", id: 1 },
            { text: "На один раз", name: "John", id: 2 },
          ], // comments
          loading: false,
        });

        document.body.style.backgroundImage = `url('${movie.background_image}')`;
      })
      .catch(() => history.replace("/404"));

    return () => (document.body.style.background = "");
  }, []);

  if (state.loading) {
    return (
      <img
        src="https://media4.giphy.com/media/wnYB3vx9t6PXiq1ubB/giphy.gif?cid=bd60e2b0b6ibsfgcip82c514vyf0pitf5l3b29026xo20lav&rid=giphy.gif&ct=g"
        alt="loading"
      />
    );
  }

  const addComment = () => {
    if (state.commentValue) {
      setState({
        ...state,
        comments: [
          ...state.comments,
          {
            name: "Alex",
            text: state.commentValue,
            id: Math.floor(Math.random() * 1000)
          },
        ],
        commentValue: "",
      });
    }
  };

  const deleteComment = (comment) => {
    const newComments = state.comments.filter((item) => item !== comment);
    setState({
      ...state,
      comments: newComments,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.film}>
        <img
          className={style.poster__img}
          src={
            window.innerWidth > 992
              ? state.film?.large_cover_image
              : state.film?.medium_cover_image
          }
          alt="Poster"
        />
        <div className={style.info}>
          <h1>{state.film?.title_long}</h1>
          <p className={style.description}>{state.film?.description_intro}</p>

          <h3>О фильме:</h3>
          <p>
            <span>Год производства</span>
            {state.film?.year}
          </p>
          <p>
            <span>Жанр</span>
            {state.film?.genres?.join(", ")}
          </p>
          <p>
            <span>Рейтинг</span>
            {state.film?.rating}
          </p>

          {state.film?.torrents && state.film?.torrents.length && (
            <React.Fragment>
              <h3>Скачать Торрент</h3>
              <span>
                {state.film.torrents.map((torrent, index) => (
                  <a
                    key={index}
                    href={torrent.url}
                    style={{ margin: "0 10px" }}
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/utorrent.png"
                      alt="торрент"
                    />
                  </a>
                ))}
              </span>
            </React.Fragment>
          )}
        </div>
      </div>

      <div className={style.comments}>
        <h1>Комментарии</h1>
        {state.comments?.map((comment) => (
          <div className={style.comment__item} key={comment.id}>
            <h3>{comment.name}</h3>
            <p>{comment.text}</p>
            <button onClick={() => deleteComment(comment)}>X</button>
          </div>
        ))}
        <div style={{ display: "flex" }}>
          <input
            value={state.commentValue}
            onChange={({ target }) =>
              setState({ ...state, commentValue: target.value })
            }
          />
          <button onClick={addComment}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default FilmId;
