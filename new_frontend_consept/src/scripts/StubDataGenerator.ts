import {GraphData,MaternalData} from "./graphUtils";

export function buildData (total_timesteps:number):GraphData {
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
  let graphData = new GraphData(total_timesteps,timeSteps,1,maternal_data,fetus_data)
  
  console.log('something')

  return graphData
}