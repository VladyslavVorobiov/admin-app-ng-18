import { Right } from './right.model';

export interface Role {
  id: string;
  name: string;
  rights: Right[];
}
