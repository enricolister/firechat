import { ChatService } from './../../providers/chat.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {

  mensaje: string = "";

  constructor(public _cs: ChatService) {
    this._cs.cargarMensajes()
    .subscribe();
  }

  enviarMensaje() {
    console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }

    this._cs.agregarMensaje(this.mensaje)
      .then( () => {
        console.log('Mensaje enviado');
        this.mensaje = "";
      })
      .catch( (err) => console.error('Error al enviar el mensaje ', err));
  }

}
