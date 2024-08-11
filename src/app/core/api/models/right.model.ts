export enum RightName {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Move = 'move',
  Migrate = 'migrate',
  Clone = 'clone',
  Archive = 'archive',
  Restore = 'restore',
  Publish = 'publish',
}

export interface Right {
  id: string;
  name: RightName;
}
