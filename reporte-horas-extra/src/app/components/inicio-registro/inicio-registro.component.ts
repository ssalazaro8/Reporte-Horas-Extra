import { Component } from '@angular/core';
import { NavbarRegistrosComponent } from "../navbar-registros/navbar-registros.component";

@Component({
  selector: 'app-inicio-registro',
  standalone: true,
  imports: [NavbarRegistrosComponent],
  templateUrl: './inicio-registro.component.html',
  styleUrl: './inicio-registro.component.css'
})
export class InicioRegistroComponent {

}
