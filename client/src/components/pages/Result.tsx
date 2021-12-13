/* eslint-disable @typescript-eslint/no-unused-vars */
import { VFC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
// import './Result.css';
// import './Form.css';
import ResultLineChart from '../organism/ResultLineChart';

const Result: VFC = () => {
  const calculationResult = useSelector((state: RootState) => state);

  

  const ageforest = calculationResult.SH_S.Stand_simulation.T;
  const treeHeight = calculationResult.SH_S.Stand_simulation.H;
  const standDensity = calculationResult.SH_S.Stand_simulation.N;
  const ForestStandTimberArea = calculationResult.SH_S.Stand_simulation.V;
  const DBH = calculationResult.SH_S.Stand_simulation.D;
  const cutAllMony =
    calculationResult.SH_S.Stand_simulation.Value_of_standing_trees_no_discount;

    console.log("treeHeight", treeHeight)
    console.log("standDensity", standDensity)
    console.log("ForestStandTimberArea", ForestStandTimberArea)
    console.log("DBH", DBH)
    console.log("cutAllMony", cutAllMony)

  return (
    <div>
      <div className="chart-wrapper">
        <div className="chart-items" >
        <ResultLineChart title="樹高の推移" arrayX={ageforest} arrayY={treeHeight} DigitsOfYaxis={10} yaxisTitle="樹高" yaxisUnit="m" />
        <ResultLineChart title="立木密度" arrayX={ageforest} arrayY={standDensity} DigitsOfYaxis={1000} yaxisTitle="立木密度" yaxisUnit="本/ha" /> 
        <ResultLineChart
          title="林分材積"
          arrayX={ageforest}
          arrayY={ForestStandTimberArea}
          DigitsOfYaxis={100}
        yaxisTitle="材積" yaxisUnit="㎥" />
        <ResultLineChart title="平均胸高直径" arrayX={ageforest} arrayY={DBH} DigitsOfYaxis={10} yaxisTitle="胸高直径" yaxisUnit="m" />
        <ResultLineChart
          title="全部伐採するといくらになるか"
          arrayX={ageforest}
          arrayY={cutAllMony}
          DigitsOfYaxis={1000000}
        yaxisTitle="金額" yaxisUnit="円" />
        </div>
      </div>
    </div>
  );
};

export default Result;
