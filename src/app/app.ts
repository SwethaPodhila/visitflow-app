
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards';

import {
  VisitorWizardComponent,
  VisitRecord,
  VisitState
} from './components/visitor-wizard/visitor-wizard';

import { StatusBoardComponent } from './components/status-board/status-board';
import { VisitorService } from './services/visitor';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    SidebarComponent,
    DashboardHeaderComponent,
    SummaryCardsComponent,
    VisitorWizardComponent,
    StatusBoardComponent
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Shared visitor records
  visits: VisitRecord[] = [];

  // Control registration wizard
  showWizard = false;

  constructor(
    public router: Router,
    private visitorService: VisitorService
  ) {

    // Automatically receive updated visitor data
    this.visitorService.visitors$.subscribe(
      (visitors: VisitRecord[]) => {
        this.visits = visitors;
      }
    );

  }

  // Refresh visitor records manually if needed
  refreshVisitors(): void {
    this.visits = this.visitorService.getVisitors();
  }

  // Open registration wizard
  openWizard(): void {
    this.showWizard = true;
  }

  // Close registration wizard
  closeWizard(): void {
    this.showWizard = false;
  }

  // Handle visitor submission
  addVisit(visit: VisitRecord): void {

    // Visitor is already saved by VisitorWizardComponent
    // BehaviorSubject automatically updates visits

    this.showWizard = false;
  }

  // Update visitor status
  updateVisitState(id: string, nextState: VisitState): void {

    const allowedTransitions: Record<VisitState, VisitState[]> = {

      PENDING: ['APPROVED', 'DENIED'],

      APPROVED: ['CHECKED_IN'],

      DENIED: [],

      CHECKED_IN: ['CHECKED_OUT'],

      CHECKED_OUT: []
    };

    const visit = this.visits.find(v => v.id === id);

    if (!visit) return;

    // Validate status transition
    if (!allowedTransitions[visit.state].includes(nextState)) {
      return;
    }

    // Update common service
    this.visitorService.updateVisitorState(id, nextState);

    // visits automatically updates through subscription
  }
}