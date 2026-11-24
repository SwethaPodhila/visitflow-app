import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBoard } from './status-board';

describe('StatusBoard', () => {
  let component: StatusBoard;
  let fixture: ComponentFixture<StatusBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
