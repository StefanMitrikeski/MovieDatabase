import { Router } from 'express';
import actions from './actions';

const { list, get } = actions;
 
const genresRouter = Router();

genresRouter.get('/genres', list);
genresRouter.get('/genres/name', get);

export default genresRouter;