import { ChatService } from './../../providers/chat.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {

  constructor(public _cs:ChatService) { }

  ingresar(proveedor: string) {
      this._cs.login(proveedor);
  }

}
