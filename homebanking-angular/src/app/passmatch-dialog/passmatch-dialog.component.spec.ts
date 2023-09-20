import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassmatchDialogComponent } from './passmatch-dialog.component';

describe('PassmatchDialogComponent', () => {
  let component: PassmatchDialogComponent;
  let fixture: ComponentFixture<PassmatchDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassmatchDialogComponent]
    });
    fixture = TestBed.createComponent(PassmatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
