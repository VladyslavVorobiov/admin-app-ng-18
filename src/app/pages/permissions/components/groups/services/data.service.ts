import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  EMPTY,
  finalize,
  map,
  of,
  take,
  tap,
} from 'rxjs';

import { GROUPS_MOCK, updateGroupNameById } from 'api-mocks';
import { NavigationItem } from 'shared-components';
import { LoaderService } from 'core-services';
import { adaptGroupToNavigation } from '../utils/adaptor-group-to-navigation';

@Injectable()
export class DataService {
  #loaderService = inject(LoaderService);

  #groupNavigationSubject = new BehaviorSubject<NavigationItem[]>([]);
  public groupNavigation$ = this.#groupNavigationSubject.asObservable();

  #currentIdSubject = new BehaviorSubject<string>('');
  public currentId$ = this.#currentIdSubject.asObservable();

  loadGroups() {
    this.#loaderService.setLoader(true);

    of(GROUPS_MOCK)
      .pipe(
        delay(1000),
        take(1),
        map((response) => adaptGroupToNavigation(response)),
        tap((data) => this.#groupNavigationSubject.next(data)),
        tap((data) =>
          this.#currentIdSubject.next(
            this.#currentIdSubject.value || data[0].id
          )
        ),
        catchError((error) => {
          // Handle error

          this.#groupNavigationSubject.next([]);
          this.#currentIdSubject.next('');

          return EMPTY;
        }),
        finalize(() => this.#loaderService.setLoader(false))
      )
      .subscribe();
  }

  updateGroup(group: NavigationItem) {
    this.#loaderService.setLoader(true);

    of(updateGroupNameById(group.id, group.title))
      .pipe(
        delay(1000),
        take(1),
        map((response) => adaptGroupToNavigation(response)),
        tap((data) => this.#groupNavigationSubject.next(data)),
        tap((data) =>
          this.#currentIdSubject.next(
            this.#currentIdSubject.value || data[0].id
          )
        ),
        catchError((error) => {
          // Handle error

          this.#groupNavigationSubject.next([]);
          this.#currentIdSubject.next('');

          return EMPTY;
        }),
        finalize(() => this.#loaderService.setLoader(false))
      )
      .subscribe();
  }

  setCurrentId(id: string) {
    this.#currentIdSubject.next(id);
  }
}
