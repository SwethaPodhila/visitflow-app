import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitRecord } from '../visitor-wizard/visitor-wizard';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-cards.html',
  styleUrl: './summary-cards.css'
})
export class SummaryCardsComponent {

  // Parent nunchi visitor data receive chestham
  @Input() visits: VisitRecord[] = [];

  // Total visitors count
  get totalVisitors(): number {
    return this.visits.length;
  }

  // Pending visitors count
  get pendingVisitors(): number {
    return this.visits.filter(
      visit => visit.state === 'PENDING'
    ).length;
  }

  // Approved visitors count
  get approvedVisitors(): number {
    return this.visits.filter(
      visit => visit.state === 'APPROVED'
    ).length;
  }

  // Currently inside visitors
  get insideVisitors(): number {
    return this.visits.filter(
      visit => visit.state === 'CHECKED_IN'
    ).length;
  }
}