import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
declare var $:any

@Component({
  selector: 'app-mi-perfil',
  imports: [MenuComponent, FormsModule, CommonModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent implements OnInit{

  nombre:string = ""
  email:string = ""
  fechaNacimiento:string = ""
  rol:string = ""
  estado:string = ""
  password:string = ""
  datos:any = {nombre:"", email:"", fechaNacimiento:"", rol:"", estado:""} 
  @ViewChild(MenuComponent) ventanaMenu!: MenuComponent;                            //componente a variable

  constructor(private peticion:PeticionService){}
  
  ngOnInit(): void {
    this.cargarMisDatos()
    //this.ventanaMenu.nombre
  }

  cargarMisDatos(){
      let post = {
        host:this.peticion.urlReal,
        path:"/usuarios/miPerfil",
        payload:{
        }
      }
  
      this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
        console.log(res)
        this.datos=res.datos
        this.nombre = res.datos.nombre
        this.fechaNacimiento = res.datos.fechaNacimiento
        this.email = res.datos.email
        this.rol = res.datos.rol
        this.estado = res.datos.estado
      }
  )}

   limpiar(){
    this.nombre = ""
    this.fechaNacimiento = ""
    this.password = ""
  }

  actualizarNom(){
    this.limpiar()
    $('#actualizarMisDatos').modal('show')

  }

  actualizarMisDatos(){
      let post = {
        host:this.peticion.urlReal,
        path:"/usuarios/actualizarMiPerfil",
        payload:{
          nombre:this.nombre,
          fechaNacimiento:this.fechaNacimiento,
        }
      }
  
      this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
        console.log(res)
        Swal.fire({
            title: res.state == true? 'Que bien':'Ouch!',
            text: res.mensaje,
            icon: res.state == true? 'success':'error'
            });
        $('#actualizarMisDatos').modal('hide')
        this.cargarMisDatos()
        this.ventanaMenu.cargarEstado()                   //activar una función de una pagina diferente (menu)
      }
  )}

  actualizarCon(){
    this.limpiar()
    $('#actualizarPass').modal('show')
  }

  actualizarPass(){
      let post = {
        host:this.peticion.urlReal,
        path:"/usuarios/actualizarPass",
        payload:{
          password:this.password,
        }
      }
  
      this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
        Swal.fire({
                text: res.mensaje,
                icon: res.state == true? 'success':'error'
                });
        $('#actualizarPass').modal('hide')
      }
    )}



  }