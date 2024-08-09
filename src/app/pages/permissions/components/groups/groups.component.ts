import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { NavigationComponent, NavigationItem } from 'shared-components';
import { DataService } from './services/data.service';

@Component({
  standalone: true,
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationComponent, AsyncPipe],
  providers: [DataService],
})
export class GroupsComponent implements OnInit {
  #dataService = inject(DataService);

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
}
