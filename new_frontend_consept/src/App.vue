<script setup lang="ts">
import { onMounted } from 'vue';
import { GraphUpdate } from '@/components/Graph.vue';
import Graph from '@/components/Graph.vue';
import { GraphData, MaternalData } from '@/scripts/graphUtils';
import {ref} from "vue"
</script>

<template>
  <v-app>
    <h1>You did it!</h1>
    <div>
      <Graph @click="GraphUpdate(graphData.value,true)"/>
    </div>
  </v-app>
</template>

<script lang="ts">
const graphData = ref();
let total_timesteps = 0;

onMounted (()=>{
  let running = true
  while (running){
    try{
      //setting up needed arrays
      let timeSteps = Math.random() * 10 + 3;
      total_timesteps += timeSteps;
      let motherOx_data = [];
      let motherToco_data = []; 
      let fetus_data = [[]];

      //generating fake data
      for(let i = 0; i < timeSteps; i++){
        let fetusHartRate = Math.random() * 10 + 140;
        let motherOx = Math.random() * 10 + 90;
        let motherToco = Math.random() * 10 + 10;

        fetus_data[0] = fetus_data[0].concat(fetusHartRate)
        motherOx_data = motherOx_data.concat(motherOx)
        motherToco_data = motherToco_data.concat(motherToco)
      }

      //submitting data to graphData
      let maternal_data = new MaternalData(motherToco_data,motherOx_data)
      graphData.value = new GraphData(total_timesteps,timeSteps,1,maternal_data,fetus_data)
    }
    catch{
      console.log("data gen broke")
      running = false
    }
  }
})
</script>

<style scoped></style>
