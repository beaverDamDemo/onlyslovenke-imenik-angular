import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContentCreatorFormComponent } from './add-performer-form.component';

describe('AddContentCreatorFormComponent', () => {
  let component: AddContentCreatorFormComponent;
  let fixture: ComponentFixture<AddContentCreatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContentCreatorFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddContentCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
