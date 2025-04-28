import { NewDiaryEntry } from "../types/DairyEntryType";
import { z } from "zod";

const NewDiaryEntrySchema = z.object({
  date: z.string(),
  weather: z.enum(["sunny", "rainy", "cloudy", "stormy", "windy"]),
  visibility: z.enum([    "great",    "good",    "ok",    "poor",  ]),
  comment: z.string().optional()
})

export const toNewDiaryEntry = ( data: unknown ): NewDiaryEntry => {
  return NewDiaryEntrySchema.parse(data)
}