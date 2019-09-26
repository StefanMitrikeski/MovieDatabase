import actions from './actions';
import { Router } from 'express';

const { list, get, getWorth } = actions;

const studioRoutes=Router();

studioRoutes.get("/studio", list);
studioRoutes.get("/studio/:name", get);
studioRoutes.get("/studio/:worth/:compare_worth", getWorth);


export default studioRoutes;