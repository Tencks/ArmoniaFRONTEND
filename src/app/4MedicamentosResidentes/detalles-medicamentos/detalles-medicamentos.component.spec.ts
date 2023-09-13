import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesMedicamentosComponent } from './detalles-medicamentos.component';

describe('DetallesMedicamentosComponent', () => {
  let component: DetallesMedicamentosComponent;
  let fixture: ComponentFixture<DetallesMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesMedicamentosComponent]
    });
    fixture = TestBed.createComponent(DetallesMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
