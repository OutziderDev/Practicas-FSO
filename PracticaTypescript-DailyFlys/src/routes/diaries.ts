import express from 'express';
/* import data from '../../diaryentries.json'
 */
const router = express.Router()

router.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

router.get( '/', (_req, res)  => {
  console.log('fetching all diaries');
  res.send('fetching all')
}) 

router.post('/', (req, res) => {
  console.log('adding a diary', req.body);
  res.send('adding a diary')
})

export default router