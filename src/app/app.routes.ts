
import { Routes } from '@angular/router';

import { StatusBoardComponent } from './components/status-board/status-board';
import { VisitorWizardComponent } from './components/visitor-wizard/visitor-wizard';

export const routes: Routes = [
    {
        path: 'visitors',
        component: StatusBoardComponent
    },
    {
        path: 'registration',
        component: VisitorWizardComponent
    },
    {
        path: 'dashboard',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
