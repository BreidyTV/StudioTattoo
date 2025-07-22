import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

    transform(productos: any[], texto:string): any[] {
    if(texto == ""){
      return productos
    }
    else{
      const resultado = productos.map(item => ({...item,completo: Object.values(item).join(' ')}));
      console.log(resultado);

      let regex = new RegExp(texto, 'i')                                          //EXTRESION REGULAR PARA BUSCAR POR COINCIDENCIAS DENTRO DEL CONTENIDO
      let arrayrespuesta = resultado.filter((item) => regex.test(item.completo))
      return arrayrespuesta;
    }
    
  }

}