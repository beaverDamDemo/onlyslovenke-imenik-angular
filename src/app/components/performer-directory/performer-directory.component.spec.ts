import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCreatorDirectoryComponent } from './performer-directory.component';

describe('ContentCreatorDirectoryComponent', () => {
  let component: ContentCreatorDirectoryComponent;
  let fixture: ComponentFixture<ContentCreatorDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCreatorDirectoryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContentCreatorDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
