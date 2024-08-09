import { Group } from 'api-models';
import { NavigationItem } from 'shared-components';

export function adaptGroupToNavigation(groups: Group[]): NavigationItem[] {
  return groups.map((group) => ({
    id: group.id,
    title: group.name,
  }));
}
