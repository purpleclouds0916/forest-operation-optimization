/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VFC } from 'react';
import { useSelector } from 'react-redux';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryBar,
} from 'victory';

import { RootState } from '../../redux/store';
import LineChart from '../organism/MoveLineChart';

const Result: VFC = () => {
  console.log('Resultがレンダリングされました');
  const calculationResult = useSelector((state: RootState) => state);
  console.log(calculationResult.SH_S);

  const data: Array<Array<number>> = [];

  if (
    // eslint-disable-next-line
    typeof calculationResult.SH_S?.Stand_simulation?.T !== 'undefined' &&
    // eslint-disable-next-line
    typeof calculationResult.SH_S?.Stand_simulation?.H !== 'undefined'
  ) {
    const forestAge = calculationResult.SH_S.Stand_simulation.T;

    const treeHeight = calculationResult.SH_S.Stand_simulation.H;

    forestAge.map((element, index) => {
      data.push([forestAge[index], treeHeight[index]]);
    });
  }

  console.log(data);

  const maxOfValueArray: number[] = data.reduce((a, b): number[] =>
    a[0] > b[0] ? a : b,
  );
  console.log(Math.ceil(maxOfValueArray[0] / 10) * 10 + 10);
  const maxOfValueX = Math.ceil(maxOfValueArray[0] / 10) * 10 ;
  const maxOfValueY = Math.ceil(maxOfValueArray[1] / 10) * 10 ;

  return (
    <>
      <LineChart
        description=""
        title=""
        xaxisTitle="林齢"
        xaxisUnit="年"
        yaxisTitle="樹高"
        yaxisUnit="ｍ"
        xaxisMax={maxOfValueX}
        yaxisMax={maxOfValueY}
        data={data}
      />
    </>
  );
};

export default Result;
