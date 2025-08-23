import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { PeticionService } from '../../../servicios/peticion.service';
declare var Chart:any

@Component({
  selector: 'app-dash-board',
  imports: [MenuComponent],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit{

  constructor(private peticion: PeticionService){}

  ngOnInit(): void {
    this.grafico1()
    this.grafico2()

  }

  grafico1(){

    var post = {
      host:this.peticion.urlReal,
      path: "/usuarios/sesionesActivas",
      payload: {}
    }

    this.peticion.post(post.host + post.path, post.payload).then((res:any) => {
      console.log(res)
      var emails = res.map((item:any) => item.email)
      var cantidades = res.map((item:any) => item.numeroSesiones)
      console.log(emails)
      console.log(cantidades)

      const ctx = document.getElementById('myChart1') as HTMLCanvasElement;
      new Chart(ctx,{
        type: 'line',
        data: {
          labels: emails,    
          datasets:[{                      
            label: "Sesiones abiertas por usuario",  // TITULO, etiqueta del conjunto de datos
            data: cantidades,            // Datos del conjunto de datos
            borderColor: 'rgba(165, 42, 42, 0.9)',
            backgroundColor: 'rgba(165, 42, 42, 0.5)',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "I n i c i o   D e   S e s i ó n   P o r   U s u a r i o",
              color: '#c6c5c5',
                font: {
                  size: 18,
                  weight: '600',
                  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
                }
            },
            legend: {
              labels: {
                color: '#c6c5c5', // color del texto
                font: {
                  size: 14,
                  style: 'italic',
                  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,       //Comenzar en el eje y en cero
              grid: {
                color: '#49494944',         // color de las líneas
                borderDash: [5, 15],    // [longitud del trazo, espacio]
                lineWidth: 1
              },
              ticks: {
                color: '#c6c5c5', // color del texto
                font: {
                  weight: 'normal',
                  size: 12,
                  style: 'none',
                  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
                }
              }
            },
            x: {
              ticks: {
                color: '#c6c5c5', // color del texto
                font: {
                  weight: 'normal',
                  size: 12,
                  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
                }
              }
            }
          }
        }
        
      });
    }) 
  }

  grafico2(){

    var post = {
      host:this.peticion.urlReal,
      path: "/usuarios/sesionesActivas",
      payload: {}
    }

    this.peticion.post(post.host + post.path, post.payload).then((res:any) => {
      console.log(res)
      var total = res.reduce((n:any, item:any) => item.numeroSesiones + n,0)

      const ctx = document.getElementById('myChart2') as HTMLCanvasElement;
      new Chart(ctx,{
        type: 'bar',
        data: {
          labels: ["S e s i o n e s"],    //ETIQUETAS del eje x
          datasets:[{                      
            label: "Total de sesiones abiertas",  // TITULO, etiqueta del conjunto de datos
            data: [total],            // Datos del conjunto de datos
            backgroundColor: 'rgba(165, 42, 42, 0.8)',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: '#c6c5c5', // color del texto
                font: {
                  size: 14,
                  style: 'italic',
                  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
                }
              }
            },
            title: {
              display: true,
              text: 'S e s i o n e s   A b i e r t a s',
              color: '#c6c5c5',
              font: {
                size: 18,
                weight: '600',
                family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
              }
            }
          },
          scales: {
            y: {
              ticks: {
                color: '#c6c5c5', // color del texto
                font: {
                  weight: 'normal',
                  size: 12,
                  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
                }
              }
            },
            x: {
              ticks: {
                color: '#c6c5c5', // color del texto
                font: {
                  weight: 'normal',
                  size: 12,
                  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
                }
              }
            }
          }
        }
      });
    }) 
  }


}
