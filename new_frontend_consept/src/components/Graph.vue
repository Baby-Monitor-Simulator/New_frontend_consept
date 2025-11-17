<template>
  <div class="container">
    <Line ref="myChart" :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, type ChartData } from 'chart.js'
import { Line } from 'vue-chartjs'
import GraphType from "../enums/graphTypes"
import eventBusGraphData from "../scripts/eventBusGraphData.js";
import { useGlobalStore } from '@/stores/global';

ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)

const lineChartRef = ref(null);

const globalStore: any = useGlobalStore()

let coordinates = [];
const myChart = ref(null);
const basex = ref(0);

let ChartData = []
let totalDatapoints:number;
let updated: boolean = false;
let first: boolean = true;



const updateArray = (data:[]) => {
        totalDatapoints += data.length;
        if(ChartData[0]){
            ChartData.concat(data)
            let newData = []
            for(let i=data.length-1; i<ChartData.length; i++){
                newData = newData.concat(ChartData[i])
            }
        }
        ChartData = ChartData.concat(data)
        updated = true;
}

const props = defineProps({
    type: Number,
    yMin: Number,
    yMax: Number,
    yStepSize: Number,
    chartTitle: String,
})

const options: any = {
    animation: false,
    spanGaps: true,
    normalized: false,
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: props.chartTitle
        },
        legend: {
            display: false
        }
    },
    datasets: {
        line: {
            pointRadius: 0
        }
    },
    scales: {
        y: {
            type: 'linear',
            min: props.yMin,
            max: props.yMax,
            ticks: {
                stepSize: props.yStepSize
            },
            title: {
                display: true,
                text: props.chartTitle,
                color: '#911',
                font: {
                    family: 'Cascadia Mono',
                    size: 16,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
                padding: { top: 0, left: 0, right: 20, bottom: 0 }
            }
        },
        x: {
            type: 'linear',
            min: 0,
            max: 11,
            ticks: {
                stepSize: 1
            },
            title: {
                display: true,
                text: 'test',
                color: '#911',
                font: {
                    family: 'Cascadia Mono',
                    size: 16,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
                padding: { top: 20, left: 0, right: 0, bottom: 0 }
            }
        }
    },
    maintainAspectRatio: false,
}

const data: any = ref<ChartData<'line'>>({
    datasets: []
})

let maxXValue:number;
let waitForChange = ref(0);

onMounted(() => {
    // Interval to increment x-axis max value
    eventBusGraphData.on('arrayUpdated', updateArray);

    const xIntervalId = setInterval(() => {
        const chart = myChart.value.chart;
        if (chart.options.scales.x.max < totalDatapoints){
            maxXValue = totalDatapoints
            chart.options.scales.x.min = maxXValue-11;
            chart.options.scales.x.max = maxXValue; // Update the x-axis max value
        }
        chart.update();

       waitForChange.value += 0.1;
    },100);

    switch (props.type) {
        case GraphType.FetalHeartRate:
            const heartRateId = setInterval(() => {
                data.value = {
                    datasets: [
                        {
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            pointRadius: 0,
                            data: ChartData
                        }
                    ]
                }

                if (globalStore.haltFetch) {
                    clearInterval(heartRateId);
                    clearInterval(xIntervalId);
                }
            }, 250)
            break;
        case GraphType.FetalBloodPressure:
            const fetalBloodPressureId = setInterval(() => {
                data.value = {
                    datasets: [
                        {
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            pointRadius: 0,
                            data: ChartData,
                        }
                    ]
                }
                if (globalStore.haltFetch) {
                    clearInterval(fetalBloodPressureId);
                    clearInterval(xIntervalId);
                }
            }, 250)
            break;
        case GraphType.UterineContractions:
            const utertineContractionsId = setInterval(() => {
                data.value = {
                    datasets: [
                        {
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            pointRadius: 0,
                            data: ChartData
                        }
                    ]
                }

                if (globalStore.haltFetch) {
                    clearInterval(utertineContractionsId);
                    clearInterval(xIntervalId);
                }
            }, 250)
            break;
        case GraphType.FetalBlood:
            const fetalBloodId = setInterval(() => {
                data.value = {
                    datasets: [
                        {
                            label: 'lable',
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                            ],
                            pointRadius: 0,
                            data: ChartData,
                        }
                    ]
                }

                if (globalStore.haltFetch) {
                    clearInterval(fetalBloodId);
                    clearInterval(xIntervalId);
                }
            }, 250)
            break;
    }
})
</script>

<style scoped>
.container {
  height: 40vh;
  padding: 1%;
}
</style>
