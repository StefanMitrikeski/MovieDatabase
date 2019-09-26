import database from '../database/mysql';

const { con } = database;

function listAllMovies() {
  const listMovies = 'SELECT * FROM movies';
  return new Promise((resolve, reject) => {
    con.query(listMovies, (err, results) => {
      if (err) reject (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const movies: Array = await listAllMovies();
    res.status(200).send({ success: true, message: 'A list of all movies', body: movies });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSingleMovie(name) {
  const getMovieByNameQuery = 'SELECT * FROM movies where title = ? || length=? || language=? ';
  return new Promise((resolve, reject) => {
    con.query(getMovieByNameQuery, [name, name, name],(err, results) => {
      if (err) reject (err);
      resolve(results);
    });
  });
};

// function getMovieLanguage (language) {
//   const getMovieByLanguageQuery = 'SELECT * FROM movies WHERE language = ?';
//   return new Promise((resolve, reject) => {
//     con.query(getMovieByLanguageQuery, [language], (err, results) => {
//       if (err) {
//         reject (err);
//       }
//       resolve(results);
//     })
//   }) 
// }

// const getMovieByLanguage = async (req, res, next) => {
//   const { language } : { language : string } = req.params;
//   try {
//     const movieLanguage = await getMovieLanguage(language);
//     res.status(200).send({ success: true, message: 'your movie search by language is:', body: movieLanguage });
//   } catch (error) {
//     res.status(500).send({ success: false, message: 'internal server error'});
//   }
//   await next;
// }

const getMovieByName = async (req, res, next) => {
  const { name } : { name : string} = req.params;
  try {
    const movieName = await getSingleMovie(name);
    res.status(200).send({ success: true, message: `your movie search ${name}:`, body: movieName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getMovieRatingPromise (rating, compare_rating) {
  const getMovieByRatingQuery = 'SELECT * FROM movies WHERE rating > ? AND rating < ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieByRatingQuery, [parseFloat(rating), parseFloat(compare_rating)], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getMovieRating = async (req, res, next) => {
  const { rating } : { rating : string } = req.params;
  const { compare_rating } : { compare_rating : string } = req.params;
  try {
    const movieRating = await getMovieRatingPromise(rating, compare_rating);
    res.status(200).send({ success: true, message: 'your movie search by rating is:', body: movieRating });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getMovieLengthPromise (length, compare_length) {
  const getMovieByLengthQuery = 'SELECT * FROM movies WHERE length > ? AND length < ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieByLengthQuery, [length, compare_length], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getMovieLength = async (req, res, next) => {
  const { length } : { length: string }= req.params;
  const { compare_length } : { compare_length: string }= req.params;
  try {
    const movieLength = await getMovieLengthPromise(length, compare_length);
    res.status(200).send({ success: true, message: `your movie search by length is:`, body: movieLength });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

export default {
  list,
  getMovieByName,
  // getMovieByLanguage,
  getMovieRating,
  getMovieLength
} 