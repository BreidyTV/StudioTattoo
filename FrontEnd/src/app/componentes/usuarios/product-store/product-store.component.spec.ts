import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductStoreComponent } from './product-store.component';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { LoginComponent } from '../../login/login.component';
import Swal from 'sweetalert2';

describe('ProductStoreComponent', () => {
  let component: ProductStoreComponent;
  let componentLogin: LoginComponent;
  let fixture: ComponentFixture<ProductStoreComponent>;
  let fixtureLogin: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStoreComponent, HttpClientModule],
      providers:[provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  //CARGAR TODAS
  it("Validar se cargan todos los productos almacenados en frontend al cargar todas", async() => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;

        component.cargarTodas();

        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.datos.length).toBeGreaterThan(0);
        Swal.close();

  })

  //GUARDAR

  it("Validar el campo código sea obligatorio en el FrontEnd al guardar un producto", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;
    
        component.codigo = ""
        component.nombre = ""
        component.imagen = ""
        component.cantidad = ""
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.guardar()
      setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El campo código es obligatorio')
      done()
    },300);
  })

   it("Validar el campo nombre sea obligatorio en el FrontEnd al guardar un producto", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;
    
        component.codigo = "STP0015"
        component.nombre = ""
        component.imagen = ""
        component.cantidad = ""
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.guardar()
      setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El campo nombre es obligatorio')
      done()
    },300);
  })

  it("Validar el campo imagen sea obligatorio en el FrontEnd al guardar un producto", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;
    
        component.codigo = "STP0015"
        component.nombre = "Camisa calavera"
        component.imagen = ""
        component.cantidad = ""
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.guardar()
      setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El campo imagen es obligatorio')
      done()
    },300);
  })

  it("Validar el campo cantidad sea obligatorio en el FrontEnd al guardar un producto", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;
    
        component.codigo = "STP0015"
        component.nombre = "Camisa calavera"
        component.imagen = "img.png"
        component.cantidad = ""
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.guardar()
      setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El campo cantidad es obligatorio')
      done()
    },300);
  })

  it("Validar el campo precio sea obligatorio en el FrontEnd al guardar un producto", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;
    
        component.codigo = "STP0015"
        component.nombre = "Camisa calavera"
        component.imagen = "img.png"
        component.cantidad = "8"
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.guardar()
      setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El campo precio es obligatorio')
      done()
    },300);
  })

  it("Validar el campo descripcion sea obligatorio en el FrontEnd al guardar un producto", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;
    
        component.codigo = "STP0015"
        component.nombre = "Camisa calavera"
        component.imagen = "img.png"
        component.cantidad = "8"
        component.precio = "70000"
        component.descripcion = ""
        component.estado = ""
    
        component.guardar()
      setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El campo descripcion es obligatorio')
      done()
    },300);
  })

  it("Validar el campo estado sea obligatorio en el FrontEnd al guardar un producto", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;
    
        component.codigo = "STP0015"
        component.nombre = "Camisa calavera"
        component.imagen = "img.png"
        component.cantidad = "8"
        component.precio = "70000"
        component.descripcion = "100% algodón, color negro con blanco. Disponible en tallas S, M, L y LX."
        component.estado = ""
    
        component.guardar()
      setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El campo estado es obligatorio')
      done()
    },300);
  })

  it("Validar el código del producto no exista previamente al guardar el producto", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;
    
        component.codigo = "STP001"
        component.nombre = "Camisa calavera"
        component.imagen = "img.png"
        component.cantidad = "8"
        component.precio = "70000"
        component.descripcion = "100% algodón, color negro con blanco. Disponible en tallas S, M, L y LX."
        component.estado = "Activo"
    
        component.guardar()
      setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El codigo del producto ya existe, intente con otro')
      done()
    },4000);
  })

  it("Validar el producto fue almacenado al guardarlo", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;

        var random = Math.floor(Math.random() * (999 - 100) + 100)
    
        component.codigo = "STP" + random
        component.nombre = "Camisa calavera"
        component.imagen = "img.png"
        component.cantidad = "8"
        component.precio = "70000"
        component.descripcion = "100% algodón, color negro con blanco. Disponible en tallas S, M, L y LX."
        component.estado = "Activo"
    
        component.guardar()
      setTimeout(() => {
      expect(component.respuestaAPI.mensaje).toBe('El producto fue almacenado correctamente')
      done()
    },4000);
  })


  //CARGAR ID
  let Id = ""

  it("Validar se carga un producto en frontend al cargar ID", (done) => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;

        (component as any).peticion.get((component as any).peticion.urlReal + "/productos/cargarTodas").then((res:any) => {
          expect(res.length).toBeGreaterThan(0);

          Id = res[0]._id
          component.cargarId(Id)
          setTimeout(() => {
          expect(component.codigo).toBe(res[0].codigo);
          expect(component.nombre).toBe(res[0].nombre);
          expect(component.imagen).toBe(res[0].imagen);
          expect(component.cantidad).toBe(res[0].cantidad);
          expect(component.precio).toBe(res[0].precio);
          expect(component.descripcion).toBe(res[0].descripcion);
            done()
          },4000);
        }) 
      })   
  

  //ACTUALIZAR

  it("Validar se carga un producto en frontend para actualizar el producto", async() => {  
    fixture = TestBed.createComponent(ProductStoreComponent);
    component = fixture.componentInstance;

    component.cargarTodas();

    await fixture.whenStable();
    fixture.detectChanges();

    Id = component.datos[component.datos.length - 1]._id;
    component.cargarId(Id);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.idSeleccionado).toBe(Id);
  });


  it("Validar el campo ID sea capturado en frontend para actualizar un producto", async() => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;


        component._id = "";
        component.nombre = ""
        component.imagen = ""
        component.cantidad = ""
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.actualizar()
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.respuestaAPI.mensaje).toBe('El campo _id es obligatorio')
  })  
  
  it("Validar el campo nombre sea capturado en frontend para actualizar un producto", async() => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;

        component.cargarTodas();

        await fixture.whenStable();
        fixture.detectChanges();

        Id = component.datos[component.datos.length - 1]._id;
        component.cargarId(Id);
        await fixture.whenStable();
        fixture.detectChanges();

        component._id = component.idSeleccionado
        component.nombre = ""
        component.imagen = ""
        component.cantidad = ""
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.actualizar()
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.respuestaAPI.mensaje).toBe('El campo nombre es obligatorio')
  })

  it("Validar el campo imagen sea capturado en frontend para actualizar un producto", async() => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;

        component.cargarTodas();

        await fixture.whenStable();
        fixture.detectChanges();

        Id = component.datos[component.datos.length - 1]._id;
        component.cargarId(Id);
        await fixture.whenStable();
        fixture.detectChanges();

        component._id = component.idSeleccionado
        component.nombre = "CAMISA CALAVERA"
        component.imagen = ""
        component.cantidad = ""
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.actualizar()
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.respuestaAPI.mensaje).toBe('El campo imagen es obligatorio')
  })

  it("Validar el campo cantidad sea capturado en frontend para actualizar un producto", async() => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;

        component.cargarTodas();

        await fixture.whenStable();
        fixture.detectChanges();

        Id = component.datos[component.datos.length - 1]._id;
        component.cargarId(Id);
        await fixture.whenStable();
        fixture.detectChanges();

        component._id = component.idSeleccionado
        component.nombre = "CAMISA CALAVERA"
        component.imagen = "img.png"
        component.cantidad = ""
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.actualizar()
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.respuestaAPI.mensaje).toBe('El campo cantidad es obligatorio')
  })

  it("Validar el campo precio sea capturado en frontend para actualizar un producto", async() => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;

        component.cargarTodas();

        await fixture.whenStable();
        fixture.detectChanges();

        Id = component.datos[component.datos.length - 1]._id;
        component.cargarId(Id);
        await fixture.whenStable();
        fixture.detectChanges();

        component._id = component.idSeleccionado
        component.nombre = "CAMISA CALAVERA"
        component.imagen = "img.png"
        component.cantidad = "2"
        component.precio = ""
        component.descripcion = ""
        component.estado = ""
    
        component.actualizar()
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.respuestaAPI.mensaje).toBe('El campo precio es obligatorio')
  })

  it("Validar el campo descripción sea capturado en frontend para actualizar un producto", async() => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;

        component.cargarTodas();

        await fixture.whenStable();
        fixture.detectChanges();

        Id = component.datos[component.datos.length - 1]._id;
        component.cargarId(Id);
        await fixture.whenStable();
        fixture.detectChanges();

        component._id = component.idSeleccionado
        component.nombre = "CAMISA CALAVERA"
        component.imagen = "img.png"
        component.cantidad = "2"
        component.precio = "55000"
        component.descripcion = ""
        component.estado = ""
    
        component.actualizar()
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.respuestaAPI.mensaje).toBe('El campo descripcion es obligatorio')
  })

  it("Validar el campo estado sea capturado en frontend para actualizar un producto", async() => {  
        fixture = TestBed.createComponent(ProductStoreComponent);
        component = fixture.componentInstance;

        component.cargarTodas();

        await fixture.whenStable();
        fixture.detectChanges();

        Id = component.datos[component.datos.length - 1]._id;
        component.cargarId(Id);
        await fixture.whenStable();
        fixture.detectChanges();

        component._id = component.idSeleccionado
        component.nombre = "CAMISA CALAVERA"
        component.imagen = "img.png"
        component.cantidad = "2"
        component.precio = "55000"
        component.descripcion = "A B C"
        component.estado = ""
    
        component.actualizar()
        await fixture.whenStable();
        fixture.detectChanges();
        expect(component.respuestaAPI.mensaje).toBe('El campo estado es obligatorio')
  })

  it("Validar toda la información sea capturada en frontend para actualizar un producto", async() => {  
      fixture = TestBed.createComponent(ProductStoreComponent);
      component = fixture.componentInstance;

      component.cargarTodas();

      await fixture.whenStable();
      fixture.detectChanges();

      Id = component.datos[component.datos.length - 1]._id;
      component.cargarId(Id);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(component.precio.toString()).toBe('70000')

      component._id = component.idSeleccionado
      component.nombre = "CAMISA CALAVERA"
      component.imagen = "img.png"
      component.cantidad = "2"
      component.precio = "55000"
      component.descripcion = "A B C"
      component.estado = "Activo"
  
      component.actualizar()
      await fixture.whenStable();
      fixture.detectChanges();
      expect(component.respuestaAPI.mensaje).toBe('Se ha actualizado el elemento')
      expect(component.precio).toBe('55000')

  })


  //ELIMINAR

  it("Validar se carga un producto en frontend para eliminar el producto", async() => {  
    fixture = TestBed.createComponent(ProductStoreComponent);
    component = fixture.componentInstance;

    component.cargarTodas();

    await fixture.whenStable();
    fixture.detectChanges();

    Id = component.datos[component.datos.length - 1]._id;
    component.cargarId(Id);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.idSeleccionado).toBe(Id);
  });

  it("Eliminar el producto seleccionado en el FrontEnd al eliminar el producto", async() => {  
      fixture = TestBed.createComponent(ProductStoreComponent);
      component = fixture.componentInstance;

      component.cargarTodas();

      await fixture.whenStable();
      fixture.detectChanges();

      Id = component.datos[component.datos.length - 1]._id;
      component.cargarId(Id);
      await fixture.whenStable();
      fixture.detectChanges();
  
        
      component.eliminar()
      await fixture.whenStable();
      fixture.detectChanges();
      expect(component.respuestaAPI.mensaje).toBe('El producto se ha eliminado')

    })


})
      