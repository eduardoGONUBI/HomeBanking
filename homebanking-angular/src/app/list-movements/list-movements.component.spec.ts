import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovementsComponent } from './list-movements.component';

describe('ListMovementsComponent', () => {
  let component: ListMovementsComponent;
  let fixture: ComponentFixture<ListMovementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMovementsComponent]
    });
    fixture = TestBed.createComponent(ListMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
