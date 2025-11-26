import { ref, onUnmounted } from 'vue';
import { GraphData, MaternalData } from './graphUtils';
import { s } from 'vite/dist/node/chunks/moduleRunnerTransport';

export class useWebSocket {
  url: string = '';
  ws = ref(null);
  status = ref('Disconnected');
  messages = ref([]);

  constructor(url:string) {
    this.url = url;
  }

  connect(): void {
    this.ws.value = new WebSocket(this.url);
    
    this.ws.value.onopen = () => {
      this.status.value = 'Connected';
    };
    
    this.ws.value.onmessage = (event) => {
      this.restructureMessage(event.data);
    };
    
    this.ws.value.onerror = () => {
      this.status.value = 'Error';
    };
    
    this.ws.value.onclose = () => {
      this.status.value = 'Disconnected';
    };
  };

  restructureMessage(data): void {
    try {
      
      
      let data_json = JSON.parse(data);
      
      console.warn('Received data:', data_json);

      switch (data_json.type) {
        case 'simulation.update':
          let maternalData = new MaternalData(
            data_json.payload.maternal_data.toco,
            data_json.payload.maternal_data.maternal_oxygen_saturation,
          );

          let refactored = new GraphData(
            data_json.payload.total_timesteps,
            data_json.payload.timesteps,
            data_json.payload.fetus_count,
            maternalData,
            data_json.payload.fetus_data
          );

          this.messages.value.push(refactored);
          break;
        case 'ping.pong':
          console.log('Ping pong received');
          break;
        case 'welcome':
          console.log('Welcome message received');
          break;
        default:
          data.formatted = `Unknown type: ${data.payload}`;
      }

    } catch (e) {
      console.error('Failed to parse message', e);
    }

    // this.messages.value.push(data);
  }

  getMessages(): any[] {
    let answer_messages = this.messages.value;

    //reset messages after retrieval
    this.messages.value = [];
    return answer_messages;
  };

  disconnect(): void {
    if (this.ws.value) {
      this.ws.value.close();
    }
  };

  send(message): void {
    if (this.ws.value && this.ws.value.readyState === WebSocket.OPEN) {
      this.ws.value.send(message);
    }
  };

  // onUnmounted(() => {
  //   disconnect();
  // });

  // return {
  //   this.status,
  //   messages,
  //   connect,
  //   disconnect,
  //   send
  // };
}