import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { routes } from './routes';
import { AppError } from '@shared/errors/AppError';
import swaggerUi from 'swagger-ui-express';
import docs from '@configs/docs.json';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use('/v1', routes);

app.use(errors());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };
