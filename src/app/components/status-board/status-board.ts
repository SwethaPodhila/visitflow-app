
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  VisitRecord,
  VisitState
} from '../visitor-wizard/visitor-wizard';

import { VisitorService } from '../../services/visitor';

@Component({
  selector: 'app-status-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-board.html',
  styleUrl: './status-board.css'
})
export class StatusBoardComponent implements OnInit {

  // Dashboard nunchi visitor records receive chestham
  // Visitors route lo parent input undadu
  @Input() visits?: VisitRecord[];

  // Status change request ni parent ki send chestham
  @Output() transitionRequested =
    new EventEmitter<{ id: string; nextState: VisitState }>();

  constructor(
    private visitorService: VisitorService
  ) { }

  ngOnInit(): void {

    // Visitors route lo service nunchi data load chestham
    if (this.visits === undefined) {
      this.visits = this.visitorService.getVisitors();
    }
  }

  // Approve button
  approve(visit: VisitRecord): void {
    this.updateStatus(visit, 'APPROVED');
  }

  // Reject button
  reject(visit: VisitRecord): void {
    this.updateStatus(visit, 'DENIED');
  }

  // Check-in button
  checkIn(visit: VisitRecord): void {
    this.updateStatus(visit, 'CHECKED_IN');
  }

  // Check-out button
  checkOut(visit: VisitRecord): void {
    this.updateStatus(visit, 'CHECKED_OUT');
  }

  // Update visitor status
  private updateStatus(
    visit: VisitRecord,
    nextState: VisitState
  ): void {

    // Update common service
    this.visitorService.updateVisitorState(
      visit.id,
      nextState
    );

    // Refresh local visitor list
    this.visits = this.visitorService.getVisitors();

    // Notify parent if Dashboard is displaying this component
    this.transitionRequested.emit({
      id: visit.id,
      nextState: nextState
    });
  }
}
