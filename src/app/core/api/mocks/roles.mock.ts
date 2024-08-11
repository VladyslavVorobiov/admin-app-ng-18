import { Right, Role, RoleFilter } from 'api-models';
import { GROUPS_MOCK } from './groups.mock';

export const ROLES_MOCK: Role[] = [
  {
    id: '1-Pizza-editor',
    name: 'Pizza editor',
    rights: [
      Right.Create,
      Right.Read,
      Right.Update,
      Right.Delete,
      Right.Execute,
    ],
  },
  {
    id: '2-Dust-sniffer',
    name: 'Dust sniffer',
    rights: [Right.Create, Right.Read],
  },
  {
    id: '3-Poker-cheater',
    name: 'Poker cheater',
    rights: [Right.Update, Right.Delete],
  },
  {
    id: '4-Milk-user',
    name: 'Milk user',
    rights: [Right.Read],
  },
  {
    id: '5-Admin',
    name: 'Admin',
    rights: [
      Right.Create,
      Right.Read,
      Right.Update,
      Right.Delete,
      Right.Move,
      Right.Migrate,
      Right.Clone,
      Right.Archive,
      Right.Restore,
      Right.Publish,
      Right.Execute,
    ],
  },
  {
    id: '6-Manager',
    name: 'Manager',
    rights: [
      Right.Create,
      Right.Read,
      Right.Update,
      Right.Delete,
      Right.Move,
      Right.Migrate,
      Right.Clone,
      Right.Archive,
      Right.Restore,
      Right.Publish,
    ],
  },
  {
    id: '7-User',
    name: 'User',
    rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
  },
  {
    id: '8-Guest',
    name: 'Guest',
    rights: [Right.Read],
  },
  {
    id: '9-Executor',
    name: 'Executor',
    rights: [Right.Execute],
  },
  {
    id: '10-Mediator',
    name: 'Mediator',
    rights: [Right.Publish, Right.Restore],
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
