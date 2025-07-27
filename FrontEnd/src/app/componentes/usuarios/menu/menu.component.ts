import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { InicialesPipe } from '../../../pipe/iniciales.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, InicialesPipe, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  nombre:string = "Cargando..."
  rol:string = "Cargando..."

  constructor(private peticion: PeticionService, private router: Router){}

  ngOnInit(): void {
    this.cargarEstado()
  }


  cargarEstado(){

  let post = {
        host:this.peticion.urlReal,
        path:"/usuarios/estado",
        payload:{
        }
      }

  this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
    console.log(res)
    this.nombre = res.nombre
    this.rol = res.rol
    if(this.nombre == undefined || this.nombre == ""){
      this.router.navigate(["login"])
    }

  })

  }

  logOut(){

  let post = {
        host:this.peticion.urlReal,
        path:"/usuarios/logOut",
        payload:{
        }
      }

  this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
    console.log(res)
    Swal.fire({
            text: res.mensaje,
            icon: res.state == true? 'success':'error'
            });
    this.router.navigate(["login"])
  })

  }

}
