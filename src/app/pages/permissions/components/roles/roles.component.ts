import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
