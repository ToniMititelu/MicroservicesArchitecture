import { Injectable } from '@angular/core';
import { DocumentClass } from '../models/document.model';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface MessageTimeStamp {
  $date: string;
}


export interface Message {
  createdAt?: string;
  updatedAt?: string;
  seen: boolean;
  content: string;
  sender: string;
  receiver: string;
}


export interface Room {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user_1: string;
  user_2: string;
  messages: Message[];
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = 'http://localhost:8080/api/chat';

  currentRoom = this.socket.fromEvent<Room>('room');
  rooms = this.socket.fromEvent<Room[]>('rooms');
  lastMessage = this.socket.fromEvent<Message>('message-broadcast');

  constructor(private socket: Socket,
              private http: HttpClient) {
  }

  createChatRoom(body: any): Observable<any> {
    const url = `${this.baseUrl}/rooms/`;
    return this.http.post(url, body);
  }

  hasNewMessages(): Observable<any> {
    const url = `${this.baseUrl}/has-messages/`;
    return this.http.get(url);
  }

  getRoomsForUser(userId: string): void {
    this.socket.emit('getUserRooms', userId);
  }

  getRoom(id: string): void {
    this.socket.emit('getRoom', id);
  }

  sendMessage(message: Message): void {
    this.socket.emit('newMessage', message);
  }
}
