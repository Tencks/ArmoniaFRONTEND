import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResidentesComponent } from './home-residentes.component';

describe('HomeResidentesComponent', () => {
  let component: HomeResidentesComponent;
  let fixture: ComponentFixture<HomeResidentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeResidentesComponent]
    });
    fixture = TestBed.createComponent(HomeResidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
