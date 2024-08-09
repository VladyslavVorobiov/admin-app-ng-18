import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { GroupsComponent } from './components/groups/groups.component';
import { RolesComponent } from './components/roles/roles.component';

@Component({
  standalone: true,
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule, GroupsComponent, RolesComponent],
})
export class PermissionsComponent {}
