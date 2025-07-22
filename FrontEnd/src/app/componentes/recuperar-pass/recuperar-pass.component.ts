import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-pass',
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './recuperar-pass.component.html',
  styleUrl: './recuperar-pass.component.css'
})
export class RecuperarPassComponent {
    
  constructor(
    private peticion:PeticionService,
    private routes : Router,
  ){}
  
  email:string = ""
  codigoRec:string = ""
  password:string = ""

    actualizar(){
      let post = {
            host:this.peticion.urlReal,
            path:"/usuarios/RecuperarPass",
            payload:{
              email:this.email,
              codigoRec:this.codigoRec,
              password:this.password
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
