import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMedicamentoArmoniaComponent } from './update-medicamento-armonia.component';

describe('UpdateMedicamentoArmoniaComponent', () => {
  let component: UpdateMedicamentoArmoniaComponent;
  let fixture: ComponentFixture<UpdateMedicamentoArmoniaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMedicamentoArmoniaComponent]
    });
    fixture = TestBed.createComponent(UpdateMedicamentoArmoniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
