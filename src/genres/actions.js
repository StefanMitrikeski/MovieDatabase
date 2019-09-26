import database from '../database/mysql';

const { con } = database;

function listAllGenres() {
  const listGenres = 'SELECT * FROM genres';
  return new Promise((resolve, reject) => {
    con.query(listGenres, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const genres: Array = await listAllGenres();
    res.status(200).send({ success: true, message: 'A list of all genres', body: genres });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getByGenre (genre_name) {
  const getMovieByGenreQuery = 'SELECT * FROM genre WHERE genre_name = ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieByGenreQuery, [genre_name],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { genre_name }: { genre_name:string } = req.params;
  try {
    const searchByGenre = await getByGenre(genre_name);
    res.status(200).send({ success: true, message: 'you are searching genres', body: searchByGenre });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

export default {
  list,
  get
}