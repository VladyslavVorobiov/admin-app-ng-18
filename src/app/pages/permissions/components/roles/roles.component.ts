import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { filter, Observable, take } from 'rxjs';

import {
  AddItemDialog,
  NavigationComponent,
  NavigationItem,
  ToolbarComponent,
} from 'shared-components';
import { PAGE_SIZES } from 'shared-configs';
import { RightView } from '../../models';
import { RoleService } from '../../services/role.service';
import { RoleRightsService } from '../../services/role-rights.service';

@Component({
  standalone: true,
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavigationComponent,
    AsyncPipe,
    MatIcon,
    MatButtonModule,
    ToolbarComponent,
    MatCheckbox,
    NgFor,
    MatPaginatorModule,
  ],
})
export class RolesComponent implements AfterViewInit {
  #roleService: RoleService = inject(RoleService);
  #roleRightsService: RoleRightsService = inject(RoleRightsService);
  #dialog: MatDialog = inject(MatDialog);

  roleNavigation$: Observable<NavigationItem[]> =
    this.#roleService.roleNavigation$;
  currentId$: Observable<string> = this.#roleService.currentId$;

  rights$: Observable<RightView[]> = this.#roleRightsService.roleRights$;
  total$: Observable<number> = this.#roleRightsService.total$;
  hasRightsChanges$: Observable<boolean> =
    this.#roleRightsService.hasRightsChanges$;

  public readonly pageSizes: number[] = PAGE_SIZES;
  public pageSize: number = PAGE_SIZES[0];
  public pageIndex: number = 0;

  ngAfterViewInit() {
    this.#roleService.loadRoles();
  }

  onRoleClick(role: NavigationItem) {
    this.#roleService.setCurrentId(role.id);
    this.#roleRightsService.getRightsByRoleId(role.id);
  }

  onRoleNameChanged(role: NavigationItem) {
    this.#roleService.updateRole(role);
  }

  onSearchChanged(searchTerm: string) {
    this.#roleRightsService.searchRights(searchTerm);
  }

  onFilterChanged({ value }: MatSelectChange) {
    this.#roleRightsService.filterRights(value);
  }

  onAddRole() {
    this.#dialog
      .open(AddItemDialog, {
        data: { title: 'Add new Role' },
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((result) => !!result)
      )
      .subscribe((result) => this.#roleService.addRole(result));
  }

  onRightChecked({ checked }: MatCheckboxChange, right: RightView) {
    this.#roleRightsService.updateRight(right, checked);
  }

  onSaveRights() {
    this.#roleRightsService.saveRightsForRole();
  }

  onPageChanged(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;

    this.#roleRightsService.onPageChanged(pageEvent);
  }
}
