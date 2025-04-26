import { DairyEntry } from "./DairyEntryType";

export type NonSensitiveDiaryEntry  = Omit<DairyEntry, 'comment'>;