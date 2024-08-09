import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NavigationItem } from './models';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
})
export class NavigationComponent {
  items = input.required<NavigationItem[]>();
  currentId = input.required<string>();

  clickedItem = output<NavigationItem>();
  itemChanged = output<NavigationItem>();

  editable: NavigationItem = { id: '', title: '' };

  #snackBar: MatSnackBar = inject(MatSnackBar);

  onItemClick(item: NavigationItem) {
    if (this.editable.id === item.id) return;

    this.clickedItem.emit(item);
    this.#resetEditable();
  }

  onEditClick(item: NavigationItem) {
    this.editable.id = item.id;
    this.editable.title = item.title;
  }

  onSaveTitle(item: NavigationItem) {
    const newTitle = this.editable.title.trim();

    if (newTitle === item.title) {
      this.#resetEditable();
      return;
    }

    if (newTitle === '') {
      this.#snackBar.open('Title cannot be empty', 'Close', { duration: 2000 });
      return;
    }

    this.itemChanged.emit({ ...item, title: newTitle });
    this.#resetEditable();
  }

  #resetEditable() {
    this.editable = { id: '', title: '' };
  }
}
