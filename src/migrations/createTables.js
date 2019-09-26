const adminCreateModel = `
  CREATE TABLE IF NOT EXISTS administrator (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phonenumber VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    salt VARCHAR(255),
    created_at DATE,
    update_at DATE,
    deleted_at DATE,
    lastSignIn DATE,
    PRIMARY key (id)
  )
`;

const moviesCreateModel = `
  CREATE TABLE IF NOT EXISTS movies (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    length VARCHAR(45) NOT NULL,
    release_date VARCHAR(45) NOT NULL,
    rating VARCHAR(10) NOT NULL,
    language VARCHAR(45) NOT NULL,
    directors_movies_id INT(11) NOT NULL,
    studio_id INT(11) NOT NULL,
    genres_movies_id INT (11) NOT NULL,
    PRIMARY KEY (id)
  )
`;

const actorsCreateModel = `
  CREATE TABLE IF NOT EXISTS actors (
    id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    birth_date VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
  )
`;

const directorsCreateModel = `
  CREATE TABLE IF NOT EXISTS directors (
    id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    birth_date VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
  )
`;

const seriesCreateModel = `
  CREATE TABLE IF NOT EXISTS series (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    language VARCHAR (45) NOT NULL,
    release_date VARCHAR(45) NOT NULL,
    length VARCHAR(45) NOT NULL,
    rating VARCHAR(45) NOT NULL,
    directors_series_id INT (11) NOT NULL,
    genres_series_id INT (11) NOT NULL,
    PRIMARY key (id)
  )
`;

const studioCreateModel = `
  CREATE TABLE IF NOT EXISTS studio (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR (45) NOT NULL,
    worth VARCHAR (45) NOT NULL,
    ceo VARCHAR (45) NOT NULL,
    PRIMARY key (id)
  )
`;

const genresCreateModel = `
  CREATE TABLE IF NOT EXISTS genres (
    id INT (11) NOT NULL AUTO_INCREMENT,
    genre_name VARCHAR(45),
    PRIMARY KEY (id)
  )
`;



export default {
  adminCreateModel,
  moviesCreateModel,
  actorsCreateModel,
  directorsCreateModel,
  seriesCreateModel,
  studioCreateModel,
  genresCreateModel
}