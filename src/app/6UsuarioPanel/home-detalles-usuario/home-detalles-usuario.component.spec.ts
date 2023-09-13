import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDetallesUsuarioComponent } from './home-detalles-usuario.component';

describe('HomeDetallesUsuarioComponent', () => {
  let component: HomeDetallesUsuarioComponent;
  let fixture: ComponentFixture<HomeDetallesUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDetallesUsuarioComponent]
    });
    fixture = TestBed.createComponent(HomeDetallesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
