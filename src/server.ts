import 'dotenv/config';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { AppError } from '@shared/errors/AppError';
import swaggerUi from 'swagger-ui-express';
import docs from '@configs/docs.json';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { routes } from '@shared/http/routes';

const port = process.env.PORT || 4000;

const app = express();
const http = createServer(app);
const socketIO = new Server(http, {
  cors: {
    origin: '*',
  },
});
app.use(
  cors({
    origin: '*',
  }),
);

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

socketIO.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('call', () => {
    socketIO.emit('user-call');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

http.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
