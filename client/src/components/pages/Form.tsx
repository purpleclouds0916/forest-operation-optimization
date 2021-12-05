/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import schema from '../../validation/MainValidation';

import 'katex/dist/katex.min.css';
import Headers from './Header';
import './Form.css';
import StandDensityManagementData from '../../data/StandDensityManagementData.json';
import Management from '../organism/ManagementForm';
import DensityManagement from '../organism/DensityManagement';
import LoggingCostCalculator from '../organism/LoggingCostCalculator';
import { FormValues } from '../../models/Form';
import { AppDispatch, RootState } from '../../redux/store';
import { addCalculationResult } from '../../redux/CalculationResultSlice';

const Form = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const calculationResult = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const CaluculationResult = {
    SHS: {
      optimalSolution: {
        SEV: 2,
        N: [1589.1, 794.8, 531.5],
        T: [46.8, 51.8, 56.8],
        Y: [100.1, 66.1, 347.4],
        HarvestingProfit: [500318.2, 429470.5, 2258001.8],
      },
      standSimulation: {
        T: [
          10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0,
          21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0, 31.0,
          32.0, 33.0, 34.0, 35.0, 36.0, 37.0, 38.0, 39.0, 40.0, 41.0, 42.0,
          43.0, 44.0, 45.0, 46.0, 46.8, 46.8, 47.0, 48.0, 49.0, 50.0, 51.0,
          51.8, 51.8, 52.0, 53.0, 54.0, 55.0, 56.0, 56.8, 56.8,
        ],
        N_dash: [
          1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1,
          1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1,
          1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1,
          1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1,
          1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 1589.1, 794.8, 794.8, 794.8,
          794.8, 794.8, 794.8, 794.8, 531.5, 531.5, 531.5, 531.5, 531.5, 531.5,
          531.5, 0.0,
        ],
        H: [
          6.18, 6.83, 7.45, 8.05, 8.63, 9.19, 9.73, 10.25, 10.76, 11.24, 11.71,
          12.17, 12.61, 13.03, 13.44, 13.83, 14.22, 14.59, 14.94, 15.29, 15.62,
          15.94, 16.25, 16.55, 16.84, 17.12, 17.39, 17.65, 17.9, 18.14, 18.38,
          18.6, 18.82, 19.03, 19.24, 19.43, 19.62, 19.77, 19.77, 19.81, 19.99,
          20.16, 20.32, 20.48, 20.6, 20.6, 20.64, 20.79, 20.93, 21.07, 21.2,
          21.31, 21.31,
        ],
        N: [
          1571.8, 1567.1, 1562.0, 1556.6, 1550.9, 1545.0, 1538.9, 1532.7,
          1526.5, 1520.2, 1513.9, 1507.6, 1501.3, 1495.1, 1488.9, 1482.8,
          1476.8, 1470.9, 1465.1, 1459.4, 1453.8, 1448.3, 1443.0, 1437.7,
          1432.6, 1427.6, 1422.7, 1418.0, 1413.4, 1408.9, 1404.5, 1400.2,
          1396.1, 1392.1, 1388.2, 1384.4, 1380.7, 1377.9, 752.1, 752.0, 751.1,
          750.4, 749.6, 748.9, 748.3, 514.1, 514.0, 513.7, 513.4, 513.2, 512.9,
          512.7, 0.0,
        ],
        V: [
          43.2, 55.1, 67.9, 81.5, 95.8, 110.6, 125.8, 141.3, 157.0, 172.8,
          188.6, 204.4, 220.2, 235.8, 251.2, 266.5, 281.6, 296.4, 311.0, 325.3,
          339.3, 353.0, 366.5, 379.6, 392.4, 405.0, 417.2, 429.1, 440.7, 451.9,
          462.9, 473.6, 484.0, 494.1, 503.9, 513.4, 522.7, 529.7, 404.6, 406.3,
          414.0, 421.4, 428.6, 435.6, 441.0, 358.4, 359.7, 365.5, 371.1, 376.6,
          381.9, 386.0, 0.0,
        ],
        D: [
          9.7, 10.6, 11.3, 12.0, 12.6, 13.2, 13.8, 14.3, 14.7, 15.2, 15.6, 16.0,
          16.4, 16.7, 17.0, 17.4, 17.6, 17.9, 18.2, 18.4, 18.7, 18.9, 19.1,
          19.3, 19.5, 19.7, 19.9, 20.1, 20.3, 20.4, 20.6, 20.7, 20.9, 21.0,
          21.1, 21.2, 21.4, 21.5, 26.0, 26.0, 26.2, 26.3, 26.5, 26.6, 26.7,
          29.3, 29.4, 29.5, 29.6, 29.8, 29.9, 30.0, 0.0,
        ],
        ValueOfStandingTrees: [
          -116711.1, -148724.6, -183363.3, -220178.2, -258758.1, -298731.5,
          -339768.9, -381580.0, -423910.4, -318133.2, 6512.6, 367322.1,
          396298.1, 424411.2, 452245.6, 479743.8, 506857.7, 533547.2, 600374.2,
          683369.4, 767823.0, 853424.2, 939888.6, 1026950.8, 1114372.9,
          1201935.0, 1289437.0, 1351555.8, 1388068.6, 1423619.2, 1458216.8,
          1491871.1, 1524595.2, 1556402.2, 1587308.0, 1617327.0, 1646477.0,
          1668479.2, 2002752.1, 2011404.5, 2049208.1, 2085974.2, 2121719.5,
          2156461.2, 2182799.5, 1988898.9, 2001444.0, 2057235.0, 2111930.5,
          2165518.5, 2217984.8, 2258001.8, 0.0,
        ],
      },
    },
  };

  console.log(calculationResult);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      SDMD: {
        H: [
          { value: StandDensityManagementData.tohoku.SH.SDMD.H[0] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.H[1] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.H[2] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.H[3] },
        ],
        V: [
          { value: StandDensityManagementData.tohoku.SH.SDMD.V[0] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.V[1] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.V[2] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.V[3] },
        ],
        NRf: StandDensityManagementData.tohoku.SH.SDMD.NRf,
        DBH: [
          { value: StandDensityManagementData.tohoku.SH.SDMD.DBH[0] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.DBH[1] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.DBH[2] },
        ],
        HF: [
          { value: StandDensityManagementData.tohoku.SH.SDMD.HF[0] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.HF[1] },
          { value: StandDensityManagementData.tohoku.SH.SDMD.HF[2] },
        ],
      },
      Density: { Plant: [{ value: 1000 }, { value: 5000 }], Minimum: 500 },
      RegenerationCost: [{ value: 1000000 }, { value: 100 }],
      ThinningPercent: [{ value: 10 }, { value: 50 }],
      AnnualInterestPercent: 0.9,
      HarvestingAges: [{ value: 20 }, { value: 150 }, { value: 5 }],
      MaxNumOfHarvest: 7,
      Thinning: {
        YieldRate: 0.8,
        Cost: 3000,
        StumpHeight: 0.5,
        LogLength: 4,
        LoggingPitch: 4.1,
        Diameter: [
          { value: 5 },
          { value: 6 },
          { value: 15 },
          { value: 16 },
          { value: 18 },
          { value: 20 },
          { value: 22 },
          { value: 24 },
          { value: 28 },
          { value: 30 },
          { value: 40 },
        ],
        Price: [
          { value: 0 },
          { value: 3000 },
          { value: 3000 },
          { value: 8000 },
          { value: 8000 },
          { value: 9500 },
          { value: 9500 },
          { value: 11500 },
          { value: 11500 },
          { value: 12500 },
          { value: 12500 },
        ],
      },
      Clearcut: {
        YieldRate: 0.9,
        Cost: 6000,
        StumpHeight: 0.5,
        LogLength: 4,
        LoggingPitch: 4.1,
        Diameter: [
          { value: 5 },
          { value: 6 },
          { value: 15 },
          { value: 16 },
          { value: 18 },
          { value: 20 },
          { value: 22 },
          { value: 24 },
          { value: 28 },
          { value: 30 },
          { value: 40 },
        ],
        Price: [
          { value: 0 },
          { value: 3000 },
          { value: 3000 },
          { value: 8000 },
          { value: 8000 },
          { value: 9500 },
          { value: 9500 },
          { value: 11500 },
          { value: 11500 },
          { value: 12500 },
          { value: 12500 },
        ],
      },
    },
  });

  const [response, setResponse] = useState<any>('');
  // const [post, setPost] = useState<any>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseToPost, setResponseToPost] = useState<any>('');

  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const callApi = async () => {
    const Testresponse = await fetch('/api/hello');
    const body = await Testresponse.json();
    if (Testresponse.status !== 200) throw Error(body.message);

    return body;
  };

  useEffect(() => {
    callApi()
      .then((res) => setResponse(res.express))
      .catch((err) => console.log(err));
  });

  const onSubmit = (data: FormValues) => {
    // e.preventDefault();
    setLoading(true);
    dispatch(addCalculationResult(CaluculationResult));

    const DataSdmdH: number[] = [];
    data.SDMD.H.map((value) => {
      DataSdmdH.push(value.value);
    });
    const DataSdmdV: number[] = [];
    data.SDMD.V.map((value) => {
      DataSdmdV.push(value.value);
    });
    const DataSdmdDBH: number[] = [];
    data.SDMD.DBH.map((value) => {
      DataSdmdDBH.push(value.value);
    });
    const DataSdmdHF: number[] = [];
    data.SDMD.HF.map((value) => {
      DataSdmdHF.push(value.value);
    });

    const Json = {
      //  JAVAのAPIのためにデータの形を変える
      SH: {
        YieldModelType: 'S',
        SAType: '2021',

        SDMD: {
          H: DataSdmdH,
          V: DataSdmdV,
          NRf: data.SDMD.NRf,
          DBH: DataSdmdDBH,
          HF: DataSdmdHF,
        },
        Density: {
          Plant: [data.Density.Plant[0].value, data.Density.Plant[1].value],
          MinimumAtClearcut: data.Density.Minimum,
        },
        RegenerationCost: [
          data.RegenerationCost[0].value,
          data.RegenerationCost[1].value,
        ],
        ThinningPercent: [
          data.ThinningPercent[0].value,
          data.ThinningPercent[1].value,
        ],
        AnnualInterestPercent: data.AnnualInterestPercent,
        HarvestingAges: [
          data.HarvestingAges[0].value,
          data.HarvestingAges[1].value,
          data.HarvestingAges[2].value,
        ],
        MaxNumOfHarvest: data.MaxNumOfHarvest,
        NumSearch: [3, 10000],
        Thinning: {
          YieldRate: data.Thinning.YieldRate,
          Cost: data.Thinning.Cost,
          StumpHeight: data.Thinning.StumpHeight,
          LogLength: data.Thinning.LogLength,
          LoggingPitch: data.Thinning.LoggingPitch,
          Diameter: [
            data.Thinning.Diameter[0].value,
            data.Thinning.Diameter[1].value,
            data.Thinning.Diameter[2].value,
            data.Thinning.Diameter[3].value,
            data.Thinning.Diameter[4].value,
            data.Thinning.Diameter[5].value,
            data.Thinning.Diameter[6].value,
            data.Thinning.Diameter[7].value,
            data.Thinning.Diameter[8].value,
            data.Thinning.Diameter[9].value,
            data.Thinning.Diameter[10].value,
          ],
          Price: [
            data.Thinning.Price[0].value,
            data.Thinning.Price[1].value,
            data.Thinning.Price[2].value,
            data.Thinning.Price[3].value,
            data.Thinning.Price[4].value,
            data.Thinning.Price[5].value,
            data.Thinning.Price[6].value,
            data.Thinning.Price[7].value,
            data.Thinning.Price[8].value,
            data.Thinning.Price[9].value,
            data.Thinning.Price[10].value,
          ],
        },
        Clearcut: {
          YieldRate: data.Clearcut.YieldRate,
          Cost: data.Clearcut.Cost,
          StumpHeight: data.Clearcut.StumpHeight,
          LogLength: data.Clearcut.LogLength,
          LoggingPitch: data.Clearcut.LoggingPitch,
          Diameter: [
            data.Clearcut.Diameter[0].value,
            data.Clearcut.Diameter[1].value,
            data.Clearcut.Diameter[2].value,
            data.Clearcut.Diameter[3].value,
            data.Clearcut.Diameter[4].value,
            data.Clearcut.Diameter[5].value,
            data.Clearcut.Diameter[6].value,
            data.Clearcut.Diameter[7].value,
            data.Clearcut.Diameter[8].value,
            data.Clearcut.Diameter[9].value,
            data.Clearcut.Diameter[10].value,
          ],
          Price: [
            data.Clearcut.Price[0].value,
            data.Clearcut.Price[1].value,
            data.Clearcut.Price[2].value,
            data.Clearcut.Price[3].value,
            data.Clearcut.Price[4].value,
            data.Clearcut.Price[5].value,
            data.Clearcut.Price[6].value,
            data.Clearcut.Price[7].value,
            data.Clearcut.Price[8].value,
            data.Clearcut.Price[9].value,
            data.Clearcut.Price[10].value,
          ],
        },
        SA: {
          Comment: 'Type L 1000 yen/ha degradation for SEV',
          NumRepeat: 40,
          NumTempLevel: 100,
          MetaSearchPercentile: 0.75,
          NumTotalLoopN: [1, 8],
          NumTotalLoopPow: [3.55, 6.75],
          StartTemp: [0, -0.6, 0.6, 5],
          DiffTemp: [0, -3.8, 1.4, 5],
          DistScale: [0, -1.2, 0.6, 5],
        },
      },
    };
    console.log(JSON.stringify(Json));
    // console.log(JSON.stringify(data));
    const abortCtrl = new AbortController();
    void axios
      .post('/api/world', Json)
      .then((res) => {
        console.log(res.data.result);
        setResponseToPost(res.data.result);
        navigate('/submit');
      })
      .catch(() => {
        alert(
          '計算に失敗しました。お手数ですが、管理者に問い合わせをしてください。',
        );
      })
      .finally(() => {
        setLoading(false);
      });

    // const Test1response: any = await fetch('/api/world', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(Json),
    // });
    // const body = await Test1response.text();
    // console.log(body)
    // setResponseToPost(body);
    return () => {
      abortCtrl.abort();
    };
  };

  return (
    <div>
      <Headers description="経営に関する数値を入力するだけで、最適な経営方法を提案します" />
      <p>{response}</p>
      <p>{JSON.stringify(responseToPost)}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DensityManagement
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
        />
        <Management
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
        <LoggingCostCalculator
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          loggingMethod="Thinning"
          errors={errors}
          clearErrors={clearErrors}
        />
        <LoggingCostCalculator
          register={register}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          watch={watch}
          loggingMethod="Clearcut"
          errors={errors}
          clearErrors={clearErrors}
        />
        <input type="submit" />
        {loading && (
          <>
            <div className="isCalculation">
              <p>計算中です</p>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Form;
