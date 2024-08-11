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
import { filter, Observable, take } from 'rxjs';

import {
  AddItemDialog,
  NavigationComponent,
  NavigationItem,
  ToolbarComponent,
} from 'shared-components';
import { PAGE_SIZES } from 'shared-configs';
import { GroupService } from '../../services/group.service';
import { RolesService } from '../../services/roles.service';
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
  #rolesService: RolesService = inject(RolesService);
  #dialog: MatDialog = inject(MatDialog);

  groupNavigation$: Observable<NavigationItem[]> =
    this.#groupService.groupNavigation$;
  currentId$: Observable<string> = this.#groupService.currentId$;

  roles$: Observable<RoleView[]> = this.#rolesService.roles$;
  total$: Observable<number> = this.#rolesService.total$;
  hasRolesChanges$: Observable<boolean> = this.#rolesService.hasRolesChanges$;

  public readonly pageSizes: number[] = PAGE_SIZES;
  public pageSize: number = PAGE_SIZES[0];
  public pageIndex: number = 0;

  ngAfterViewInit() {
    this.#groupService.loadGroups();
  }

  onGroupClick(group: NavigationItem) {
    this.#groupService.setCurrentId(group.id);
    this.#rolesService.getRolesByGroupId(group.id);
  }

  onItemChanged(group: NavigationItem) {
    this.#groupService.updateGroup(group);
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
    this.#rolesService.updateRole(role, checked);
  }

  onSaveRoles() {
    this.#rolesService.saveRolesForGroup();
  }

  public onPageChanged(pageEvent: PageEvent): void {
    this.pageSize = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;

    this.#rolesService.onPageChanged(pageEvent);
  }
}
