import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRegistroComponent } from './inicio-registro.component';

describe('InicioRegistroComponent', () => {
  let component: InicioRegistroComponent;
  let fixture: ComponentFixture<InicioRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioRegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
