import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadObservacionesMedicoComponent } from './load-observaciones-medico.component';

describe('LoadObservacionesMedicoComponent', () => {
  let component: LoadObservacionesMedicoComponent;
  let fixture: ComponentFixture<LoadObservacionesMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadObservacionesMedicoComponent]
    });
    fixture = TestBed.createComponent(LoadObservacionesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
