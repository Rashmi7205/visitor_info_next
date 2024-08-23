import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import visitRouter from './routes/visitRoutes.js';
import bodyParser from 'body-parser';
import {config} from 'dotenv';
import sendSms from './middleware/sendSms.js';

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

// sendSms(7205529539,`Dear visitor ,Welcome to Ikontel Solutions Pvt. Ltd.
//   .Please Use 1234 to verify your Mobile number. 
//   Thank You Ikontel Solutions Pvt.Ltd.Team.`);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
