import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosPanelComponent } from './permisos-panel.component';

describe('PermisosPanelComponent', () => {
  let component: PermisosPanelComponent;
  let fixture: ComponentFixture<PermisosPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermisosPanelComponent]
    });
    fixture = TestBed.createComponent(PermisosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
