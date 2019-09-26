import database from '../database/mysql';

const { con } = database;

function listAllActors() {
  const listActors = 'SELECT * FROM actors';
  return new Promise((resolve, reject) => {
    con.query(listActors, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const actors: Array = await listAllActors();
    res.status(200).send({ success: true, message: 'A list of all actors', body: actors });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
};
function getActorByName(name) {
  const getActorByNameQuery = 'SELECT * FROM actors WHERE first_name = ? || last_name = ?';
  return new Promise((resolve, reject) => {
    con.query(getActorByNameQuery, [name, name],(err, results) => {
      if (err) reject (err);
      console.error(err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { name } : { name: string }= req.params;
    try {
      const searchActorByName = await getActorByName(name);
      res.status(200).send({ success: true, message: `your searching actors by ${ name } :`, body: searchActorByName });
    } catch (error) {
      res.status(500).send({ success: false, message: 'internal server error'});
    } 
 
  await next;
}


function compareDates(birth_date, compare_date) {
  const getActorByNameQuery = `SELECT * FROM actors WHERE birth_date > ? AND birth_date < ?`;
  return new Promise((resolve, reject) => {
    con.query(getActorByNameQuery, [birth_date, compare_date],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const getDates = async (req, res, next) => {
  const {birth_date}: {birth_date: string} = req.params;
  const {compare_date}: {compare_date: string} = req.params;

  try {
    const searchByDate = await compareDates(birth_date, compare_date);
    res.status(200).send({ success: true, message: 'your searching actors by date :', body: searchByDate });
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