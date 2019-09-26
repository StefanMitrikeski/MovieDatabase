import database from '../database/mysql';

const { con } = database;

function listAllStudios() {
  const listStudios = 'SELECT * FROM studio';
  return new Promise((resolve, reject) => {
    con.query(listStudios,(err, results) => {
      if (err){
        reject (err)
      };
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {

  const studios: Array = await listAllStudios();
  let studio=[];

  for (let i = 0; i < studios.length; i++) {
      let name = studios[i].name;
      studio.push(name);
    }
  
  try {
    
    res.status(200).send({ success: true, message: 'A list of all studios', body: {studio} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getStudio(name) {
  const getStudioQuery = 'SELECT * FROM studio WHERE name=?';
  return new Promise((resolve, reject) => {
    con.query(getActorByNameQuery, [name],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { name }: { name : string } = req.params;
  try {
    const searchStudio = await getStudio(name);
    res.status(200).send({ success: true, message: 'your searching studio by  name :', body: searchStudio });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getStudioByWorth(worth, compare_worth) {
  const getStudioByWorthQuery = 'SELECT * FROM studio WHERE worth > ? AND worth < ?';
  return new Promise((resolve, reject) => {
    con.query(getStudioByWorthQuery, [parseFloat(worth), parseFloat(compare_worth)],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const getWorth = async (req, res, next) => {
  const { worth }: { worth : string } = req.params;
  const { compare_worth }: { compare_worth : string } = req.params;
  try {
    const searchStudioWorth = await getStudioByWorth(worth, compare_worth);
    res.status(200).send({ success: true, message: 'your searching studio by worth :', body: searchStudioWorth });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}


export default {
  list,
  get,
  getWorth
} 