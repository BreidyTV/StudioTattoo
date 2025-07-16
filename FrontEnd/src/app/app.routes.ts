import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { ArtistasComponent } from './componentes/artistas/artistas.component';
import { ContactanosComponent } from './componentes/contactanos/contactanos.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { PreguntasComponent } from './componentes/preguntas/preguntas.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RecuperarPassComponent } from './componentes/recuperar-pass/recuperar-pass.component';


export const routes: Routes = [
    {path:"",component:HomeComponent, pathMatch:"full"},
    {path:"artistas",component:ArtistasComponent, pathMatch:"full"},
    {path:"contactanos",component:ContactanosComponent, pathMatch:"full"},
    {path:"productos",component:ProductosComponent, pathMatch:"full"},
    {path:"preguntas",component:PreguntasComponent, pathMatch:"full"},
    {path:"login",component:LoginComponent, pathMatch:"full"},
    {path:"registro",component:RegistroComponent, pathMatch:"full"},
    {path:"recuperarPass",component:RecuperarPassComponent, pathMatch:"full"},
];
