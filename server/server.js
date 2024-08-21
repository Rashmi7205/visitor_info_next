import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import visitRouter from './routes/visitRoutes.js';
import bodyParser from 'body-parser';
import {config} from 'dotenv';

const app = express();
const port = 3001;

config();
app.use(cors(
  {
  origin: ['*','http://localhost:3000'],
}
));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/visitor', visitRouter);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
