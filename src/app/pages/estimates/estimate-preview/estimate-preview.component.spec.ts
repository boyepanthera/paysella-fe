import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatePreviewComponent } from './estimate-preview.component';

describe('PreviewComponent', () => {
  let component: EstimatePreviewComponent;
  let fixture: ComponentFixture<EstimatePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimatePreviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EstimatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
