import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("Validar el dato nombre sea obligatorio en el FrontEnd al registrar", (done) => {  
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = ""
    component.email = ""
    component.password = ""

    component.registrar()
    setTimeout(() => {
      //expect(document.getElementById("swal2-html-container")?.innerText).toBe('El campo nombre es obligatorio')
      expect(component.respuestaAPI.mensaje).toBe('El campo nombre es obligatorio')
      done()
    },300);
  })

  it("Validar el dato email sea obligatorio en el FrontEnd al registrar", (done) => {  
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = "Breidy"
    component.email = ""
    component.password = ""

    component.registrar()
    setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El campo correo electrónico es obligatorio')
      done()
    },300);
  })

  it("Validar el dato password sea obligatorio en el FrontEnd al registrar", (done) => {  
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = "Breidy"
    component.email = "breidy_19@hotmail.com"
    component.password = ""

    component.registrar()
    setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El campo contraseña es obligatorio')
      done()
    },300);
  })

  it("Validar el email ya existe en el FrontEnd al registrar", (done) => {  
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    component.nombre = "Breidy"
    component.email = "breidy_19@hotmail.com"
    component.password = "123"

    component.registrar()
    setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El correo electronico ya esta en uso, intenta con otro')
      done()
    },300);
  })

  it("Validar el registro del usuario en FrontEnd al registrar", (done) => {  
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;

    var random = Math.floor(Math.random() * (99999 - 10000) + 10000)

    component.nombre = "Breidy"
    component.email = "breidy" + random + "@hotmail.com"
    component.password = "123"

    component.registrar()
    setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('Usuario registrado correctamente, verifica tu correo electronico para activar la cuenta')
      done()
    },4000);
  })


});
