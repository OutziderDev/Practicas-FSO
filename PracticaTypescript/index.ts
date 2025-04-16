import express from 'express';
import { calculator } from './calculator';
const app = express();
const PORT = 3003

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.get('/calculate', (req, res) => {
  const { value1, value2, op } = req.body

  if ( !value1 || isNaN(Number(value1)) ) {
    res.status(400).send({ error: '...'});
  }

  const result = calculator(Number(value1),Number(value2),op);
  res.send({result})
})

app.listen(PORT, () => {
  console.log('Server running on port:' + PORT);
  
})