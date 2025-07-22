import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [HeaderComponent,FooterComponent,RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(public peticion: PeticionService, private routes : Router){

  }

  email:string = ""
  password:string = ""

  iniciar(){
    let post = {
      host:this.peticion.urlReal,
      path:"/usuarios/login",
      payload:{
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
                this.routes.navigate(["/miPerfil"])
              }
    })

  }

}
