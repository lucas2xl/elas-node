import { Router } from 'express';
import { isAuthenticate } from '@shared/http/middlewares/isAuthenticate';
import { CreateCallController } from '../controller/CreateCallController';
import { UpdateCallController } from '../controller/UpdateCallController';

const callRoutes = Router();
const createCallController = new CreateCallController();
const updateCallController = new UpdateCallController();

callRoutes.post('/', isAuthenticate, createCallController.handle);
callRoutes.put('/', isAuthenticate, updateCallController.handle);

export { callRoutes };
