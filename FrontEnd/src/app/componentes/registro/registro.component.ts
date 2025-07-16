import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  imports: [HeaderComponent,FooterComponent,RouterLink,FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  constructor(public peticion: PeticionService){

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
    })
  }
}