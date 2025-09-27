import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRecuperarPassComponent } from './solicitud-recuperar-pass.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('SolicitudRecuperarPassComponent', () => {
  let component: SolicitudRecuperarPassComponent;
  let fixture: ComponentFixture<SolicitudRecuperarPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudRecuperarPassComponent, HttpClientModule],
      providers:[provideRouter(routes)]
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
