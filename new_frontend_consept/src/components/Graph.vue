<template>
  <div class="container">
    <div class="graph" id = "hartrateGraph"></div>
  </div>

</template>

<script lang="ts">
import {ref} from "vue"
import {GraphData} from "@/scripts/graphUtils"
import * as Plotly from "plotly.js";

let ChartData = ref([]);
let totalDatapoints = ref(1);
let update:boolean = false;
let graphTimeStepWidth = ref(1);

export function GraphUpdate(graphData:GraphData, updateGraph?:boolean){
    update = UpdateChartData(graphData)
    if(update && updateGraph){
        UpdateGraph()
    }
}

function UpdateChartData (data:GraphData) : boolean {
    try{
        //updating total datapoints to newest data
        if (data.total_timesteps > totalDatapoints.value){
            totalDatapoints.value = data.total_timesteps;
        }
        
        //add incoming data to sorted list
        if(ChartData.value.length > 0){
            ChartData.value = ChartData.value.concat(data)
            let releventChartData = [];

            //removing data old data from graph
            for(let i = 0; i < ChartData.value.length; i++){
                //check if included data is withing graph width
                if (ChartData.value[i].total_timesteps > (totalDatapoints.value-graphTimeStepWidth.value)){
                    releventChartData = releventChartData.concat(ChartData[i]);
                }
            }
            ChartData.value = releventChartData;
            ChartData.value.sort((a:GraphData,b:GraphData)=> b.total_timesteps - a.total_timesteps)
            update = true
            return true
        }
        else if (data) {
            ChartData.value = [data]
            update = true
            return true
        }
        else{
            update = false
            return false
        }
    }
    catch{
        console.log("couldn't update graph Data")
        update = false
        return false
    }
}

function UpdateGraph() {
    if(update){
        //extracting datapoints within width
        let xdata=[]
        for (let i = 0; i < ChartData.value.length; i++){
            let dataSection = ChartData.value[i]
            let startpoint = 0;
            //checking if all points in sections are needed
            if (dataSection.timestep_start_ms < (totalDatapoints.value - graphTimeStepWidth.value)) {
                let releventPointCount = dataSection.timestep_start_ms - (totalDatapoints.value - graphTimeStepWidth.value)
                startpoint = dataSection.timesteps - releventPointCount - 1
            }

            //adding data and posibble new babys to xdata
            for (let j = 0; j < dataSection.fetus_data.length; j++){
                let slice = dataSection.fetus_data[j].slice(startpoint)
                xdata[j] = xdata[j].concat(slice)
            }
        }

        //setting y values
        let ydata = []
        for (let i = totalDatapoints.value - graphTimeStepWidth.value; i <= totalDatapoints.value; i++){
            ydata = ydata.concat(i)
        }

        //constructing {Xarr,Yarr} pairs
        let lines = []
        for(let i = 0; i < xdata.length; i++){
            lines = lines.concat({x: xdata,y: ydata})
        }

        let hGraph = document.getElementById('hartrategraph');
	    Plotly.newPlot( hGraph,
            lines,
	        {margin: { t: 0 }});
    }
}
</script>

<style scoped>
.container {
  height: 40%;
  padding: 1%;
}
.graph {
    height: 100%;
}
</style>
