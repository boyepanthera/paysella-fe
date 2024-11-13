import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEstimateComponent } from './new-estimate.component';

describe('NewComponent', () => {
  let component: NewEstimateComponent;
  let fixture: ComponentFixture<NewEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEstimateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
