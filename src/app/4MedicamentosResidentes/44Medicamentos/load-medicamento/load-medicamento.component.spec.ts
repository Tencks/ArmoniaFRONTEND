import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMedicamentoComponent } from './load-medicamento.component';

describe('LoadMedicamentoComponent', () => {
  let component: LoadMedicamentoComponent;
  let fixture: ComponentFixture<LoadMedicamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadMedicamentoComponent]
    });
    fixture = TestBed.createComponent(LoadMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
