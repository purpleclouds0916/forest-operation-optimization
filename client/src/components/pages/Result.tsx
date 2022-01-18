/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VFC } from 'react';
import { useSelector } from 'react-redux';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { RootState } from '../../redux/store';

import ResultLineChart from '../organism/ResultLineChart';
import arrow from '../../img/arrow.jpeg';

import './Result.css';

const Result: VFC = () => {
  const calculationResult = useSelector((state: RootState) => state);

  const ageforest = calculationResult.SH_S.Stand_simulation.T;
  const treeHeight = calculationResult.SH_S.Stand_simulation.H;
  const standDensity = calculationResult.SH_S.Stand_simulation.N;
  const ForestStandTimberArea = calculationResult.SH_S.Stand_simulation.V;
  const DBH = calculationResult.SH_S.Stand_simulation.D;
  const cutAllMony =
    calculationResult.SH_S.Stand_simulation.Value_of_standing_trees_no_discount;

  return (
    <>
      <div className="result-wrapper">
        <div className="card">
          <div className="result-title">提案された施業方法</div>
          <div className="result-list-cards">
            <div className="card result-items">
              <ul className="result-item">
                <li>初期植栽密度</li>
                <li>{calculationResult.SH_S.Optimal_solution.N[0]}本/ha</li>
              </ul>
              <IconContext.Provider
                value={{ color: 'steelblue', className: 'arrow-down' }}
              >
                <>
                  <BsFillArrowDownCircleFill />
                </>
              </IconContext.Provider>
            </div>
            {calculationResult.SH_S.Optimal_solution.T.map((item, i) => (
              <div className="card result-items " key={i}>
                <ul className="result-item">
                  {calculationResult.SH_S.Optimal_solution.T.length - 1 !==
                  i ? (
                    <li>{i + 1}回目の間伐のタイミング</li>
                  ) : (
                    <li>皆伐のタイミング</li>
                  )}

                  <li>{calculationResult.SH_S.Optimal_solution.T[i]}年</li>
                </ul>
                {calculationResult.SH_S.Optimal_solution.T.length - 1 !== i && (
                  <>
                    <ul className="result-item">
                      <li>間伐後の植林密度</li>
                      <li>
                        {calculationResult.SH_S.Optimal_solution.N[i + 1]}本/ha
                      </li>
                    </ul>
                  </>
                )}
                <ul className="result-item">
                  <li>収穫材積</li>
                  <li>
                    {calculationResult.SH_S.Optimal_solution.Y[i]}m
                    <span className="Exponentiation">3</span>
                  </li>
                </ul>
                <ul className="result-item">
                  <li>収益</li>
                  <li>
                    {
                      calculationResult.SH_S.Optimal_solution
                        .Harvesting_profit_no_discount[i]
                    }
                    円
                  </li>
                </ul>
                {calculationResult.SH_S.Optimal_solution.T.length - 1 !== i && (
                  <IconContext.Provider
                    value={{ color: 'steelblue', className: 'arrow-down' }}
                  >
                    <>
                      <BsFillArrowDownCircleFill />
                    </>
                  </IconContext.Provider>
                )}
              </div>
            ))}
          </div>
          <div className="result-sev-wrapper">
            <ul className="result-sev">
              <li>この施業の土地希望価(SEV)<span className="hidden-sp">：</span></li>
              <li>{calculationResult.SH_S.Optimal_solution.SEV}円</li>
            </ul>
          </div>

          
        </div>
        <div className="chart-wrapper">
            <div className="card">
              <div className="result-title">
                施業方法の詳細
              </div>
              <div className="">
                <div className="chart-items">
                  <ResultLineChart
                    title="樹高の推移"
                    arrayX={ageforest}
                    arrayY={treeHeight}
                    DigitsOfYaxis={10}
                    yaxisTitle="樹高"
                    yaxisUnit="m"
                    tooltipWidth={90}
                  />
                  <ResultLineChart
                    title="立木密度の推移"
                    arrayX={ageforest}
                    arrayY={standDensity}
                    DigitsOfYaxis={1000}
                    yaxisTitle="立木密度"
                    yaxisUnit="本/ha"
                    tooltipWidth={150}
                  />
                  <ResultLineChart
                    title="林分材積の推移"
                    arrayX={ageforest}
                    arrayY={ForestStandTimberArea}
                    DigitsOfYaxis={100}
                    yaxisTitle="材積"
                    yaxisUnit="㎥"
                    tooltipWidth={90}
                  />
                  <ResultLineChart
                    title="平均胸高直径の推移"
                    arrayX={ageforest}
                    arrayY={DBH}
                    DigitsOfYaxis={10}
                    yaxisTitle="胸高直径"
                    yaxisUnit="cm"
                    tooltipWidth={110}
                  />
                  <ResultLineChart
                    title="林分の価値"
                    arrayX={ageforest}
                    arrayY={cutAllMony}
                    DigitsOfYaxis={1000000}
                    yaxisTitle="金額"
                    yaxisUnit="万円"
                    tooltipWidth={100}
                    givenInUnits={10000}
                  />
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Result;
