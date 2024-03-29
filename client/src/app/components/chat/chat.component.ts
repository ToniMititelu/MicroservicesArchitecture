import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.interface';
import { ChatService, Message, Room } from '../../services/chat.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  me: User;

  users: User[];

  currentRoom: Room;

  rooms: Observable<Room[]>;

  message: string;

  lastMessage: Message;

  loading = false;

  private sub: Subscription;

  @ViewChildren('messages') messagesContainer: QueryList<ElementRef>;

  constructor(readonly authService: AuthService,
              readonly chatService: ChatService,
              readonly socket: Socket) {
  }

  ngOnInit(): void {
    this.loading = true;
    forkJoin([this.authService.getUserData(), this.authService.getUsers()])
      .subscribe(([me, users]) => {
        this.me = me;
        this.users = users;
        console.log(this.me);
        this.chatService.getRoomsForUser(this.me.id || this.me._id);
        this.rooms = this.chatService.rooms;
        this.loading = false;
      });
  }

  getRoom(id: string): void {
    this.chatService.getRoom(id);
    this.chatService.currentRoom.subscribe(room => {
      this.currentRoom = room;
      this.scrollToBottom();
    });
    this.socket.on('message-broadcast', message => {
      if (message) {
        this.currentRoom.messages.push(message);
        this.scrollToBottom();
      }
    });
  }

  getUserName(userId: string): string {
    let userName = '';
    this.users.forEach(user => {
      if (user._id === userId) {
        userName = user.userName;
        return;
      }
    });
    return userName;
  }

  getContentForList(message: Message): string {
    const userName = this.getUserName(message.sender);
    const content = message.content;
    return `${userName}: ${content}`;
  }

  spliceDate(date: any): string {
    return date.substring(0, 10);
  }

  getReceiver(room: Room): string {
    return room.user_1 === (this.me.id || this.me._id) ? room.user_2 : room.user_1;
  }

  sendMessage(receiverId: string): void {
    const newMessage: Message = {
      seen: false,
      content: this.message,
      sender: (this.me.id || this.me._id),
      receiver: receiverId,
    };

    this.chatService.sendMessage(newMessage);

    this.currentRoom.messages.push(newMessage);

    this.message = '';
  }

  scrollToBottom(): void {
    this.messagesContainer.forEach(container => {
      try {
        container.nativeElement.scrollTop = container.nativeElement.scrollHeight;
      } catch (e) {
        console.error(e);
      }
    });
  }
}
