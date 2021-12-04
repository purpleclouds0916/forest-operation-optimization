export interface FormValues {
  firstName: string;
  age: number;
  region: string;
  SDMD: {
    NRf: number;
    H: { value: number }[];
    V: { value: number }[];
    DBH: { value: number }[];
    HF: { value: number }[];
  };

  Density: { Plant: { value: number }[]; Minimum: number };
  RegenerationCost: { value: number }[];
  ThinningPercent: { value: number }[];
  AnnualInterestPercent: number;
  HarvestingAges: { value: number }[];
  MaxNumOfHarvest: number;
  Thinning: {
    YieldRate: number;
    Cost: number;
    StumpHeight: number;
    LogLength: number;
    LoggingPitch: number;
    Diameter: { value: number }[];
    Price: { value: number }[];
  };
  Clearcut: {
    YieldRate: number;
    Cost: number;
    StumpHeight: number;
    LogLength: number;
    LoggingPitch: number;
    Diameter: { value: number }[];
    Price: { value: number }[];
  };
};
