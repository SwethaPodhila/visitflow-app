
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  VisitRecord,
  VisitState
} from '../components/visitor-wizard/visitor-wizard';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  private visitorsSubject = new BehaviorSubject<VisitRecord[]>([]);

  // All components subscribe to this observable
  visitors$ = this.visitorsSubject.asObservable();

  // Get current visitors
  getVisitors(): VisitRecord[] {
    return this.visitorsSubject.value;
  }

  // Add visitor
  addVisitor(visitor: VisitRecord): void {
    const updatedVisitors = [
      ...this.visitorsSubject.value,
      visitor
    ];

    this.visitorsSubject.next(updatedVisitors);
  }

  // Update visitor status
  updateVisitorState(id: string, nextState: VisitState): void {

    const updatedVisitors = this.visitorsSubject.value.map(visitor =>
      visitor.id === id
        ? { ...visitor, state: nextState }
        : visitor
    );

    this.visitorsSubject.next(updatedVisitors);
  }
}