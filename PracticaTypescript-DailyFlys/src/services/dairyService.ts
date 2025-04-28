import { NonSensitiveDiaryEntry } from '../types/NonSensitiveDiaryEntry ';
import { DairyEntry, NewDiaryEntry } from '../types/DairyEntryType';
import diaries from '../../data/entries';

const getAllEntries = () : DairyEntry[] => {
  return diaries
}

const getNonSensitiveEntries = () : NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => (
     {
      id,
      date,
      weather,
      visibility
    }
  ))

}

const findById = (id: number): DairyEntry | undefined => {
  return diaries.find(diary => diary.id === id)
}

const addEntry = (data : NewDiaryEntry) : DairyEntry  => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(diary => diary.id)) + 1,
    ...data
  };

  diaries.push(newDiaryEntry)
  return newDiaryEntry
}

export default { getAllEntries, getNonSensitiveEntries, addEntry, findById}

