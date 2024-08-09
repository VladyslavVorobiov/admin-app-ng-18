import { Groups } from 'api-models';
import { NavigationItem } from 'shared-components';

export function adaptGroupToNavigation(groups: Groups[]): NavigationItem[] {
  return groups.map((group) => ({
    id: group.id,
    title: group.name,
  }));
}
