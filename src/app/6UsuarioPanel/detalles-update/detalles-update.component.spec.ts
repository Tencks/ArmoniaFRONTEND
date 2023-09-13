import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesUpdateComponent } from './detalles-update.component';

describe('DetallesUpdateComponent', () => {
  let component: DetallesUpdateComponent;
  let fixture: ComponentFixture<DetallesUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesUpdateComponent]
    });
    fixture = TestBed.createComponent(DetallesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
