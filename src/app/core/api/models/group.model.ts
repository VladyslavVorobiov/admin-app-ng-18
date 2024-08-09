import { Role } from './role.model';

export interface Group {
  id: string;
  name: string;
  roles: Role[];
}
