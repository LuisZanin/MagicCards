import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { EventEmitter } from 'events';

class RabbitMQService extends EventEmitter {
  private stompClient: Stomp.Client | null = null;

  connect() {
    const socket = new SockJS('http://localhost:15674/stomp');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect('guest', 'guest', () => {
      this.stompClient?.subscribe('/exchange/messages_queue/deck_created', (message) => {
        const deck = JSON.parse(message.body);
        this.emit('deck_created', deck);
      });
    });
  }

  disconnect() {
    this.stompClient?.disconnect(() => {
      console.log('Disconnected from RabbitMQ');
    });
  }
}

export default new RabbitMQService();