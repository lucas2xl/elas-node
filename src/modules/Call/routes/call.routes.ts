import { Router } from 'express';
import { isAuthenticate } from '@shared/http/middlewares/isAuthenticate';
import { CreateCallController } from '../controller/CreateCallController';
import { UpdateCallController } from '../controller/UpdateCallController';
import { GetCallController } from '../controller/GetCallController';

const callRoutes = Router();
const createCallController = new CreateCallController();
const getCallController = new GetCallController();
const updateCallController = new UpdateCallController();

callRoutes.post('/', isAuthenticate, createCallController.handle);
callRoutes.put('/', isAuthenticate, updateCallController.handle);
callRoutes.get('/', isAuthenticate, getCallController.handle);

export { callRoutes };
