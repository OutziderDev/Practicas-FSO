import diaryRouter from './routes/diariesRoute';
import express from 'express';
import cors from 'cors'

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});