import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionsComponent {
  
}
