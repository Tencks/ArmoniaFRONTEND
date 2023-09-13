import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionesMedicoComponent } from './observaciones-medico.component';

describe('ObservacionesMedicoComponent', () => {
  let component: ObservacionesMedicoComponent;
  let fixture: ComponentFixture<ObservacionesMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservacionesMedicoComponent]
    });
    fixture = TestBed.createComponent(ObservacionesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
