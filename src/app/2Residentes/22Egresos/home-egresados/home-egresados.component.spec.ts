import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEgresadosComponent } from './home-egresados.component';

describe('HomeEgresadosComponent', () => {
  let component: HomeEgresadosComponent;
  let fixture: ComponentFixture<HomeEgresadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeEgresadosComponent]
    });
    fixture = TestBed.createComponent(HomeEgresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
