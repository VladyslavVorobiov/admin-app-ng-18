import { Role } from './role.model';

export interface Groups {
  id: string;
  name: string;
  roles: Role[];
}
