import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsDialogComponent } from './movements-dialog.component';

describe('MovementsDialogComponent', () => {
  let component: MovementsDialogComponent;
  let fixture: ComponentFixture<MovementsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovementsDialogComponent]
    });
    fixture = TestBed.createComponent(MovementsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
