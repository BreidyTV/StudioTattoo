import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRecuperarPassComponent } from './solicitud-recuperar-pass.component';

describe('SolicitudRecuperarPassComponent', () => {
  let component: SolicitudRecuperarPassComponent;
  let fixture: ComponentFixture<SolicitudRecuperarPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudRecuperarPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudRecuperarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
