import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResidenteComponent } from './update-residente.component';

describe('UpdateResidenteComponent', () => {
  let component: UpdateResidenteComponent;
  let fixture: ComponentFixture<UpdateResidenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateResidenteComponent]
    });
    fixture = TestBed.createComponent(UpdateResidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
