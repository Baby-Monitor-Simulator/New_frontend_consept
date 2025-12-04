export class GraphData {
    total_timesteps: number
    timesteps:number
    fetus_count: number
    maternal_data: MaternalData
    fetus_data: []

    constructor(total_timesteps,timesteps,fetus_count,maternal_data,fetus_data){
        this.total_timesteps = total_timesteps
        this.timesteps = timesteps
        this.fetus_count = fetus_count
        this.maternal_data = maternal_data
        this.fetus_data = fetus_data
    }
}

export class MaternalData {
    toco: []
    maternal_oxygen_saturation: []

    constructor(toco, maternal_oxygen_saturation){
        this.toco = toco
        this.maternal_oxygen_saturation = maternal_oxygen_saturation
    }
}

export const graphprops = ((Ydtick:number, minorYdtick:number,Ymax:number,Ymin:number, Xmin:number, Xmax:number)=>{
    return {
            margin: { t: 0 }, 
            yaxis:{
                dtick: Ydtick.toString(),
                showline: true,
                range: [Ymin,Ymax],
                gridcolor: 'black',
                minor: {
                    ticks: 'inside',
                    dtick: minorYdtick.toString(),
                    tickcolor: 'light grey',
                    gridcolor: 'light grey'
                }
            },
            xaxis:{
                dtick: '360',
                showline: true,
                range: [Xmin, Xmax],
                gridcolor:'black',
                minor: {
                    ticks: 'inside',
                    dtick: '40',
                    tickcolor: 'light grey',
                    gridcolor: 'light grey'
                }
            },
            columns:1,
            xgap:0.00833,
            autosize:true,
        }
})