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

import { getRolesByGroupId, ROLES_MOCK, saveRolesForGroup } from 'api-mocks';
import { Role } from 'api-models';
import { LoaderService } from 'core-services';
import { RoleView } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  #loaderService = inject(LoaderService);

  #initialRoles: Role[] = [];
  #currentRoles: RoleView[] = [];
  #groupId: string = '';
  #pageEvent: PageEvent = { pageIndex: 0, pageSize: 10, length: 0 };
  #searchTerm: string = '';

  #hasRolesChangesSubject = new BehaviorSubject<boolean>(false);
  public hasRolesChanges$ = this.#hasRolesChangesSubject.asObservable();

  #totalSubject = new BehaviorSubject<number>(0);
  public total$: Observable<number> = this.#totalSubject.asObservable();

  #getRolesSubject = new Subject<string>();
  #getRolesStream$: Observable<Role[]> = this.#getRolesSubject.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap((id) =>
      of(
        getRolesByGroupId(
          id,
          this.#pageEvent.pageSize,
          this.#pageEvent.pageIndex,
          this.#searchTerm
        )
      )
    ),
    delay(1000),
    tap((roles) => (this.#initialRoles = roles)),
    tap(() => this.#hasRolesChangesSubject.next(false))
  );

  #saveRolesForGroup = new Subject<Role[]>();
  #saveRolesForGroupStream$: Observable<Role[]> = this.#saveRolesForGroup.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap((roles) => of(saveRolesForGroup(this.#groupId, roles))),
    delay(1000),
    tap((roles) => (this.#initialRoles = roles)),
    tap(() => this.#hasRolesChangesSubject.next(false))
  );

  public roles$: Observable<RoleView[]> = merge(
    this.#getRolesStream$,
    this.#saveRolesForGroupStream$
  ).pipe(
    tap(() => this.#loaderService.setLoader(false)),
    map((roles) => {
      const rolesIds = roles.map((role) => role.id);

      this.#currentRoles = ROLES_MOCK.map((role) => ({
        ...role,
        checked: rolesIds.includes(role.id),
      }));

      // Simulate total number of roles
      this.#totalSubject.next(this.#currentRoles.length * 2);
      return this.#currentRoles;
    }),
    catchError((error) => {
      // Handle error ...
      this.#loaderService.setLoader(false);

      return EMPTY;
    })
  );

  getRolesByGroupId(id: string) {
    if (id === this.#groupId) return;

    this.#groupId = id;
    this.#getRolesSubject.next(id);
  }

  onPageChanged(pageEvent: PageEvent) {
    this.#pageEvent = pageEvent;
    this.#getRolesSubject.next(this.#groupId);
  }

  updateRole(role: RoleView, checked: boolean) {
    const roleIndex = this.#currentRoles.findIndex(({ id }) => id === role.id);

    if (roleIndex === -1) return;
    this.#currentRoles[roleIndex] = { ...role, checked };

    this.#checkRolesChanges();
  }

  saveRolesForGroup() {
    const checkedRoles: Role[] = this.#currentRoles
      .filter(({ checked }) => checked)
      .map(({ checked, ...role }) => role);

    this.#saveRolesForGroup.next(checkedRoles);
  }

  #checkRolesChanges() {
    const initialIds = this.#initialRoles.map(({ id }) => id);
    const currentCheckedIds = this.#currentRoles
      .filter(({ checked }) => checked)
      .map(({ id }) => id);

    const hasChanges = !(
      initialIds.length === currentCheckedIds.length &&
      currentCheckedIds.every((id) => initialIds.includes(id))
    );

    this.#hasRolesChangesSubject.next(hasChanges);
  }
}
