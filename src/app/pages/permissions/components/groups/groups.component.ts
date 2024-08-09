import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
