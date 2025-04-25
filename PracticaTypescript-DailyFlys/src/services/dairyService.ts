import dairyData from '../../data/entries.json';
import { DairyEntry } from '../types/DairyEntry';

const diaries : DairyEntry[] = dairyData as DairyEntry[];

const getAll = () => {
  return diaries
}

const addEntry = () => {
  return null
}

export default { getAll, addEntry}

