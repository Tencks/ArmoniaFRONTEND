import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMedicamentosArmoniaComponent } from './load-medicamentos-armonia.component';

describe('LoadMedicamentosArmoniaComponent', () => {
  let component: LoadMedicamentosArmoniaComponent;
  let fixture: ComponentFixture<LoadMedicamentosArmoniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadMedicamentosArmoniaComponent]
    });
    fixture = TestBed.createComponent(LoadMedicamentosArmoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
