import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  delay,
  EMPTY,
  map,
  of,
  take,
  tap,
} from 'rxjs';

import { GROUPS_MOCK } from 'api-mocks';
import { NavigationItem } from 'shared-components';
import { adaptGroupToNavigation } from '../utils/adaptor-group-to-navigation';

@Injectable()
export class DataService {
  #groupNavigationSubject = new BehaviorSubject<NavigationItem[]>([]);
  public groupNavigation$ = this.#groupNavigationSubject.asObservable();

  #currentGroupSubject = new BehaviorSubject<NavigationItem | null>(null);
  public currentGroup$ = this.#currentGroupSubject.asObservable();

  loadGroups() {
    of(GROUPS_MOCK)
      .pipe(
        delay(1000),
        take(1),
        map((response) => adaptGroupToNavigation(response)),
        tap((data) => this.#groupNavigationSubject.next(data)),
        tap((data) =>
          this.#currentGroupSubject.next(
            this.#currentGroupSubject.value ?? data[0]
          )
        ),
        catchError((error) => {
          // Handle error

          this.#groupNavigationSubject.next([]);
          this.#currentGroupSubject.next(null);

          return EMPTY;
        })
      )
      .subscribe();
  }

  setCurrentGroup(group: NavigationItem) {
    this.#currentGroupSubject.next(group);
  }
}
