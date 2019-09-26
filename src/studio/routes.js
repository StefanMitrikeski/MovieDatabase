import actions from './actions';
import { Router } from 'express';

const { list, get, getWorth, getStudioMovies } = actions;

const studioRoutes=Router();

studioRoutes.get("/studio", list);
studioRoutes.get("/studio/:name", get);
studioRoutes.get("/studio/:worth/:compare_worth", getWorth);
studioRoutes.get('/studio/movies/:name/name', getStudioMovies);


export default studioRoutes;