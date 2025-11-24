<script setup>
import { ref, computed } from 'vue';
import { useWebSocket } from '@/composables/useWebSocket';

// const { status, messages, connect, disconnect, send } = useWebSocket('wss://echo.websocket.org/');
const { status, messages, connect, disconnect, send } = useWebSocket('ws://localhost:8080/testwebsocket/ws');
const message = ref('');

const isConnected = computed(() => status.value === 'Connected');

const sendMessage = () => {
  if (message.value) {
    send(message.value);
    message.value = '';
  }
};
</script>

<template>
  <div class="container">
    <h1>WebSocket Test</h1>
    <p class="status">Status: <strong>{{ status }}</strong></p>
    
    <div class="controls">
      <button @click="connect" :disabled="isConnected">Connect</button>
      <button @click="disconnect" :disabled="!isConnected">Disconnect</button>
    </div>
    
    <div class="message-input">
      <input 
        v-model="message" 
        @keyup.enter="sendMessage" 
        placeholder="Type a message"
        :disabled="!isConnected"
      >
      <button @click="sendMessage" :disabled="!isConnected">Send</button>
    </div>
    
    <div class="messages">
      <h3>Messages:</h3>
      <ul v-if="messages.length > 0">
        <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
      </ul>
      <p v-else class="no-messages">No messages yet. Connect and send a message!</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.status {
  font-size: 18px;
  margin-bottom: 20px;
}

.status strong {
  color: #42b983;
}

.controls {
  margin-bottom: 20px;
}

.controls button {
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
}

.controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.message-input {
  display: flex;
  margin-bottom: 20px;
}

.message-input input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.message-input input:disabled {
  background-color: #f5f5f5;
}

.message-input button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
}

.message-input button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.messages {
  margin-top: 30px;
}

.messages h3 {
  margin-bottom: 10px;
}

.messages ul {
  list-style: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.messages li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.messages li:last-child {
  border-bottom: none;
}

.no-messages {
  color: #999;
  font-style: italic;
}
</style>