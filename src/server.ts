import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';
import { authRouter } from './modules/auth';
import { userRouter } from './modules/users';
import cookieParser from 'cookie-parser';
import { historyRouter } from './modules/history';
import { env } from './lib';
import { logger } from './lib';
import { teamRouter } from './modules/teams';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.get('/', (req: Request, res: Response) => {
      res.send('Hello World From PCH Service');
});

app.use('/api-docs.json', (req: Request, res: Response) => {
      res.json(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/history', historyRouter);
app.use('/api/v1/teams', teamRouter);

app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode URL:${env.BASE_URL}/api-docs`);
});