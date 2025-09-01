import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PeticionService } from '../../servicios/peticion.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactanos',
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {

  constructor(private peticion: PeticionService){}

  quienSoy:string = "---"
  nombre:string = ""
  email:string = ""
  telefono:string = ""
  mensaje:string = ""

  limpiar(){
    this.quienSoy = "---"
    this.nombre = ""
    this.email = ""
    this.telefono = ""
    this.mensaje = ""
  }

  enviarMensaje(){

    var post = {
      host: this.peticion.urlReal,
      path: "/contactenos/enviarMensaje",
      payload: {
        quienSoy:this.quienSoy,
        nombre:this.nombre,
        email:this.email,
        telefono:this.telefono,
        mensaje:this.mensaje
      }
    }

  this.peticion.post(post.host + post.path, post.payload).then((res:any) => {
    console.log(res)
    Swal.fire({
      text: res.mensaje,
      icon: "success"
      });
    this.limpiar()
  })


  }

}
