import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMedicamentosComponent } from './home-medicamentos.component';

describe('HomeMedicamentosComponent', () => {
  let component: HomeMedicamentosComponent;
  let fixture: ComponentFixture<HomeMedicamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMedicamentosComponent]
    });
    fixture = TestBed.createComponent(HomeMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
