import { ChatService } from './providers/chat.service';
import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public _cs: ChatService) {
    
  }

}
