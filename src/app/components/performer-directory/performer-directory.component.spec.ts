import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerDirectoryComponent } from './performer-directory.component';

describe('PerformerDirectoryComponent', () => {
  let component: PerformerDirectoryComponent;
  let fixture: ComponentFixture<PerformerDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformerDirectoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformerDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
