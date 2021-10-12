const getMovie = (id) => {
  return new Promise((res, rej) => {
    fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then((res) => res.json())
      .then(({ data }) => res(data.movie))
      .catch(() => rej());
  });
};

const getComments = (id) => {
  return new Promise((res, rej) => {
    fetch(`https://yts.mx/api/v2/movie_comments.json?movie_id=${id}`)
      .then((res) => res.json())
      .then(({ data }) => res(data))
      .catch(() => rej());
  });
};

export { getMovie, getComments };
