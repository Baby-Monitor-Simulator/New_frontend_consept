import { defineStore } from 'pinia'
import type MatlabFile from "../interfaces/IExpectedFileContent"
import earlyDecelsMAP from "../templates/exports/json/early/earlyDecelsMAP.json"
import earlyDecelsFHR from "../templates/exports/json/early/earlyDecelsFetalHeartRate.json"
import earlyDecelsO2 from "../templates/exports/json/early/earlyDecelsO2.json"
import earlyDecelsUT from "../templates/exports/json/early/earlyDecelsUterineContraction.json"

import lateDecelsMAP from "../templates/exports/json/late/lateDecelsMAP.json"
import lateDecelsFHR from "../templates/exports/json/late/lateDecelsFetalHeartRate.json"
import lateDecelsO2 from "../templates/exports/json/late/lateDecelsO2.json"
import lateDecelsUT from "../templates/exports/json/late/lateDecelsUterineContraction.json"

import normalDecelsMAP from "../templates/exports/json/normal/normalDecelsMAP.json"
import normalDecelsFHR from "../templates/exports/json/normal/normalDecelsFetalHeartRate.json"
import normalDecelsO2 from "../templates/exports/json/normal/normalDecelsO2.json"
import normalDecelsUT from "../templates/exports/json/normal/normalDecelsUterineContraction.json"

export const useImportStore = defineStore('import', {

  state: () => {
    return {
      graphData: [] as MatlabFile[],
      fetalHeartRate: [] as MatlabFile[],
      fetalBloodPressure: [] as MatlabFile[],
      uterineContractions: [] as any, // type inferring messing up with large JSON no idea why
      fetalBlood: [] as MatlabFile[],
    }
  },
  actions: {
    clearAll() {
      this.graphData = []
      this.fetalHeartRate = []
      this.fetalBloodPressure = []
      this.uterineContractions = []
      this.fetalBlood = []
    },
    fillGraph(scenario: any) {
      switch (scenario.value) {
        case "Early Decels":
          this.fetalBloodPressure = earlyDecelsMAP
          this.fetalHeartRate = earlyDecelsFHR
          this.uterineContractions = earlyDecelsUT
          this.fetalBlood = earlyDecelsO2
          break
        case "Late Decels":
          this.fetalBloodPressure = lateDecelsMAP
          this.fetalHeartRate = lateDecelsFHR
          this.uterineContractions = lateDecelsUT
          this.fetalBlood = lateDecelsO2
          break
        case "Normal Decels":
          this.fetalBloodPressure = normalDecelsMAP
          this.fetalHeartRate = normalDecelsFHR
          this.uterineContractions = normalDecelsUT
          this.fetalBlood = normalDecelsO2
          break
          
      } 
    },
  }
})
