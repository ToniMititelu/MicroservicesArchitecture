import { Injectable } from '@angular/core';
import { DocumentClass } from '../models/document.model';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = 'http://localhost:8080/api/chat';

  currentDocument = this.socket.fromEvent<DocumentClass>('document');
  documents = this.socket.fromEvent<string[]>('documents');

  constructor(private socket: Socket,
              private http: HttpClient) {
  }

  createChatRoom(body: any): Observable<any> {
    const url = `${this.baseUrl}/rooms/`;
    return this.http.post(url, body);
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
