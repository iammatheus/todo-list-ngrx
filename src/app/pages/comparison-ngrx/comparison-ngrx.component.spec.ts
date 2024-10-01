import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonNgRxComponent } from './comparison-ngrx.component';

describe('ComparisonNgRxComponent', () => {
  let component: ComparisonNgRxComponent;
  let fixture: ComponentFixture<ComparisonNgRxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonNgRxComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ComparisonNgRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
