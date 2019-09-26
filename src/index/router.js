import { Router } from 'express';
import movies from '../movies/index';
import actors from '../actors/index';
import admins from '../administrator/index';
import directors from '../directors/index';
import studio from '../studio/index';
import series from '../series/index';
import genres from '../genres/index';

const { routes } = movies;


const indexRouter = Router();

indexRouter.use(routes);
indexRouter.use(actors.routes);
indexRouter.use(admins.routes);
indexRouter.use(directors.routes);
indexRouter.use(studio.routes);
indexRouter.use(series.routes);
indexRouter.use(genres.routes)

export default indexRouter;