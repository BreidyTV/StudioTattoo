import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../servicios/peticion.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit{

  constructor(public peticion:PeticionService, private actroutes:ActivatedRoute){}
  data:any = {}
  datos:any = []

  ngOnInit(): void {
    console.log(this.actroutes.snapshot.params["_id"])
    console.log(this.actroutes.snapshot.params["nombre"])
    this.cargarId(this.actroutes.snapshot.params["_id"])
    this.cargarTodasCliente()
  }

  cargarId(identificador:string){
    let post = {
          host:this.peticion.urlReal,
          path:"/productos/cargarId/" + identificador,
          payload:{
          }
        }
    
        this.peticion.get(post.host + post.path).then((res:any) => {
          console.log(res)
          this.data = res[0]
        })
  }
  
  cargarTodasCliente(){
    var post = {
      host:this.peticion.urlReal,
      path:"/productos/cargarTodasCliente",
      payload:{
      }
    }

    this.peticion.get(post.host + post.path).then((res:any) => {
      this.datos = res
    })
  }
  
}
