import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPercentComponent } from './icon-percent.component';

describe('IconPercentComponent', () => {
  let component: IconPercentComponent;
  let fixture: ComponentFixture<IconPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconPercentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
