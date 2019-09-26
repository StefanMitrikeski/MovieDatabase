import { Router } from 'express';
import actions from './actions';

const { list, getSeriesByName, getSeriesRating, getSeriesLength } = actions;
 
const seriesRouter = Router();

seriesRouter.get('/series', list);
seriesRouter.get('/series/:name', getSeriesByName);
// seriesRouter.get('/series/:language/seriesLanguage', getSeriesByLanguage);
seriesRouter.get('/series/:rating/:compare_rating', getSeriesRating);
seriesRouter.get('/series/:length/:compare_length/length ', getSeriesLength);


export default seriesRouter;
