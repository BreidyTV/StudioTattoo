import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperar-pass',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './recuperar-pass.component.html',
  styleUrl: './recuperar-pass.component.css'
})
export class RecuperarPassComponent {

}
