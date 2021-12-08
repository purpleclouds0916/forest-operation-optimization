/* eslint-disable camelcase */

type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};

export interface result {
  SH_S: {
    Optimal_solution: {
      SEV: number;
      N: number[];
      T: number[];
      Y: number[];
      Harvesting_profit_no_discount: number[];
      Message: string;
    };
    Stand_simulation: {
      T: number[];
      N_dash: number[];
      H: number[];
      N: number[];
      V: number[];
      D: number[];
      Value_of_standing_trees_no_discount: number[];
    };
  };
}

export type CalculationResultType = NestedPartial<result>;
