import { Visibility } from "./VisibilityType";
import { Weather } from "./WeatherType";

export type DairyEntry = {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiaryEntry = Omit<DairyEntry, 'id'>;