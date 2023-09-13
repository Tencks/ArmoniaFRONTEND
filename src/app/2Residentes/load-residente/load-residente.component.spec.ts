import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadResidenteComponent } from './load-residente.component';

describe('LoadResidenteComponent', () => {
  let component: LoadResidenteComponent;
  let fixture: ComponentFixture<LoadResidenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadResidenteComponent]
    });
    fixture = TestBed.createComponent(LoadResidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
