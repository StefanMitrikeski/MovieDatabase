import { Router } from 'express';
import actions from './actions';

const { list, getSeriesByLanguage, getSeriesByName, getSeriesRating, getSeriesLength } = actions;
 
const seriesRouter = Router();

seriesRouter.get('/series', list);
seriesRouter.get('/series/:title', getSeriesByName);
seriesRouter.get('/series/:language/seriesLanguage', getSeriesByLanguage);
seriesRouter.get('/series/:rating/:compare_rating', getSeriesRating);
seriesRouter.get('/series/:length/:compare_length ', getSeriesLength);


export default seriesRouter;
