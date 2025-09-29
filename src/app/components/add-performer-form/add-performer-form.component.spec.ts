import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformerFormComponent } from './add-performer-form.component';

describe('AddPerformerFormComponent', () => {
  let component: AddPerformerFormComponent;
  let fixture: ComponentFixture<AddPerformerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPerformerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPerformerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
