import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryFiltersComponent } from './directory-filters.component';

describe('DirectoryFiltersComponent', () => {
  let component: DirectoryFiltersComponent;
  let fixture: ComponentFixture<DirectoryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectoryFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
