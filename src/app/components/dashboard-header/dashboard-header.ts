import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.css'
})
export class DashboardHeaderComponent {

  @Output() openRegisterWizard = new EventEmitter<void>();

  todayDate: string;

  constructor() {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    this.todayDate = new Date().toLocaleDateString('en-US', options);
  }

  onRegisterClick(): void {
    this.openRegisterWizard.emit();
  }
}