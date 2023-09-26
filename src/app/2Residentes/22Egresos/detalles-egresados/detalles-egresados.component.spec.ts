import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEgresadosComponent } from './detalles-egresados.component';

describe('DetallesEgresadosComponent', () => {
  let component: DetallesEgresadosComponent;
  let fixture: ComponentFixture<DetallesEgresadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesEgresadosComponent]
    });
    fixture = TestBed.createComponent(DetallesEgresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
