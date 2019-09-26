import Router from 'express';
import actions from './actions';

const { list, get, getDates } = actions;

const directorRoutes = Router();

directorRoutes.get('/directors', list);
directorRoutes.get('/directors/:name', get);
directorRoutes.get('/directors/:birth_date/:compare_date', getDates);

export default directorRoutes;