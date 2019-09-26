import { Router } from 'express';
import actions from './actions';
import jwt from 'jsonwebtoken';

const {
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
  } = actions;

 
const adminRouter = Router();

adminRouter.get('/admin', list);
adminRouter.get('/admin/:name', get);
adminRouter.post('/admin', create);
adminRouter.post('/admin/:id/movies', createMovie);
adminRouter.post('/actors', createActor);
adminRouter.post('/directors', createDirector);
adminRouter.post('/studios', createStudio);
adminRouter.post('/series', createSeries);
adminRouter.post('/admin/:id/genre/', createGenre);
adminRouter.post('/sign_up ', login);
adminRouter.put('/admin/:id', updateMovie);
adminRouter.delete('/admin/:id', deleteAdmin);
adminRouter.put('/admin/:id/worth', updateStudioWorth);
adminRouter.put('/admin/:id/series', updateSeries);


export default adminRouter;