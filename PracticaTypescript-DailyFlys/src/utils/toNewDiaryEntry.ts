import { NewDiaryEntry } from "../types/DairyEntryType";


export const toNewDiaryEntry = ( data: unknown ): NewDiaryEntry => {
  return NewDiaryEntrySchema.parse(data)
}