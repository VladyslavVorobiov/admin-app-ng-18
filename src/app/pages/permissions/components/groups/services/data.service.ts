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
import { adaptGroupToNavigation } from '../utils/adaptor-group-to-navigation';

@Injectable()
export class DataService {
  #loaderService = inject(LoaderService);

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
    map((response) => adaptGroupToNavigation(response)),
    tap((data) =>
      this.#currentIdSubject.next(this.#currentIdSubject.value || data[0].id)
    ),
    tap(() => this.#loaderService.setLoader(false)),
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
