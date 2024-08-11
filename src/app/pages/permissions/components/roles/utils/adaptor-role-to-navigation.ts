import { Role } from 'api-models';
import { NavigationItem } from 'shared-components';

export function adaptRoleToNavigation(roles: Role[]): NavigationItem[] {
  return roles.map((role) => ({
    id: role.id,
    title: role.name,
  }));
}
