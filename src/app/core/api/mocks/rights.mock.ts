import { Right, RightName, RoleFilter } from 'api-models';
import { ROLES_MOCK } from './roles.mock';

export const RIGHTS_MOCK: Right[] = [
  {
    id: '1-create',
    name: RightName.Create,
  },
  {
    id: '2-read',
    name: RightName.Read,
  },
  {
    id: '3-update',
    name: RightName.Update,
  },
  {
    id: '4-delete',
    name: RightName.Delete,
  },
  {
    id: '5-move',
    name: RightName.Move,
  },
  {
    id: '6-migrate',
    name: RightName.Migrate,
  },
  {
    id: '7-clone',
    name: RightName.Clone,
  },
  {
    id: '8-archive',
    name: RightName.Archive,
  },
  {
    id: '9-restore',
    name: RightName.Restore,
  },
  {
    id: '10-publish',
    name: RightName.Publish,
  },
];

export const FILTER_RIGHTS = {
  [RoleFilter.All]: [...RIGHTS_MOCK],
  [RoleFilter.Admin]: RIGHTS_MOCK.slice(0, 5),
  [RoleFilter.Manager]: RIGHTS_MOCK.slice(2, 4),
  [RoleFilter.User]: RIGHTS_MOCK.slice(6, 7),
  [RoleFilter.Guest]: RIGHTS_MOCK.slice(7, 8),
  [RoleFilter.Sales]: RIGHTS_MOCK.slice(3, 7),
};

export function getRightsByRoleId(
  id: string,
  limit: number,
  offset: number
): Right[] {
  const roleIndex = ROLES_MOCK.findIndex((role) => role.id === id);

  if (limit !== null && offset !== null) {
    // backend logic for pagination
  }

  return roleIndex === -1 ? [] : [...ROLES_MOCK[roleIndex].rights];
}

export function saveRightsForRole(id: string, rights: Right[]): Right[] {
  const roleIndex = ROLES_MOCK.findIndex((role) => role.id === id);

  if (roleIndex === -1) return [];

  ROLES_MOCK[roleIndex].rights = rights;

  return rights;
}
