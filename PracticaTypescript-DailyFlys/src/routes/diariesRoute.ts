import express from 'express';
import dairyService from '../services/dairyService';

const router = express.Router()

router.get('/ping', (_req, res) => {
  res.send('pong');
});

router.get( '/', (_req, res)  => {
  res.send(dairyService.getNonSensitiveEntries())
}); 

router.get('/:id', (req, res) => {  
  const diary = dairyService.findById(+req.params.id)
  if (diary) {
    res.status(202).send(diary)
  }else {
    res.sendStatus(404);
  }
});


router.post('/', (req, res) => {
  console.log('adding a diary', req.body);
  res.send('adding a diary')
});

export default router