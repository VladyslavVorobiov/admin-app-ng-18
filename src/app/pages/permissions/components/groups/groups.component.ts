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
import { GroupService } from '../../services/group.service';
import { GroupRolesService } from '../../services/group-roles.service';
import { RoleView } from '../../models';

@Component({
  standalone: true,
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
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
export class GroupsComponent implements AfterViewInit {
  #groupService: GroupService = inject(GroupService);
  #groupRolesService: GroupRolesService = inject(GroupRolesService);
  #dialog: MatDialog = inject(MatDialog);

  groupNavigation$: Observable<NavigationItem[]> =
    this.#groupService.groupNavigation$;
  currentId$: Observable<string> = this.#groupService.currentId$;

  roles$: Observable<RoleView[]> = this.#groupRolesService.groupRoles$;
  total$: Observable<number> = this.#groupRolesService.total$;
  hasRolesChanges$: Observable<boolean> =
    this.#groupRolesService.hasRolesChanges$;

  public readonly pageSizes: number[] = PAGE_SIZES;
  public pageSize: number = PAGE_SIZES[0];
  public pageIndex: number = 0;

  ngAfterViewInit() {
    this.#groupService.loadGroups();
  }

  onGroupClick(group: NavigationItem) {
    this.#groupService.setCurrentId(group.id);
    this.#groupRolesService.getRolesByGroupId(group.id);
  }

  onGroupNameChanged(group: NavigationItem) {
    this.#groupService.updateGroup(group);
  }

  onSearchChanged(searchTerm: string) {
    this.#groupRolesService.searchRoles(searchTerm);
  }

  onFilterChanged({ value }: MatSelectChange) {
    this.#groupRolesService.filterRoles(value);
  }

  onAddGroup() {
    this.#dialog
      .open(AddItemDialog, {
        data: { title: 'Add new Group' },
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((result) => !!result)
      )
      .subscribe((result) => this.#groupService.addGroup(result));
  }

  onRoleChecked({ checked }: MatCheckboxChange, role: RoleView) {
    this.#groupRolesService.updateRole(role, checked);
  }

  onSaveRoles() {
    this.#groupRolesService.saveRolesForGroup();
  }

  onPageChanged(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;

    this.#groupRolesService.onPageChanged(pageEvent);
  }
}
