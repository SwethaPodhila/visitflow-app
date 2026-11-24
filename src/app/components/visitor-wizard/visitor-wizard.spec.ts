import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorWizardComponent } from './visitor-wizard';

describe('VisitorWizardComponent', () => {

  let component: VisitorWizardComponent;
  let fixture: ComponentFixture<VisitorWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorWizardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(VisitorWizardComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});