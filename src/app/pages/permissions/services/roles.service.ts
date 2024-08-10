import { inject, Injectable } from '@angular/core';
import {
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

import { getRolesByGroupId, ROLES_MOCK } from 'api-mocks';
import { Role } from 'api-models';
import { LoaderService } from 'core-services';
import { RoleView } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  #loaderService = inject(LoaderService);

  #getRolesSubject = new Subject<string>();
  #getRolesStream$: Observable<Role[]> = this.#getRolesSubject.pipe(
    tap(() => this.#loaderService.setLoader(true)),
    switchMap((id) => of(getRolesByGroupId(id))),
    delay(1000)
  );

  public roles$: Observable<RoleView[]> = merge(this.#getRolesStream$).pipe(
    tap(() => this.#loaderService.setLoader(false)),
    map((roles) => {
      const rolesIds = roles.map((role) => role.id);

      return ROLES_MOCK.map((role) => ({
        ...role,
        checked: rolesIds.includes(role.id),
      }));
    }),
    catchError((error) => {
      // Handle error ...
      this.#loaderService.setLoader(false);

      return EMPTY;
    })
  );

  getRolesByGroupId(id: string) {
    this.#getRolesSubject.next(id);
  }
}

//a.length === b.length && b.every( i=> a.includes(i))
