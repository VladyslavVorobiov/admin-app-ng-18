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

import { Role } from 'api-models';
import { addRole, getRoles, updateRoleName } from 'api-mocks';
import { NavigationItem } from 'shared-components';
import { LoaderService } from 'core-services';
import { adaptRoleToNavigation } from '../components/roles/utils/adaptor-role-to-navigation';
import { RoleRightsService } from './role-rights.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  #loaderService = inject(LoaderService);
  #roleRightsService: RoleRightsService = inject(RoleRightsService);

  #currentIdSubject = new BehaviorSubject<string>('');
  public currentId$ = this.#currentIdSubject.asObservable();

  #loadRolesSubject = new Subject<void>();
  #loadRolesStream$: Observable<Role[]> = this.#loadRolesSubject.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap(() => of(getRoles())),
    delay(1000)
  );

  #updateRolesubject = new Subject<NavigationItem>();
  #updateRolestream$: Observable<Role[]> = this.#updateRolesubject.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap((role) => of(updateRoleName(role))),
    delay(1000)
  );

  #addRolesubject = new Subject<string>();
  #addRolestream$: Observable<Role[]> = this.#addRolesubject.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap((name) => of(addRole(name))),
    delay(1000)
  );

  public roleNavigation$ = merge(
    this.#loadRolesStream$,
    this.#updateRolestream$,
    this.#addRolestream$
  ).pipe(
    tap(() => this.#loaderService.setLoader(false)),
    map((response) => adaptRoleToNavigation(response)),
    tap((data) => {
      if (this.#currentIdSubject.value) return;

      this.setCurrentId(data[0].id);
      this.#roleRightsService.getRightsByRoleId(data[0].id);
    }),
    catchError((error) => {
      // Handle error ...

      this.#currentIdSubject.next('');
      this.#loaderService.setLoader(false);

      return EMPTY;
    })
  );

  loadRoles() {
    this.#loadRolesSubject.next();
  }

  updateRole(role: NavigationItem) {
    this.#updateRolesubject.next(role);
  }

  addRole(name: string) {
    this.#addRolesubject.next(name);
  }

  setCurrentId(id: string) {
    this.#currentIdSubject.next(id);
  }
}
