import { inject, Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

import { FILTER_RIGHTS, getRightsByRoleId, saveRightsForRole } from 'api-mocks';
import { Right, RoleFilter } from 'api-models';
import { LoaderService } from 'core-services';
import { RightView } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RoleRightsService {
  #loaderService = inject(LoaderService);

  #initialRights: Right[] = [];
  #currentRights: RightView[] = [];
  #roleId: string = '';
  #pageEvent: PageEvent = { pageIndex: 0, pageSize: 10, length: 0 };
  #searchTerm: string = '';
  #filter: RoleFilter = RoleFilter.All;

  #hasRightsChangesSubject = new BehaviorSubject<boolean>(false);
  public hasRightsChanges$ = this.#hasRightsChangesSubject.asObservable();

  #totalSubject = new BehaviorSubject<number>(0);
  public total$: Observable<number> = this.#totalSubject.asObservable();

  #getRightsSubject = new Subject<string>();
  #getRightsStream$: Observable<Right[]> = this.#getRightsSubject.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap((id) =>
      of(
        getRightsByRoleId(
          id,
          this.#pageEvent.pageSize,
          this.#pageEvent.pageIndex
        )
      )
    ),
    delay(1000),
    tap((rights) => (this.#initialRights = rights)),
    tap(() => this.#hasRightsChangesSubject.next(false))
  );

  #saveRightsForRole = new Subject<Right[]>();
  #saveRightsForRoleStream$: Observable<Right[]> = this.#saveRightsForRole.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap((rights) => of(saveRightsForRole(this.#roleId, rights))),
    delay(1000),
    tap((rights) => (this.#initialRights = rights)),
    tap(() => this.#hasRightsChangesSubject.next(false))
  );

  public roleRights$: Observable<RightView[]> = merge(
    this.#getRightsStream$,
    this.#saveRightsForRoleStream$
  ).pipe(
    tap(() => this.#loaderService.setLoader(false)),
    map((rights) => {
      const rightsIds = rights.map((right) => right.id);

      // Simulate filter
      let availableRights = FILTER_RIGHTS[this.#filter];

      // Simulate search
      availableRights = availableRights.filter((right) =>
        right.name.toLowerCase().includes(this.#searchTerm.trim().toLowerCase())
      );

      this.#currentRights = availableRights.map((right) => ({
        ...right,
        checked: rightsIds.includes(right.id),
      }));

      this.#totalSubject.next(this.#currentRights.length);
      return this.#currentRights;
    }),
    catchError((error) => {
      // Handle error ...
      this.#loaderService.setLoader(false);

      return EMPTY;
    })
  );

  getRightsByRoleId(id: string) {
    if (id === this.#roleId) return;

    this.#roleId = id;
    this.#getRightsSubject.next(id);
  }

  searchRights(searchTerm: string) {
    this.#searchTerm = searchTerm;
    this.#getRightsSubject.next(this.#roleId);
  }

  filterRights(filter: RoleFilter) {
    this.#filter = filter;
    this.#getRightsSubject.next(this.#roleId);
  }

  onPageChanged(pageEvent: PageEvent) {
    this.#pageEvent = pageEvent;
    this.#getRightsSubject.next(this.#roleId);
  }

  updateRight(right: RightView, checked: boolean) {
    const rightIndex = this.#currentRights.findIndex(
      ({ id }) => id === right.id
    );

    if (rightIndex === -1) return;
    this.#currentRights[rightIndex] = { ...right, checked };

    this.#checkRightsChanges();
  }

  saveRightsForRole() {
    const checkedRights: Right[] = this.#currentRights
      .filter(({ checked }) => checked)
      .map(({ checked, ...role }) => role);

    this.#saveRightsForRole.next(checkedRights);
  }

  #checkRightsChanges() {
    const initialIds = this.#initialRights.map(({ id }) => id);
    const currentCheckedIds = this.#currentRights
      .filter(({ checked }) => checked)
      .map(({ id }) => id);

    const hasChanges = !(
      initialIds.length === currentCheckedIds.length &&
      currentCheckedIds.every((id) => initialIds.includes(id))
    );

    this.#hasRightsChangesSubject.next(hasChanges);
  }
}
