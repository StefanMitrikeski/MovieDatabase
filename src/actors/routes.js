import { Router } from 'express';
import actions from './actions';

const { list, get, getDates } = actions;
 
const actorRouter = Router();

actorRouter.get('/actors', list);
actorRouter.get('/actors/:name', get);
actorRouter.get('/actors/:birth_date/:compare_date', getDates);


export default actorRouter;


 