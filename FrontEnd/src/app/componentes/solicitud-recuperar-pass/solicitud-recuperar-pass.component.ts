import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-recuperar-pass',
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './solicitud-recuperar-pass.component.html',
  styleUrl: './solicitud-recuperar-pass.component.css'
})
export class SolicitudRecuperarPassComponent{
    
  constructor(public peticion: PeticionService, private routes : Router){

  }
  
  email:string = ""

    solicitudCod(){
      let post = {
            host:this.peticion.urlReal,
            path:"/usuarios/solicitudRecuperarPass",
            payload:{
              email:this.email,
            }
          }
      
          this.peticion.post(post.host + post.path, post.payload).then((res:any) => {
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
                this.routes.navigate(["/recuperarPass"])
              }
      })
    }

}
