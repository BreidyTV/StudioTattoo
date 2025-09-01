import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../../servicios/peticion.service';
import Swal from 'sweetalert2';
declare var $:any

@Component({
  selector: 'app-product-store',
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './product-store.component.html',
  styleUrl: './product-store.component.css'
})
export class ProductStoreComponent implements OnInit{

  datos:any[] = []
  codigo:string = ""
  nombre:string = ""
  imagen:string = "/img.png"
  precio:string = "0"
  cantidad:string = "0"
  descripcion:string = ""
  estado:string = "Activo"
  idSeleccionado:string = ""
  selectedFile!:File
  aleatorio:number = 1

  constructor(public peticion:PeticionService){}

  ngOnInit(): void {
    this.cargarTodas()
  }

  limpiar(){
    this.codigo = ""
    this.nombre = ""
    this.imagen = "imagen.png"
    this.cantidad = ""
    this.precio = ""
    this.descripcion = ""
    this.estado = "Activo"
    this.idSeleccionado = ""
  }

  nuevo(){
    this.limpiar()
    $('#exampleModal').modal('show')
  }

  cargarTodas(){
      var post = {
        host:this.peticion.urlReal,
        path:"/productos/cargarTodas",
        payload:{
        }
      }
  
      this.peticion.get(post.host + post.path).then((res:any) => {
        if(res.state == false){
          this.datos = []
          Swal.fire({
            title: res.state == true? 'Que bien':'Ouch!',
            text: res.mensaje,
            icon: res.state == true? 'success':'error'
          });
        }
        else {
          this.datos = res
        }
      })
    }
  
  guardar(){
        var post = {
        host:this.peticion.urlReal,
        path:"/productos/guardar",
        payload:{
          codigo:this.codigo,
          nombre:this.nombre,
          imagen:this.imagen,
          precio:this.precio.toString(),
          cantidad:this.cantidad.toString(),
          descripcion:this.descripcion,
          estado:this.estado,          
        }
      }
  
      this.peticion.post(post.host + post.path, post.payload).then((res:any) => {
        
        Swal.fire({
        title: res.state == true? 'Que bien':'Ouch!',
        text: res.mensaje,
        icon: res.state == true? 'success':'error'
        });
        if(res.state == true){
        $('#exampleModal').modal('hide')
        this.cargarTodas()
        }
      })
  }
  
  cargarId(identificador:string){
        console.log(identificador)
        this.idSeleccionado = identificador
    
        var post = {
          host:this.peticion.urlReal,
          path:"/productos/cargarId/" + identificador,
          payload:{
          }
        }
    
        this.peticion.get(post.host + post.path).then((res:any) => {
          console.log(res)
          this.codigo = res[0].codigo
          this.nombre = res[0].nombre
          this.imagen = res[0].imagen
          this.precio = res[0].precio
          this.cantidad = res[0].cantidad
          this.descripcion = res[0].descripcion
          this.estado = res[0].estado
          $('#exampleModal').modal('show')
        })
  }
  
  actualizar(){
      var post = {
        host:this.peticion.urlReal,
        path:"/productos/actualizar",
        payload:{
          _id:this.idSeleccionado,
          nombre:this.nombre,
          imagen:this.imagen,
          precio:this.precio.toString(),
          cantidad:this.cantidad.toString(),
          descripcion:this.descripcion,
          estado:this.estado,
        }
      }
  
      this.peticion.put(post.host + post.path, post.payload).then((res:any) => {
        Swal.fire({
        title: res.state == true? 'Que bien':'Ouch!',
        text: res.mensaje,
        icon: res.state == true? 'success':'error'
        });
        if(res.state == true){
          $('#exampleModal').modal('hide')
          this.cargarTodas()
        }
      })
  }
    
  eliminar(){
      
      var post = {
        host:this.peticion.urlReal,
        path:"/productos/eliminar",
        payload:{
          _id:this.idSeleccionado,
        }
      }
  
      this.peticion.delete(post.host + post.path, post.payload).then((res:any) => {
        Swal.fire({
        title: res.state == true? 'Que bien':'Ouch!',
        text: res.mensaje,
        icon: res.state == true? 'success':'error'
        });
        if(res.state == true){
          $('#exampleModal').modal('hide')
          this.cargarTodas()
        }
      })
  }

    upLoadFile(){                       //carga el archivo seleccionado
    var post = {
      host:this.peticion.urlReal,
      path:"/anexos/anexosProductos/" + this.idSeleccionado
    }

    this.peticion.upLoadFile(this.selectedFile,post.host + post.path).subscribe((res:any) => {      //observable .subscribe
      console.log(res)

      if(res.state == true){
        Swal.fire({
        title: 'Que bien',
        text: res.mensaje,
        icon: 'success',
        });
        this.random()
        $('#exampleModal').modal('hide')
      }
      else {
        Swal.fire({
        title: 'Ouchh!',
        text: res.mensaje,
        icon: 'error',
      });
    }
    })         
  }

  onFileSelected(event:any){          //identificar el archivo seleccionado
    this.selectedFile = event.target.files[0]
    this.upLoadFile()
  }

  random(){
    this.aleatorio = Math.floor(Math.random() * (9999-1000) + 1000);

  }
}
