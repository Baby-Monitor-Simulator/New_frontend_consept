import { ref, onUnmounted } from 'vue';

export function useWebSocket(url) {
  const ws = ref(null);
  const status = ref('Disconnected');
  const messages = ref([]);

  const connect = () => {
    ws.value = new WebSocket(url);
    
    ws.value.onopen = () => {
      status.value = 'Connected';
    };
    
    ws.value.onmessage = (event) => {
      messages.value.push(event.data);
    };
    
    ws.value.onerror = () => {
      status.value = 'Error';
    };
    
    ws.value.onclose = () => {
      status.value = 'Disconnected';
    };
  };

  const disconnect = () => {
    if (ws.value) {
      ws.value.close();
    }
  };

  const send = (message) => {
    if (ws.value && ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(message);
    }
  };

  onUnmounted(() => {
    disconnect();
  });

  return {
    status,
    messages,
    connect,
    disconnect,
    send
  };
}