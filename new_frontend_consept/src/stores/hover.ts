import { defineStore } from 'pinia'

export const useHoverStore = defineStore('hover', {
  state: () => {
    return {
      hoverLanguage: false as Boolean,
      hoverExport: false as Boolean,
      import: false as Boolean,
      hoverScenario: false as Boolean,
      hoverInputs: false as Boolean,
      hoverSubmit: false as Boolean,
      hoverClearInputs: false as Boolean,
      hoverClearGraphs: false as Boolean,
      hoverGraphs: false as Boolean,
    }
  },
})