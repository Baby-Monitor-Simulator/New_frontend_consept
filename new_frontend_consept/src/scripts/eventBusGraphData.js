import { reactive } from 'vue';

const eventBusGraphData = reactive({
  events: {}, // Object to store events and their listeners

  emit(event, data) {
    // Check if the data is an array or contains starting property
    if (Array.isArray(data)) {
      console.log('EventBus: Received array data');
    } else if (data && data[0] && data[0].message) {
      console.log('EventBus: Received message:', data[0].message);
    } else if (data && data.starting === true) {
      console.log('EventBus: Received start command');
    }

    // Emit to all listeners regardless of data type
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  },
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; // Initialize the array if it doesn't exist
    }
    this.events[event].push(callback); // Add the callback to the array
  },

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
});

export default eventBusGraphData;