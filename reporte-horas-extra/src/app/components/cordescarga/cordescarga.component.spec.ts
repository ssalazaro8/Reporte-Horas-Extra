import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordescargaComponent } from './cordescarga.component';

describe('CordescargaComponent', () => {
  let component: CordescargaComponent;
  let fixture: ComponentFixture<CordescargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CordescargaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CordescargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
