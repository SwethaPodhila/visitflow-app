
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VisitorService } from '../../services/visitor';

// Visitor status types
export type VisitState =
  | 'PENDING'
  | 'APPROVED'
  | 'DENIED'
  | 'CHECKED_IN'
  | 'CHECKED_OUT';

// Visitor record structure
export interface VisitRecord {
  id: string;

  visitor: {
    name: string;
    contact: string;
  };

  purpose: string;
  hostEmployee: string;
  state: VisitState;
}

// Host mock data
interface Host {
  id: string;
  name: string;
}

@Component({
  selector: 'app-visitor-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './visitor-wizard.html',
  styleUrl: './visitor-wizard.css'
})
export class VisitorWizardComponent {

  // Send submitted visitor record to parent component
  @Output() visitSubmitted = new EventEmitter<VisitRecord>();

  constructor(
    private visitorService: VisitorService
  ) { }

  // Current wizard step
  currentStep = 1;

  // Visitor form data
  visitorName = '';
  contact = '';
  purpose = '';
  selectedHostEmployee = '';

  // Host search input
  hostSearch = '';

  // Mock host list
  hosts: Host[] = [
    { id: 'EMP-77', name: 'Manish R' },
    { id: 'EMP-31', name: 'Sricharan' },
    { id: 'EMP-52', name: 'Dheeraj S' }
  ];

  // Generate visitor IDs
  private visitCounter = 3301;

  // Contact validation
  get isContactValid(): boolean {
    return /^(?:\+91)?[6-9]\d{9}$/.test(this.contact.trim());
  }

  // Name validation
  get isNameValid(): boolean {
    return this.visitorName.trim().length >= 3;
  }

  // Step 1 validation
  get isStep1Valid(): boolean {
    return this.isNameValid && this.isContactValid;
  }

  // Step 2 validation
  get isStep2Valid(): boolean {
    return !!this.purpose && !!this.selectedHostEmployee;
  }

  // Find selected host
  get selectedHost(): Host | undefined {
    return this.hosts.find(
      host => host.id === this.selectedHostEmployee
    );
  }

  // Search hosts by name
  get filteredHosts(): Host[] {
    const search = this.hostSearch.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return this.hosts.filter(host =>
      host.name.toLowerCase().includes(search)
    );
  }

  // Move to next step
  nextStep(): void {
    if (this.currentStep === 1 && this.isStep1Valid) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.isStep2Valid) {
      this.currentStep = 3;
    }
  }

  // Go to previous step
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Edit a particular section
  editStep(step: number): void {
    this.currentStep = step;
  }

  // Handle host search typing
  onHostSearchChange(): void {
    this.selectedHostEmployee = '';
  }

  // Select a host from search results
  selectHost(host: Host): void {
    this.selectedHostEmployee = host.id;
    this.hostSearch = host.name;
  }

  // Submit visitor registration
  submitVisit(): void {

    if (!this.isStep1Valid || !this.isStep2Valid) {
      return;
    }

    const newVisit: VisitRecord = {
      id: `V-${this.visitCounter++}`,
      visitor: {
        name: this.visitorName.trim(),
        contact: this.contact.trim()
      },
      purpose: this.purpose,
      hostEmployee: this.selectedHostEmployee,
      state: 'PENDING'
    };

    // Save visitor in common service
    this.visitorService.addVisitor(newVisit);

    // Notify parent component
    this.visitSubmitted.emit(newVisit);

    // Reset wizard after successful submission
    this.resetWizard();
  }

  // Reset all form values
  resetWizard(): void {
    this.currentStep = 1;
    this.visitorName = '';
    this.contact = '';
    this.purpose = '';
    this.selectedHostEmployee = '';
    this.hostSearch = '';
  }
}
