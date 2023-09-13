import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesResidentesComponent } from './detalles-residentes.component';

describe('DetallesResidentesComponent', () => {
  let component: DetallesResidentesComponent;
  let fixture: ComponentFixture<DetallesResidentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesResidentesComponent]
    });
    fixture = TestBed.createComponent(DetallesResidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
