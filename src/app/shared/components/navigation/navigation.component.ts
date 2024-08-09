import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NavigationItem } from './models';

@Component({
  standalone: true,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  items = input.required<NavigationItem[]>();
  current = input.required<NavigationItem | null>();

  clickedItem = output<NavigationItem>();

  onItemClick(item: NavigationItem) {
    this.clickedItem.emit(item);
  }
}
