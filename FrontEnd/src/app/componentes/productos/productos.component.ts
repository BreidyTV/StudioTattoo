import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { MisProductos } from '../../interface/mis-productos';
import { FormsModule } from '@angular/forms';
import { FiltroPipe } from '../../pipe/filtro.pipe';

@Component({
  selector: 'app-productos',
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, FiltroPipe],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  criterio:string = ""

  productos:MisProductos[] = [
    { imagen:"Producto1.png",
      producto:"Caja de agujas",
      descripcion:"Caja de 50 agujas con 50 punteras. Referencias disponibles RL, RS, M1 y RM. Puedes pedir la caja surtida en múltiplos de 5 unidades, por referencia o toda de sólo una referencia.",
      precio:57000,
      cantidad:0
    },

    { imagen:"producto2.png",
      producto:"Pigmento para tatuar",
      descripcion:"Contenido: 30ml c/u. Variedad de colores. Radiant Ink una de las marcas de tintas para tatuajes más reconocidas a nivel mundial , pigmento complemente original y seguro para la realización de tatuajes.",
      precio:28000,
      cantidad:3
    },

    { imagen:"producto3.png",
      producto:"Pomada cuidado tatuaje",
      descripcion:"Bepanthol Tattoo es la fórmula experta para el cuidado específico de la piel tatuada. Mantiene la piel hidratada y la ayuda a regenerarse tras el tatuaje, la protege con una capa transparente que permite que la piel respire.",
      precio:64000,
      cantidad:10
    },

    { imagen:"producto4.png",
      producto:"Crema anestésica para tatuajes",
      descripcion:"Contenido: 10gr. Un producto que te brindará un alivio durante el proceso de tatuaje. Este producto es ideal para aquellos que buscan una solución efectiva para reducir el dolor y la incomodidad.",
      precio:50000,
      cantidad:2
    },

    { imagen:"producto5.png",
      producto:"Piercing acero quirurgico",
      descripcion:"Aros clicker de 8mm a 12mm. Aro Nostril. Herradura de 8mm a 10mm. Industrial. Labret de 6mm a 12mm. Banana de 8mm a 12mm. Helix de 8mm a 10mm",
      precio:30000,
      cantidad:7
    },

    { imagen:"producto6.jpg",
      producto:"Piercing titanio",
      descripcion:"Aros clicker de 8mm a 12mm. Aro Nostril. Herradura de 8mm a 10mm. Industrial. Labret y banana de 6mm a 12mm. Helix de 8mm a 10mm. Ombligo.",
      precio:60000,
      cantidad:40
    },

  ]

}


