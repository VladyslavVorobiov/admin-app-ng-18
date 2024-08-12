import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MenuService } from 'core-services';
import { GroupsComponent } from './components/groups/groups.component';
import { RolesComponent } from './components/roles/roles.component';

@Component({
  standalone: true,
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatTabsModule,
    GroupsComponent,
    RolesComponent,
    MatIcon,
    MatButtonModule,
  ],
})
export class PermissionsComponent {
  #menuService: MenuService = inject(MenuService);

  onMenuClick() {
    this.#menuService.openMenu(true);
  }
}
