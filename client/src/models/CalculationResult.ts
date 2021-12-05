/* eslint-disable camelcase */

type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};

export interface result {
  SHS: {
    optimalSolution: {
      SEV: number;
      N: number[];
      T: number[];
      Y: number[];
      HarvestingProfit: number[];
    };
    standSimulation: {
      T: number[];
      N_dash: number[];
      H: number[];
      N: number[];
      V: number[];
      D: number[];
      ValueOfStandingTrees: number[];
    };
  };
}

export type CalculationResultType = NestedPartial<result>;
