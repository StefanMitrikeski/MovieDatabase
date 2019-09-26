import database from '../database/mysql';

const { con } = database;

function listAllDirectors() {
  const listDirector = 'SELECT * FROM directors';
  return new Promise((resolve, reject) => {
    con.query(listActors, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const director: Array = await listAllDirectors();
    res.status(200).send({ success: true, message: 'A list of all director', body: director });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}


function getDirectorByName(name) {
  const getDirectorByNameQuery = 'SELECT * FROM directors WHERE first_name=? || last_name=?';
  return new Promise((resolve, reject) => {
    con.query(getDirectorByNameQuery, [name, name],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { name }: { name : string } = req.params;
  try {
    const searchDirectorByName = await getDirectorByName(name);
    res.status(200).send({ success: true, message: `your searching director by ${name} :`, body: searchDirectorByName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function compareDates(birth_date, compare_date) {
  const getDirectorsByDateQuery = `SELECT * FROM directors WHERE birth_date > ? AND birth_date < ?`;
  return new Promise((resolve, reject) => {
    con.query(getDirectorsByDateQuery, [birth_date, compare_date],(err, results) => {
      if (err) reject (err);
      resolve(results);
    });
  });
};

const getDates = async (req, res, next) => {
  const {birth_date}: {birth_date: string} = req.params;
  const {compare_date}: {compare_date: string} = req.params;

  try {
    const searchByDate = await compareDates(birth_date, compare_date);
    res.status(200).send({ success: true, message: 'your searching director by date :', body: searchByDate });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

export default {
  list,
  get,
  getDates
} 