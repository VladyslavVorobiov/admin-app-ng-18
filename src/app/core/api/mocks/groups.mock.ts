import { Group, Right } from 'api-models';
import { NavigationItem } from 'shared-components';
import { ROLES_MOCK } from './roles.mock';

export const GROUPS_MOCK: Group[] = [
  {
    id: '1-Admins',
    name: 'Admins',
    roles: ROLES_MOCK.slice(0, 3),
  },
  {
    id: '2-General-Managers',
    name: 'General-Managers',
    roles: ROLES_MOCK.slice(3, 5),
  },
  {
    id: '3-Managers-Tech',
    name: 'Managers-Tech',
    roles: ROLES_MOCK.slice(5, 7),
  },
  {
    id: '4-Managers-Billing',
    name: 'Managers Billing',
    roles: ROLES_MOCK.slice(2, 6),
  },
  {
    id: '5-Managers-Sales',
    name: 'Managers Sales',
    roles: ROLES_MOCK,
  },
  {
    id: '6-Support-Tech',
    name: 'Support Tech',
    roles: [ROLES_MOCK[0], ROLES_MOCK[5]],
  },
  {
    id: '7-Support-Billing',
    name: 'Support Billing',
    roles: [ROLES_MOCK[2], ROLES_MOCK[7]],
  },
  {
    id: '8-Support-Sales',
    name: 'Support Sales',
    roles: [ROLES_MOCK[4], ROLES_MOCK[6]],
  },
];

export function getGroups(): Group[] {
  return GROUPS_MOCK;
}

export function updateGroupName({ id, title }: NavigationItem): Group[] {
  const groupIndex = GROUPS_MOCK.findIndex((group) => group.id === id);

  if (groupIndex === -1) return GROUPS_MOCK;

  const group = GROUPS_MOCK[groupIndex];
  group.name = title;

  return [...GROUPS_MOCK];
}

export function addGroup(name: string): Group[] {
  GROUPS_MOCK.push({
    id: `${Math.random()}-${name}`,
    name: name,
    roles: [],
  });

  return GROUPS_MOCK;
}
