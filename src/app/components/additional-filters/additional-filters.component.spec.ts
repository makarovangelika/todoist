import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalFiltersComponent } from './additional-filters.component';

describe('AdditionalFiltersComponent', () => {
  let component: AdditionalFiltersComponent;
  let fixture: ComponentFixture<AdditionalFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalFiltersComponent]
    });
    fixture = TestBed.createComponent(AdditionalFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
