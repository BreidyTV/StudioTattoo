import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [HeaderComponent,FooterComponent,FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(public peticion: PeticionService, private routes : Router){

  }
  nombre:string = ""
  email:string = ""
  password:string = ""

  registrar(){
    let post = {
      host:this.peticion.urlReal,
      path:"/usuarios/registrar",
      payload:{
        nombre:this.nombre,
        email:this.email,
        password:this.password,
      }
    }

    this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
      console.log(res)
      if(res.state == false){
        Swal.fire({
        text: res.mensaje,
        icon: "error"
        });
      }
      else{
        Swal.fire({
        text: res.mensaje,
        icon: "success"
        });
      }

      if(res.state == true){
                this.routes.navigate(["/login"])
              }
    })


  }
}