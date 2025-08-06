import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltroPipe } from '../../pipe/filtro.pipe';
import { PeticionService } from '../../servicios/peticion.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterLink, FiltroPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{

  datos:any[] = []
  criterio:string = ""

  ngOnInit(): void {
    this.cargarTodasCliente()
  }

  constructor(public peticion: PeticionService){}

  cargarTodasCliente(){
    let post = {
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


