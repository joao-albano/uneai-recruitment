
import { StudentData } from "../../context/DataContext";

export type ValidationError = {
  row: number;
  column: string;
  message: string;
};

export type HeaderMap = Record<string, string>;
