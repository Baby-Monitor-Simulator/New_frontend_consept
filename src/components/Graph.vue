<template>
  <div class="container">
    <div class="hgraph" id = "hartrateGraph"></div>
    <div class="mgraph" id = "maternalGraph"></div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue"
import {GraphData, graphprops} from "@/scripts/graphUtils"
import {buildData} from "@/scripts/StubDataGenerator"
import * as Plotly from 'plotly.js-dist'

let ChartData = ref([]);
let totalDatapoints = ref(1);
let update:boolean = false;
let graphTimeStepWidth = ref(4800);
let starttime = 0;
let endtime = 0;

onMounted (()=>{
    setInterval(draw, 1000);
})

function draw(){
    let graphData = buildData(totalDatapoints.value)

    update = UpdateChartData(graphData)
    if(update){
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
            ChartData.value.push(data)
            let releventChartData = [];

            //removing old data from graph
            for(let i = 0; i < ChartData.value.length; i++){
                //check if included data is withing graph width
                if (ChartData.value[i].total_timesteps > (totalDatapoints.value-graphTimeStepWidth.value)){
                    releventChartData.push(ChartData.value[i]);
                }
            }
            ChartData.value = releventChartData;
            ChartData.value.sort((a:GraphData,b:GraphData)=> b.total_timesteps - a.total_timesteps)
            update = true
            return true
        }
        else if (ChartData.value.length <= 0 && data) {
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
        let firstPointInGraph = totalDatapoints.value - graphTimeStepWidth.value
        let fetusydata=[]
        let maternalydata=[]
        for (let i = 0; i < ChartData.value.length; i++){
            let dataSection = ChartData.value[i]
            let startpoint = 0;

            //checking if all points in sections are needed
            let sectionStart = dataSection.total_timesteps-dataSection.timesteps
            if (sectionStart < firstPointInGraph) {
                let releventPointCount = dataSection.total_timesteps - firstPointInGraph
                startpoint = dataSection.timesteps - releventPointCount - 1
            }

            //adding data to maternalydata
            let mslice = dataSection.maternal_data.toco.slice(startpoint)
            maternalydata = maternalydata.concat(mslice)

            //adding data and posibble new babys to fetusydata
            for (let j = 0; j < dataSection.fetus_data.length; j++){
                if(!fetusydata[j]){
                    fetusydata[j] = []
                }
                let slice = dataSection.fetus_data[j].slice(startpoint)
                fetusydata[j] = fetusydata[j].concat(slice)
            }
        }
        //setting y values
        let xdata: number[] = []
        for (let i = firstPointInGraph; i <= totalDatapoints.value; i++){
            xdata.push(i)
        }
        xdata.sort((a:number,b:number)=> b - a)

        //constructing {Xarr,Yarr} pairs
        let fetusLines = []
        for(let i = 0; i < fetusydata.length; i++){
            fetusLines.push({x: xdata,y: fetusydata[i]})
        }
        let maternalLines = [{x: xdata,y:maternalydata}]

        let hGraph = document.getElementById('hartrateGraph');
	    Plotly.newPlot( hGraph,
            fetusLines,
            graphprops(30,6,210,50,firstPointInGraph,totalDatapoints.value)
        )

        let mGraph = document.getElementById('maternalGraph');
	    Plotly.newPlot( mGraph,
            maternalLines,
            graphprops(20,4,100,0,firstPointInGraph,totalDatapoints.value)
        )
    }
}
</script>

<style scoped>
.hgraph{
    height: 60vh;
}
.mgraph{
    height: 40vh;
}
</style>
