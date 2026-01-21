import { GraphData, MaternalData } from "./graphUtils";

export function buildData(total_timesteps: number): GraphData {
  //setting up needed arrays
  const timeSteps = 4;
  total_timesteps += timeSteps;
  let motherOx_data = [];
  let motherToco_data = [];
  const fetus_data = [[]];

  //generating fake data
  for (let i = 0; i < timeSteps; i++) {
    const fetusHartRate = Math.random() * 10 + 140;
    const motherOx = Math.random() * 10 + 90;
    const motherToco = Math.random() * 10 + 10;

    fetus_data[0] = fetus_data[0].concat(fetusHartRate);
    motherOx_data = motherOx_data.concat(motherOx);
    motherToco_data = motherToco_data.concat(motherToco);
  }

  //submitting data to graphData
  const maternal_data = new MaternalData(motherToco_data, motherOx_data);
  const graphData = new GraphData(
    total_timesteps,
    timeSteps,
    1,
    maternal_data,
    fetus_data,
  );

  return graphData;
}
