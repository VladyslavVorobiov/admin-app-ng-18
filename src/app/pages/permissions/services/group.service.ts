import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  EMPTY,
  map,
  merge,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

import { Group } from 'api-models';
import { addGroup, getGroups, updateGroupName } from 'api-mocks';
import { NavigationItem } from 'shared-components';
import { LoaderService } from 'core-services';
import { adaptGroupToNavigation } from '../components/groups/utils/adaptor-group-to-navigation';
import { GroupRolesService } from './group-roles.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  #loaderService = inject(LoaderService);
  #groupRolesService: GroupRolesService = inject(GroupRolesService);

  #currentIdSubject = new BehaviorSubject<string>('');
  public currentId$ = this.#currentIdSubject.asObservable();

  #loadGroupsSubject = new Subject<void>();
  #loadGroupsStream$: Observable<Group[]> = this.#loadGroupsSubject.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap(() => of(getGroups())),
    delay(1000)
  );

  #updateGroupSubject = new Subject<NavigationItem>();
  #updateGroupStream$: Observable<Group[]> = this.#updateGroupSubject.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap((group) => of(updateGroupName(group))),
    delay(1000)
  );

  #addGroupSubject = new Subject<string>();
  #addGroupStream$: Observable<Group[]> = this.#addGroupSubject.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap((name) => of(addGroup(name))),
    delay(1000)
  );

  public groupNavigation$ = merge(
    this.#loadGroupsStream$,
    this.#updateGroupStream$,
    this.#addGroupStream$
  ).pipe(
    tap(() => this.#loaderService.setLoader(false)),
    map((response) => adaptGroupToNavigation(response)),
    tap((data) => {
      if (this.#currentIdSubject.value) return;

      this.setCurrentId(data[0].id);
      this.#groupRolesService.getRolesByGroupId(data[0].id);
    }),
    catchError((error) => {
      // Handle error ...

      this.#currentIdSubject.next('');
      this.#loaderService.setLoader(false);

      return EMPTY;
    })
  );

  loadGroups() {
    this.#loadGroupsSubject.next();
  }

  updateGroup(group: NavigationItem) {
    this.#updateGroupSubject.next(group);
  }

  addGroup(name: string) {
    this.#addGroupSubject.next(name);
  }

  setCurrentId(id: string) {
    this.#currentIdSubject.next(id);
  }
}
