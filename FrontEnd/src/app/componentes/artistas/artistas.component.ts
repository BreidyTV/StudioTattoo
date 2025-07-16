import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-artistas',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './artistas.component.html',
  styleUrl: './artistas.component.css'
})
export class ArtistasComponent {

}
