import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor( private afs: AngularFirestore,
               public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(user => {
        console.log('Estado del usuario ', user);
        if (!user) {
          return;
        }
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
      })
    }

  login(proveedor: string) {
    if (proveedor === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
    
  }
  logout(proveedor: string) {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    // el segundo parametro de esta funcion va a ser el query a firebase (ref)
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                            .limit(10));
    return this.itemsCollection.valueChanges()
    .pipe(map(mensajes => { 
      console.log(mensajes);
      this.chats = [];
      for (let mensaje of mensajes) {
        this.chats.unshift(mensaje); //unshift en vez de push me pone los mensajes siempre en la 1a posicion del arreglo
      }
    }))
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje);
  }
}
