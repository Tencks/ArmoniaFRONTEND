import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetallesMedicamentosComponent } from './home-detalles-medicamentos.component';

describe('HomeDetallesMedicamentosComponent', () => {
  let component: HomeDetallesMedicamentosComponent;
  let fixture: ComponentFixture<HomeDetallesMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDetallesMedicamentosComponent]
    });
    fixture = TestBed.createComponent(HomeDetallesMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
