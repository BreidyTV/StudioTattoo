import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { ArtistasComponent } from './componentes/artistas/artistas.component';
import { ContactanosComponent } from './componentes/contactanos/contactanos.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { PreguntasComponent } from './componentes/preguntas/preguntas.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RecuperarPassComponent } from './componentes/recuperar-pass/recuperar-pass.component';
import { ActivarComponent } from './componentes/activar/activar.component';
import { SolicitudRecuperarPassComponent } from './componentes/solicitud-recuperar-pass/solicitud-recuperar-pass.component';
import { MenuComponent } from './componentes/usuarios/menu/menu.component';
import { MisComprasComponent } from './componentes/usuarios/mis-compras/mis-compras.component';
import { MisOpinionesComponent } from './componentes/usuarios/mis-opiniones/mis-opiniones.component';
import { CuponesComponent } from './componentes/usuarios/cupones/cupones.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios/usuarios.component';
import { ProductStoreComponent } from './componentes/usuarios/product-store/product-store.component';
import { MiPerfilComponent } from './componentes/usuarios/mi-perfil/mi-perfil.component';
import { DashBoardComponent } from './componentes/usuarios/dash-board/dash-board.component';
import { DetalleProductoComponent } from './componentes/detalle-producto/detalle-producto.component';



export const routes: Routes = [
    {path:"",component:HomeComponent, pathMatch:"full"},
    {path:"artistas",component:ArtistasComponent, pathMatch:"full"},
    {path:"contactanos",component:ContactanosComponent, pathMatch:"full"},
    {path:"productos",component:ProductosComponent, pathMatch:"full"},
    {path:"preguntas",component:PreguntasComponent, pathMatch:"full"},
    {path:"login",component:LoginComponent, pathMatch:"full"},
    {path:"registro",component:RegistroComponent, pathMatch:"full"},
    {path:"recuperarPass",component:RecuperarPassComponent, pathMatch:"full"},
    {path:"activar/:email/:codigo",component:ActivarComponent, pathMatch:"full"},
    {path:"solicitudRecuperarPass",component:SolicitudRecuperarPassComponent, pathMatch:"full"},
    {path:"menu",component:MenuComponent, pathMatch:"full"},
    {path:"misCompras",component:MisComprasComponent, pathMatch:"full"},
    {path:"misOpiniones",component:MisOpinionesComponent, pathMatch:"full"},
    {path:"cupones",component:CuponesComponent, pathMatch:"full"},
    {path:"usuarios",component:UsuariosComponent, pathMatch:"full"},
    {path:"productStore",component:ProductStoreComponent, pathMatch:"full"},
    {path:"miPerfil",component:MiPerfilComponent, pathMatch:"full"},
    {path:"dashBoard",component:DashBoardComponent, pathMatch:"full"},
    {path:"detalleProducto/:nombre/:_id",component:DetalleProductoComponent, pathMatch:"full"},
];
