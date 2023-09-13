import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmoniaUpdateComponent } from './armonia-update.component';

describe('ArmoniaUpdateComponent', () => {
  let component: ArmoniaUpdateComponent;
  let fixture: ComponentFixture<ArmoniaUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArmoniaUpdateComponent]
    });
    fixture = TestBed.createComponent(ArmoniaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
