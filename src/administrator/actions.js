import database from '../database/mysql';
import Bluebird from "bluebird";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { resolve } from 'path';
import { getMaxListeners } from 'cluster';

const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt)

function listAllAdmins() {
  const listAdmins = 'SELECT * FROM administrator';
  return new Promise((resolve, reject) => {
    con.query(listAdmins, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const admins: Array = await listAllAdmins();
    res.status(200).send({ success: true, message: 'A list of all administrators', body: admins });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getAdministratorByName(name) {
  const getActorByNameQuery = 'SELECT * FROM administrator WHERE username = ? || email = ?';
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
      const searchActorByName = await getAdministratorByName(name);
      res.status(200).send({ success: true, message: `your searching actors by ${ name } :`, body: searchActorByName });
    } catch (error) {
      res.status(500).send({ success: false, message: 'internal server error'});
    } 
 
  await next;
}

function validatePhoneNumber (phonenumber) {
  if (phonenumber.charAt(0) === "(" && phonenumber.charAt(4) === ")" && phonenumber.charAt(8) === "-") {
    return true;
  } else if (phonenumber.charAt(0) === "+" && phonenumber.length <= 15) {
    return true;
  } else if (phonenumber.length <= 9) {
    return true;
  } else if (phonenumber.charAt(4) === "-" && phonenumber.charAt(8) === "-" && phonenumber.length === 12) {
    return true;
  } else {
    return false;
  }
};

function validateEmail (email) {
  if( email.includes('@yahoo.com') || email.includes('@gmail.com') || email.includes('@hotmail.com') ) {
    return true;
  }
    return false;
};
  
function createWithPromise (username, email, phonenumber, passHash, salt, createAt) {
    const createNewAdmin = 'INSERT INTO administrator(username, email, phonenumber, password, salt, created_at) VALUES (?,?,?,?,?,?)';
    return new Promise((resolve, reject) => {
      con.query(createNewAdmin, [username, email, phonenumber, passHash, salt, createAt], (err, results) => {
        if (err) {
          reject(err);
          console.log(err)
        }
        resolve(results);
      });
    });
};

const create = async (req, res,next) => {
  const {
    username, 
    email,
    phonenumber,
    password
  }: {
    username: string,
    email: string,  
    phonenumber: string,
    password: string
  
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const getRounds = bcrypt.getRounds(salt);
  const passHash = bcrypt.hashSync(password, getRounds);
  const createAt = new Date(Date.now());

  const createVerification = validatePhoneNumber(phonenumber);
  const createEmailVal = validateEmail(email);
  const listAdmins = await listAllAdmins();

  if (listAdmins === null) {
    const createdAdmin = await createWithPromise(username, email, phonenumber, passHash, salt, createAt);
    res.status(201).send({ success: true, message: 'Created new admin', body: {username, email, phonenumber, password}});
  } else {
      for (let i = 0; i < listAdmins.length; i++) {
        if (username === listAdmins[i].username || email === listAdmins[i].email || phonenumber === listAdmins[i].phonenumber) {
          return res.status(400).send({success: false, message: "Check your username or e-mail or phonenumber"});
      };
    };
  }

  if(createVerification === true && createEmailVal === true){
    try {
      const createPromise = await createWithPromise(username, email, phonenumber, passHash, salt, createAt);
      res.status(201).send({success: true, message: "created new Administrator", data: { username, email, phonenumber, passHash } });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Server error' });
    }
  }else{
    res.status(404).send({ success: false, message: 'glup si bratche' });
  } 
  await next;
};

function createSingleMovie (title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_id) {
  const createNewMovie = 'INSERT INTO movies (title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_iddate, rating, language, directors_id, studio_id) VALUES (?,?,?,?,?,?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewMovie, [title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const createMovie = async (req, res, next) => {
  const {
    title,
    length,
    release_date, 
    rating,
    language,
    directors_movies_id,
    studio_id,
    genres_movies_id
  }: {
    title: string,
    length: string,
    release_date: string,
    rating: string,
    language: string,
    directors_movies_id: number,
    studio_id: number,
    genres_movies_id : number
  } = req.body;
  
  try {
    const newMovie = await createSingleMovie (title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_idd);
    res.status(201).send({ success: true, message: 'Created new movie', body: {title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_id} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error'});
  }
  await next;
}

function updateRating( id, rating ){
const update = `UPDATE movies SET rating =? WHERE id=?`;
return new Promise((resolve, reject)=>{
con.query(update,[ id, rating ],(err,results)=>{
  if(err) reject(err);
  resolve(results)
});
});
};

const updateMovie = async (req,res,next) =>{
  const { id }:{ id: string }=req.params; 
  const { rating }:{ rating: string }=req.body;
  
  try {
   const upDate= await updateRating(id,rating);
   res.status(201).send({ success: true, message: 'updated Movie rating', body: {upDate} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  await next;
};

function updateSeriesRating(rating, id){
  const update = `UPDATE series SET rating =? WHERE id=?`;
  return new Promise((resolve, reject)=>{
  con.query(update,[rating, id],(err,results)=>{
    if(err) reject(err);
    resolve(results)
  });
  });
};
 
  
const updateSeries = async (req,res,next) =>{
    const { id }:{ id: string }=req.params; 
    const { rating }:{ rating: string }=req.body;
    
    try {
     const upDate= await updateSeriesRating(rating, id);
     res.status(201).send({ success: true, message: 'updated Series rating', body: {upDate} });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Server error' });
    }
    await next;
};

function createSingleActor(first_name, last_name, birth_date){
  const createNewActor = 'INSERT INTO actors (first_name, last_name, birth_date) VALUES (?,?,?)';
  return new Promise((resolve, reject)=>{
    con.query(createNewActor, [first_name, last_name, birth_date], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const createActor = async (req, res,next) => {
  const {
    first_name,
    last_name,
    birth_date
  }: {
    first_name: string,
    last_name: string,
    birth_date: string
  } = req.body;

  try {
    const actors = await createSingleActor(first_name, last_name, birth_date);
    res.status(201).send({ success: true, message: 'Created new actor', body: {first_name, last_name, birth_date} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
};

function createSingleDirector(first_name, last_name, birth_date){
  const createNewDirector = 'INSERT INTO directors (first_name, last_name, birth_date) VALUES (?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewDirector, [first_name, last_name, birth_date], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const createDirector = async (req, res,next) => {
  const {
    first_name,
    last_name,
    birth_date
  }: {
    first_name: string,
    last_name: string,
    birth_date: string
  } = req.body;

  try {
    const director = await createSingleDirector(first_name, last_name, birth_date);
    res.status(201).send({ success: true, message: 'Created new director', body: {first_name, last_name, birth_date} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
};

function createSingleStudio(name, worth, ceo){
  const createNewStudio = 'INSERT INTO studio (name, worth, ceo) VALUES (?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewStudio, [name, worth, ceo], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const createStudio = async (req, res,next) => {
  const {
    name,
    worth,
    ceo
  }: {
    name: string,
    worth: string,
    ceo: string
  } = req.body;

  try {
    const studio = await createSingleStudio(name, worth, ceo);
    res.status(201).send({ success: true, message: 'Created new studio', body: {name, worth, ceo} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
};

function createSingleSeries (title, language, release_date, length, rating, directors_id, genres_series_id) {
  const createNewSeries = 'INSERT INTO series(title, language, release_date, length, rating, directors_id, genres_series_id) VALUES (?,?,?,?,?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewSeries, [title, language, release_date, length, rating, directors_id, genres_series_id ], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const createSeries = async (req, res,next) => {
  const {
    title, 
    language, 
    release_date, 
    length, 
    rating, 
    directors_id,
    genres_series_id
  }: {
    title : string,
    language : string,
    release_date : string,
    length : string,
    rating : string,
    directors_id : number,
    genres_series_id : number
  } = req.body;

  try {
    const studio = await createSingleSeries(title, language, release_date, length, rating, directors_id, genres_series_id);
    res.status(201).send({ success: true, message: 'Created new studio', body: {title, language, release_date, length, rating, directors_id, genres_series_id} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
};

function createMovieGenre (genre_name) {
  const createNewGenre = 'INSERT INTO genres (genre_name) VALUES (?)';
  return new Promise((resolve, reject) => {
    con.query(createNewGenre, [genre_name], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const createGenre = async (req, res, next) => {
  const { genre_name }: { genre_name : string } = req.body;
  try {
    const newGenre = await createMovieGenre (genre_name);
    res.status(201).send({ success: true, message: 'Created new studio', body: {genre_name} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
};

const login = async (req, res, next) => {
  const { 
    username, 
    email, 
    password 
  } : { 
    username: ?string, 
    email: ?string, 
    password: string 
  } = req.body; 

  const adminWithUsernameOrEmail = 'SELECT * FROM administrator WHERE username = ? OR email = ?';
  return con.query(adminWithUsernameOrEmail, [username, email], (err, results) => {
    if(err) {
      console.error(err);
    }

    const adminUser = results.find(userObj => userObj.username === username);
    const adminEmail = results.find(emailObj => emailObj.email === email);
    
    if (!adminEmail) {
      if (results && results.length && adminUser.username) {
        const matchPassword : boolean = bcrypt.compareSync(password, adminUser.password);
        if (matchPassword) {
          delete adminUser.password;
          delete adminUser.salt;
          const adminIdUser = adminUser.id;
          const token = jwt.sign({ adminUser }, 'aaaa', { expiresIn: '1h'});
          res.status(200).send({message: 'Logged in', token: token});
        } else {
          res.status(403).send('Password is not correct');
        }
      } else {
          res.status(404).send(`User with username ${username} not found!`);
        }
    } else {
      if (results && results.length && adminEmail.email) {
        const matchPassword : boolean = bcrypt.compareSync(password, adminEmail.password);
          if (matchPassword) {
            delete adminEmail.password;
            delete adminEmail.salt;
            const adminIdEmail = adminEmail.id;
            const token = jwt.sign({ adminEmail }, 'aaaa', { expiresIn: '1h'});
            res.status(200).send({message: 'Logged in', token: token});
          } else {
            res.status(403).send('Password is not correct');
            }
      } else {
        res.status(404).send(`User with email ${email} not found!`);
        } 
    }
  });
  await next;
}

function deleteWithPromise(id){
  const deleteQuery=`DELETE FROM administrator WHERE id=?`;
  return new Promise((resolve, reject) => {
    con.query(deleteQuery,[id],(err, results)=>{
      if(err) reject(err);
      resolve(results);
    });
  });
}

const deleteAdmin = async(req, res, next) => {
  const{ id }:{ id: string }=req.params;
  try {
    const deletePromise = await deleteWithPromise(id);
    res.status(204).send({ success:true, message:`deleted Admin`, body: deletePromise });
  } catch (error) {
    res.status(500).send({ success:true, message:`Greshka bratche` });
  }
await next;
}

function updateStudioWorthPromise(worth, id){
  const updateWorth = `UPDATE studio SET worth = ? WHERE id = ?`;
  return new Promise( (resolve, reject) => {
  con.query(updateWorth, [id, worth], (err,results) => {
    if(err) reject(err);
    resolve(results)
  });
  });
};
  
const updateStudioWorth = async (req,res,next) =>{
    const { id }:{ id: string } = req.params; 
    const { worth }:{ worth: string } = req.body;
    
    try {
     const upDate = await updateStudioWorthPromise(worth, id);
     res.status(201).send({ success: true, message: 'updated worth', body: { upDate } });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Server error' });
    }
  await next;
};

export default {
  list,
  get,
  create,
  createMovie,
  createActor,
  createDirector,
  createStudio,
  createSeries,
  createGenre,
  login,
  updateMovie,
  deleteAdmin,
  updateStudioWorth,
  updateSeries
} 