import { Group, Right } from 'api-models';

export const GROUPS_MOCK: Group[] = [
  {
    id: '1-Admins',
    name: 'Admins',
    roles: [
      {
        id: '1-Pizza-editor',
        name: 'Pizza editor',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '2-Dust-sniffer',
        name: 'Dust sniffer',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '3-Poker-cheater',
        name: 'Poker cheater',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '4-Milk-user',
        name: 'Milk user',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
    ],
  },
  {
    id: '2-General-Managers',
    name: 'General-Managers',
    roles: [
      {
        id: '1-Pizza-editor',
        name: 'Pizza editor',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '2-Dust-sniffer',
        name: 'Dust sniffer',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '3-Poker-cheater',
        name: 'Poker cheater',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '4-Milk-user',
        name: 'Milk user',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
    ],
  },
  {
    id: '3-Managers-Tech',
    name: 'Managers-Tech',
    roles: [
      {
        id: '1-Pizza-editor',
        name: 'Pizza editor',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '2-Dust-sniffer',
        name: 'Dust sniffer',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '3-Poker-cheater',
        name: 'Poker cheater',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '4-Milk-user',
        name: 'Milk user',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
    ],
  },
  {
    id: '4-Managers-Billing',
    name: 'Managers Billing',
    roles: [
      {
        id: '1-Pizza-editor',
        name: 'Pizza editor',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '2-Dust-sniffer',
        name: 'Dust sniffer',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '3-Poker-cheater',
        name: 'Poker cheater',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '4-Milk-user',
        name: 'Milk user',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
    ],
  },
  {
    id: '5-Managers-Sales',
    name: 'Managers Sales',
    roles: [
      {
        id: '1-Pizza-editor',
        name: 'Pizza editor',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '2-Dust-sniffer',
        name: 'Dust sniffer',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '3-Poker-cheater',
        name: 'Poker cheater',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '4-Milk-user',
        name: 'Milk user',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
    ],
  },
  {
    id: '6-Support-Tech',
    name: 'Support Tech',
    roles: [
      {
        id: '1-Pizza-editor',
        name: 'Pizza editor',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '2-Dust-sniffer',
        name: 'Dust sniffer',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '3-Poker-cheater',
        name: 'Poker cheater',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '4-Milk-user',
        name: 'Milk user',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
    ],
  },
  {
    id: '7-Support-Billing',
    name: 'Support Billing',
    roles: [
      {
        id: '1-Pizza-editor',
        name: 'Pizza editor',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '2-Dust-sniffer',
        name: 'Dust sniffer',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '3-Poker-cheater',
        name: 'Poker cheater',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '4-Milk-user',
        name: 'Milk user',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
    ],
  },
  {
    id: '8-Support-Sales',
    name: 'Support Sales',
    roles: [
      {
        id: '1-Pizza-editor',
        name: 'Pizza editor',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '2-Dust-sniffer',
        name: 'Dust sniffer',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '3-Poker-cheater',
        name: 'Poker cheater',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
      {
        id: '4-Milk-user',
        name: 'Milk user',
        rights: [Right.Create, Right.Read, Right.Update, Right.Delete],
      },
    ],
  },
];

export function updateGroupNameById(id: string, name: string): Group[] {
  const groupIndex = GROUPS_MOCK.findIndex((group) => group.id === id);

  if (groupIndex === -1) return GROUPS_MOCK;

  const group = GROUPS_MOCK[groupIndex];
  group.name = name;

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
