import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarRegistrosComponent } from './navbar-registros.component';

describe('NavbarRegistrosComponent', () => {
  let component: NavbarRegistrosComponent;
  let fixture: ComponentFixture<NavbarRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarRegistrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
