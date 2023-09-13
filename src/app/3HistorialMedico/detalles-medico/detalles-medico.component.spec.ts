import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMedicoComponent } from './detalles-medico.component';

describe('DetallesMedicoComponent', () => {
  let component: DetallesMedicoComponent;
  let fixture: ComponentFixture<DetallesMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesMedicoComponent]
    });
    fixture = TestBed.createComponent(DetallesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
