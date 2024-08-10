import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable, take } from 'rxjs';

import {
  AddItemDialog,
  NavigationComponent,
  NavigationItem,
} from 'shared-components';
import { DataService } from './services/data.service';

@Component({
  standalone: true,
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationComponent, AsyncPipe, MatIcon, MatButtonModule],
  providers: [DataService],
})
export class GroupsComponent implements OnInit {
  #dataService = inject(DataService);
  #dialog = inject(MatDialog);

  groupNavigation$: Observable<NavigationItem[]> =
    this.#dataService.groupNavigation$;

  currentId$: Observable<string> = this.#dataService.currentId$;

  ngOnInit() {
    this.#dataService.loadGroups();
  }

  onGroupClick(group: NavigationItem) {
    this.#dataService.setCurrentId(group.id);
  }

  onItemChanged(group: NavigationItem) {
    this.#dataService.updateGroup(group);
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
      .subscribe((result) => this.#dataService.addGroup(result));
  }
}
