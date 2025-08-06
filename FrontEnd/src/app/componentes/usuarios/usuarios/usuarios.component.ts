import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../../servicios/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MenuComponent } from '../menu/menu.component';
declare var $:any

@Component({
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent implements OnInit {
  
  datos:any[] = []
  nombre:string = ""
  email:string = ""
  password:string = ""
  rol:string = "Cliente"
  estado:string = "Activo"
  idSeleccionado:string = ""

  constructor(private peticion:PeticionService){}

  ngOnInit(): void {
    this.cargarTodas()
  }

  limpiar(){
    this.nombre = ""
    this.email = ""
    this.password = ""
    this.rol = "Cliente"
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
      path:"/usuarios/cargarTodas",
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
        this.datos = res.datos.datos
      }
    })
  }

  guardar(){
      var post = {
      host:this.peticion.urlReal,
      path:"/usuarios/guardar",
      payload:{
        nombre:this.nombre,
        email:this.email,
        password:this.password,
        rol:this.rol,
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
      path:"/usuarios/cargarId/" + identificador,
      payload:{
      }
    }

    this.peticion.get(post.host + post.path).then((res:any) => {
      console.log(res)
      this.nombre = res.datos.datos.nombre
      this.email = res.datos.datos.email
      this.rol = res.datos.datos.rol
      this.estado = res.datos.datos.estado
      $('#exampleModal').modal('show')
    })
  }

  actualizar(){
    var post = {
      host:this.peticion.urlReal,
      path:"/usuarios/actualizar",
      payload:{
        _id:this.idSeleccionado,
        nombre:this.nombre,
        rol:this.rol,
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
      path:"/usuarios/eliminar",
      payload:{
        _id:this.idSeleccionado,
      }
    }
    console.log(post)
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

}
