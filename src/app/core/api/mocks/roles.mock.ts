import { Role, RoleFilter } from 'api-models';
import { NavigationItem } from 'shared-components';
import { GROUPS_MOCK } from './groups.mock';
import { RIGHTS_MOCK } from './rights.mock';

export const ROLES_MOCK: Role[] = [
  {
    id: '1-Pizza-editor',
    name: 'Pizza editor',
    rights: RIGHTS_MOCK.slice(0, 5),
  },
  {
    id: '2-Dust-sniffer',
    name: 'Dust sniffer',
    rights: RIGHTS_MOCK.slice(3, 5),
  },
  {
    id: '3-Poker-cheater',
    name: 'Poker cheater',
    rights: RIGHTS_MOCK.slice(5, 8),
  },
  {
    id: '4-Milk-user',
    name: 'Milk user',
    rights: RIGHTS_MOCK.slice(1, 8),
  },
  {
    id: '5-Admin',
    name: 'Admin',
    rights: RIGHTS_MOCK.slice(0, 9),
  },
  {
    id: '6-Manager',
    name: 'Manager',
    rights: RIGHTS_MOCK.slice(3, 9),
  },
  {
    id: '7-User',
    name: 'User',
    rights: RIGHTS_MOCK.slice(0, 2),
  },
  {
    id: '8-Guest',
    name: 'Guest',
    rights: [RIGHTS_MOCK[1]],
  },
  {
    id: '9-Executor',
    name: 'Executor',
    rights: RIGHTS_MOCK.slice(6, 9),
  },
  {
    id: '10-Mediator',
    name: 'Mediator',
    rights: RIGHTS_MOCK.slice(3, 10),
  },
];

export const FILTER_ROLE = {
  [RoleFilter.All]: [...ROLES_MOCK],
  [RoleFilter.Admin]: ROLES_MOCK.slice(0, 5),
  [RoleFilter.Manager]: ROLES_MOCK.slice(2, 4),
  [RoleFilter.User]: ROLES_MOCK.slice(6, 7),
  [RoleFilter.Guest]: ROLES_MOCK.slice(7, 8),
  [RoleFilter.Sales]: ROLES_MOCK.slice(3, 7),
};

export function getRolesByGroupId(
  id: string,
  limit: number,
  offset: number
): Role[] {
  const groupIndex = GROUPS_MOCK.findIndex((group) => group.id === id);

  if (limit !== null && offset !== null) {
    // backend logic for pagination
  }

  return groupIndex === -1 ? [] : [...GROUPS_MOCK[groupIndex].roles];
}

export function saveRolesForGroup(id: string, roles: Role[]): Role[] {
  const groupIndex = GROUPS_MOCK.findIndex((group) => group.id === id);

  if (groupIndex === -1) return [];

  GROUPS_MOCK[groupIndex].roles = roles;

  return roles;
}

export function getRoles(): Role[] {
  return ROLES_MOCK;
}

export function updateRoleName({ id, title }: NavigationItem): Role[] {
  const roleIndex = ROLES_MOCK.findIndex((role) => role.id === id);

  if (roleIndex === -1) return ROLES_MOCK;

  const role = ROLES_MOCK[roleIndex];
  role.name = title;

  return [...ROLES_MOCK];
}

export function addRole(name: string): Role[] {
  ROLES_MOCK.push({
    id: `${Math.random()}-${name}`,
    name: name,
    rights: [],
  });

  return ROLES_MOCK;
}
