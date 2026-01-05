import { ref, onUnmounted } from "vue";
import { GraphData, MaternalData } from "./graphUtils";
import { s } from "vite/dist/node/chunks/moduleRunnerTransport";
import { FullReloadPayload } from "vite";

export class useWebSocket {
  url: string = "";
  ws = ref(null);
  status = ref("Disconnected");
  messages = ref<GraphData[]>([]);

  constructor(url: string) {
    this.url = url;
  }

  connect(): void {
    this.ws.value = new WebSocket(this.url);

    this.ws.value.onopen = () => {
      this.status.value = "Connected";
    };

    this.ws.value.onmessage = (event) => {
      this.restructureMessage(event.data);
    };

    this.ws.value.onerror = () => {
      this.status.value = "Error";
    };

    this.ws.value.onclose = () => {
      this.status.value = "Disconnected";
    };
  }

  restructureMessage(data): void {
    try {
      let data_json = JSON.parse(data);

      switch (data_json.type) {
        case "simulation.update":
          let maternalData = new MaternalData(
            data_json.payload.maternal_data.toco,
            data_json.payload.maternal_data.maternal_oxygen_saturation,
          );

          let refactored = new GraphData(
            data_json.payload.total_timesteps,
            data_json.payload.timesteps,
            data_json.payload.fetus_count,
            maternalData,
            data_json.payload.fetus_data,
          );

          this.messages.value.push(refactored);
          break;
        case "ping.pong":
          console.log("Ping pong received");
          break;
        case "welcome":
          console.log("Welcome message received");
          break;
        default:
          data.formatted = `Unknown type: ${data.payload}`;
      }
    } catch (e) {
      console.error("Failed to parse message", e);
    }
  }

  getMessages(): any[] {
    let answer_messages = this.messages.value;

    //reset messages after retrieval
    this.messages.value = [];
    return answer_messages;
  }

  GetDataPoints(ammount: number): any {
    let all_Messages = this.getMessages();

    all_Messages.sort(
      (a: GraphData, b: GraphData) => b.total_timesteps - a.total_timesteps,
    );

    let total_timesteps = 0;
    let timesteps = 0;
    let fetus_count = 0;
    let toco = [];
    let maternal_oxygen_saturation = [];
    let fetus_data = [[]];

    for (let index = 0; index < all_Messages.length; index++) {
      const element = all_Messages[index];
      if (element.total_timesteps > total_timesteps) {
        total_timesteps = element.total_timesteps;
      }

      timesteps += element.timesteps;

      if (element.fetus_count != fetus_count) {
        fetus_count = element.fetus_count;
      }

      toco = toco.concat(element.maternal_data.toco);
      maternal_oxygen_saturation = maternal_oxygen_saturation.concat(
        element.maternal_data.maternal_oxygen_saturation,
      );

      for (let index = 0; index < fetus_data.length; index++) {
        fetus_data[index] = fetus_data[index].concat(element.fetus_data[index]);
      }
    }

    let total_timestep_send = total_timesteps - timesteps + ammount;

    let timesteps_send = ammount;
    let timesteps_keep = timesteps - ammount;

    let toco_send = toco.slice(0, ammount);
    let toco_keep = toco.slice(ammount);

    let maternal_oxygen_saturation_send = maternal_oxygen_saturation.slice(
      0,
      ammount,
    );
    let maternal_oxygen_saturation_keep =
      maternal_oxygen_saturation.slice(ammount);

    let fetus_data_send = [[]];
    let fetus_data_keep = [[]];
    for (let index = 0; index < fetus_data.length; index++) {
      const element = fetus_data[index];
      fetus_data_send[index] = element.slice(0, ammount);
      fetus_data_keep[index] = element.slice(ammount);
    }

    let maternal_data_send = new MaternalData(
      toco_send,
      maternal_oxygen_saturation_send,
    );
    let maternal_data_keep = new MaternalData(
      toco_keep,
      maternal_oxygen_saturation_keep,
    );

    let data_send = new GraphData(
      total_timestep_send,
      timesteps_send,
      fetus_count,
      maternal_data_send,
      fetus_data_send,
    );

    let data_keep = new GraphData(
      total_timesteps,
      timesteps_keep,
      fetus_count,
      maternal_data_keep,
      fetus_data_keep,
    );

    this.messages.value.unshift(data_keep);

    return data_send;
  }

  disconnect(): void {
    if (this.ws.value) {
      this.ws.value.close();
    }
  }

  send(message): void {
    if (this.ws.value && this.ws.value.readyState === WebSocket.OPEN) {
      this.ws.value.send(message);
    }
  }
}
