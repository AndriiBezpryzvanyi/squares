export interface Square {
  isActive: boolean;
  position: number;
}

export interface Mode {
  name: string;
  field: number;
}

export interface InitialState {
  modes: Mode[] | null;
  error: any;
  status: string | null;
  fields: Square[];
}
