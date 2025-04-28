import express from 'express';
import dairyService from '../services/dairyService';
import { toNewDiaryEntry } from '../utils/toNewDiaryEntry';

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
  try {
    const newDairyEntry = toNewDiaryEntry(req.body);
    const addedEntry = dairyService.addEntry( newDairyEntry);
    res.send(addedEntry)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error:'+ error.message;
    }
    res.status(400).send(errorMessage);
  }
  
});

export default router