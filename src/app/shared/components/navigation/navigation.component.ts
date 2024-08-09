import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationItem } from './models';
import { NAVIGATION_ITEMS } from './constants/navigation.constants';

@Component({
    standalone: true,
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
    public navigationItems: NavigationItem[] = NAVIGATION_ITEMS;
}
