import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {DocumentClass} from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  currentDocument = this.socket.fromEvent<DocumentClass>('document');
  documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket) {
  }

  getDocument(id: string): void {
    this.socket.emit('getDoc', id);
  }

  newDocument(): void {
    this.socket.emit('addDoc', {id: this.docId(), doc: ''});
  }

  editDocument(document: DocumentClass): void {
    this.socket.emit('editDoc', document);
  }

  docId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
