import { Mode } from "../types";

export interface InitialState {
  data: Mode[] | null;
  error: any;
  status: string | null;
  fields: { isActive: boolean }[];
}
