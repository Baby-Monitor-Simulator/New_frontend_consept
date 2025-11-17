import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      showGraph: Boolean,
      resetGraph: false,
      haltFetch: false,
    }
  },
})