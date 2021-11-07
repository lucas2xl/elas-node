import { callRoutes } from '@modules/Call/routes/call.routes';
import { sessionRoutes } from '@modules/Users/routes/session.routes';
import { usersRoutes } from '@modules/Users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/login', sessionRoutes);
routes.use('/calls', callRoutes);

export { routes };
