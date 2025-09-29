import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconUsersComponent } from './icon-users.component';

describe('IconUsersComponent', () => {
  let component: IconUsersComponent;
  let fixture: ComponentFixture<IconUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
