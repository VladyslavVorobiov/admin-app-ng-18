import { Routes } from '@angular/router';
import { ApplicationRoute } from 'shared-enums';

export const routes: Routes = [
    {
        path: ApplicationRoute.Permissions,
        loadComponent: () =>
            import('./pages/permissions/permissions.component').then(
                m => m.PermissionsComponent,
            ),
    },
    {
        path: '',
        redirectTo: ApplicationRoute.Permissions,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: ApplicationRoute.Permissions,
    },
];
