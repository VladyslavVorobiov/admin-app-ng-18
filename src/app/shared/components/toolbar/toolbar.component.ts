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
import { MatOption, MatSelect } from '@angular/material/select';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

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
  filterChanged = output<string>();

  searchControl = new FormControl<string>('');

  options = [
    { value: 'all', label: 'Show all' },
    { value: 'name', label: 'Name' },
    { value: 'description', label: 'Description' },
  ];

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
