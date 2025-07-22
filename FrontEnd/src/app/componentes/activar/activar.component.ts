import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../servicios/peticion.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-activar',
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './activar.component.html',
  styleUrl: './activar.component.css'
})
export class ActivarComponent implements OnInit{
  
  constructor(
    private actroute: ActivatedRoute,
    private peticion:PeticionService,
    private routes : Router,
  ){}
  
  email:string = ""
  codigo:string = ""

  ngOnInit(): void {
    this.email = this.actroute.snapshot.params["email"]
    this.codigo = this.actroute.snapshot.params["codigo"]
  }
  

      activar(){
      let post = {
            host:this.peticion.urlReal,
            path:"/usuarios/activar",
            payload:{
              email:this.email,
              codigo:this.codigo,
            }
          }
      
          this.peticion.post(post.host + post.path,post.payload).then((res:any) => {
           
              Swal.fire({
              text: res.mensaje,
              icon: res.state == true? 'success':'error'
              });

              if(res.state == true){
                this.routes.navigate(["/login"])
              }
      })
    }
}
