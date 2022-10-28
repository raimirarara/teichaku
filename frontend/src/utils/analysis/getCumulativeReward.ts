import { BarDatum } from "@nivo/bar";

export const getCumulativeReward = (rewardHistory: BarDatum[]) => {
  let total = 0;
  let data = [];
  for (const d of rewardHistory) {
    total += Number(d.reward);
    const newData = { x: d.date, y: total };
    data.push(newData);
  }

  const result = [
    {
      id: "reward",
      data: data,
    },
  ];

  console.log(result);

  return result;
};