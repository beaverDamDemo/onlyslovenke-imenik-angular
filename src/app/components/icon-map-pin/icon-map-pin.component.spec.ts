import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMapPinComponent } from './icon-map-pin.component';

describe('IconMapPinComponent', () => {
  let component: IconMapPinComponent;
  let fixture: ComponentFixture<IconMapPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconMapPinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconMapPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
