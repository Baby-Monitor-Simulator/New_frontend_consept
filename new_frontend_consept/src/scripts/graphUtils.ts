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