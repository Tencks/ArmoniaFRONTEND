import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCuracionesMedicoComponent } from './load-curaciones-medico.component';

describe('LoadCuracionesMedicoComponent', () => {
  let component: LoadCuracionesMedicoComponent;
  let fixture: ComponentFixture<LoadCuracionesMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadCuracionesMedicoComponent]
    });
    fixture = TestBed.createComponent(LoadCuracionesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
