import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuracionesMedicoComponent } from './curaciones-medico.component';

describe('CuracionesMedicoComponent', () => {
  let component: CuracionesMedicoComponent;
  let fixture: ComponentFixture<CuracionesMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuracionesMedicoComponent]
    });
    fixture = TestBed.createComponent(CuracionesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
