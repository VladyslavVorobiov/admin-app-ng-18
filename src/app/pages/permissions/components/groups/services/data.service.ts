import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, EMPTY, of, take, tap } from 'rxjs';

import { GROUPS_MOCK } from 'api-mocks';
import { NavigationItem } from 'shared-components';
import { adaptorGroupToNavigation } from '../utils/adaptor-group-to-navigation';

@Injectable()
export class DataService {
  #groupNavigationSubject = new BehaviorSubject<NavigationItem[]>([]);
  public groupNavigation$ = this.#groupNavigationSubject.asObservable();

  loadGroups() {
    of(GROUPS_MOCK)
      .pipe(
        delay(1000),
        take(1),
        tap((response) => {
          if (!response) {
            // Handle empty response
          }

          this.#groupNavigationSubject.next(adaptorGroupToNavigation(response));
        }),
        catchError((error) => {
          // Handle error

          this.#groupNavigationSubject.next([]);

          return EMPTY;
        })
      )
      .subscribe();
  }
}
