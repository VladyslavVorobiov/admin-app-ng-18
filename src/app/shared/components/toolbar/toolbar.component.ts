import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatOption,
  MatSelect,
  MatSelectChange,
} from '@angular/material/select';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

import { RoleFilter } from 'api-models';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
  ],
})
export class ToolbarComponent implements OnInit {
  header = input.required<string>();
  searchChanged = output<string>();
  filterChanged = output<MatSelectChange>();

  searchControl = new FormControl<string>('');

  options = [
    { value: RoleFilter.All, label: 'Show all' },
    { value: RoleFilter.Admin, label: 'Admin roles' },
    { value: RoleFilter.Manager, label: 'Manager roles' },
    { value: RoleFilter.User, label: 'User roles' },
    { value: RoleFilter.Guest, label: 'Guest roles' },
    { value: RoleFilter.Sales, label: 'Sales roles' },
  ];

  defaultFilter = this.options[0];

  #destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.#initSearchListener();
  }

  #initSearchListener() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap((value) => this.searchChanged.emit(value ?? '')),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
