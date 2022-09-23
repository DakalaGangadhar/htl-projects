import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderGridComponent } from './reader-grid.component';

describe('ReaderGridComponent', () => {
  let component: ReaderGridComponent;
  let fixture: ComponentFixture<ReaderGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReaderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
