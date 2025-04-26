import { NonSensitiveDiaryEntry } from '../types/NonSensitiveDiaryEntry ';
import { DairyEntry } from '../types/DairyEntryType';
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

const addEntry = ()  => {
  return null
}

export default { getAllEntries, getNonSensitiveEntries, addEntry, findById}

