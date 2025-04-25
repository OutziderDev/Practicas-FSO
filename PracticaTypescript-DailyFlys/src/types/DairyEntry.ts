import { Visibility } from "./Visibility";
import { Weather } from "./Weather";

export type DairyEntry = {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}