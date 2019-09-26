import database from '../database/mysql';

const { con } = database;

function listAllSeries() {
  const listSeries = 'SELECT * FROM series';
  return new Promise((resolve, reject) => {
    con.query(listSeries, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const series: Array = await listAllSeries();
    res.status(200).send({ success: true, message: 'A list of all series', body: series });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}


function getSingleSeries(title) {
  const getSeriesByNameQuery = 'SELECT * FROM series where title = ?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesByNameQuery, [title],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

function getSeriesLanguage (language) {
  const getLanguageQuery = 'SELECT * FROM series WHERE language = ?';
  return new Promise((resolve, reject) => {
    con.query(getLanguageQuery, [language], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}
const getSeriesByLanguage = async (req, res, next) => {
  const { language } : { language : string } = req.params;
  try {
    const seriesLanguage = await getSeriesLanguage(language);
    res.status(200).send({ success: true, message: 'your series search by language is:', body: seriesLanguage });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

const getSeriesByName = async (req, res, next) => {
  const { title } : { title : string} = req.params;
  try {
    const seriesName = await getSingleSeries(title);
    res.status(200).send({ success: true, message: 'your series search by title is:', body: seriesName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSeriesRatingPromise (rating, compare_rating) {
  const getSeriesByRatingQuery = 'SELECT * FROM series WHERE rating > ? AND rating < ?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesByRatingQuery, [rating, compare_rating], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getSeriesRating = async (req, res, next) => {
  const { rating } : { rating : string } = req.params;
  const { compare_rating } : { compare_rating : string } = req.params;
  try {
    const seriesRating = await getSeriesRatingPromise(rating, compare_rating);
    res.status(200).send({ success: true, message: 'your series search by rating is:', body: seriesRating });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}
function getSeriesLengthPromise (length, compare_length) {
  const getSeriesByLengthQuery = 'SELECT * FROM series WHERE length > ? AND length < ?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesByLengthQuery, [length, compare_length], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getSeriesLength = async (req, res, next) => {
  const { length } : { length: string }= req.params;
  const { compare_length } : { compare_length: string }= req.params;
  try {
    const seriesLength = await getSeriesLengthPromise(length, compare_length);
    res.status(200).send({ success: true, message: `your series search by length is:`, body: seriesLength });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

export default {
  list,
  getSeriesByLanguage,
  getSeriesByName,
  getSeriesRating,
  getSeriesLength
} 