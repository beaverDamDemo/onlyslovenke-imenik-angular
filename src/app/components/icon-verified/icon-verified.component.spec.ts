import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconVerifiedComponent } from './icon-verified.component';

describe('IconVerifiedComponent', () => {
  let component: IconVerifiedComponent;
  let fixture: ComponentFixture<IconVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconVerifiedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
