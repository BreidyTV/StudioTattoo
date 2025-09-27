import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { RegistroComponent } from '../registro/registro.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("Validar el dato email sea obligatorio en el FrontEnd al hacer login", (done) => {  
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
  
      component.email = ""
      component.password = ""
  
      component.iniciar()
      setTimeout(() => {
        expect(component.respuestaAPI.mensaje).toBe('El campo correo electrónico es obligatorio')
        done()
      },300);
    })

    it("Validar el dato password sea obligatorio en el FrontEnd al hacer login", (done) => {  
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
  
      component.email = "breidy_19@hotmail.com"
      component.password = ""
  
      component.iniciar()
      setTimeout(() => {
        expect(component.respuestaAPI.mensaje).toBe('El campo contraseña es obligatorio')
        done()
      },300);
    })

    it("Validar las credenciales fallen en el FrontEnd al hacer login", (done) => {  
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
  
      component.email = "breidy_19@hotmail.com"
      component.password = "abc"
  
      component.iniciar()
      setTimeout(() => {
        expect(component.respuestaAPI.mensaje).toBe('Credenciales invalidas')
        done()
      },300);
    })

    it("Validar inicie sesión en el FrontEnd al hacer login", (done) => {  
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
  
      component.email = "breidy_19@hotmail.com"
      component.password = "123"
  
      component.iniciar()
      setTimeout(() => {
        expect(component.respuestaAPI.mensaje).toBe('Bienvenid@ Breidy Trejos')
        done()
      },300);
    })


});
