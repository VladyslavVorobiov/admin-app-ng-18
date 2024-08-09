import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  standalone: true,
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule],
})
export class PermissionsComponent     {

}
