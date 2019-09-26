import { Router } from 'express';
import actions from './actions';

const { list, getMovieByName, getMovieRating, getMovieLength } = actions;
 
const moviesRouter = Router();

moviesRouter.get('/movies', list);
moviesRouter.get('/movies/:name', getMovieByName);
// moviesRouter.get('/movies/:language/movieLanguage', getMovieByLanguage);
moviesRouter.get('/movies/:rating/:compare_rating', getMovieRating);
moviesRouter.get('/movies/:length/:compare_length/length', getMovieLength);


export default moviesRouter;