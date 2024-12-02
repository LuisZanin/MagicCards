import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { EventEmitter } from 'events';

class RabbitMQService extends EventEmitter {
  emit(event: 'deck_created', deck: any): boolean;
  emit(event: string, ...args: any[]): boolean {
    return super.emit(event, ...args);
  }
  private stompClient: Stomp.Client | null = null;

  connect() {
    const socket = new SockJS('http://localhost:15674/stomp');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect('guest', 'guest', () => {
      this.stompClient?.subscribe('/exchange/deck_created_exchange', (message) => {
        const deck = JSON.parse(message.body);
        this.emit('deck_created', deck);
      });
    });
  }

  disconnect() {
    this.stompClient?.disconnect(() => {
      console.log('Desconectado do RabbitMQ');
    });
  }
}

export default new RabbitMQService();