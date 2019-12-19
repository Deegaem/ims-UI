import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class WebsocketService {
    private socket: WebSocket;
    private listener: EventEmitter<any> = new EventEmitter();

    public connect() {
        const path = `ws://192.168.1.106:8084/ims-chat/chat`;
        this.socket = new WebSocket(path);

        this.socket.onmessage = event => {
            this.listener.emit({ "type": "message", "data": JSON.parse(event.data) });
        }
    }

    public send(data: string) {
        this.socket.send(data);
    }

    public close() {
        this.socket.close();
    }

    public getEventListener() {
        return this.listener;
    }
}