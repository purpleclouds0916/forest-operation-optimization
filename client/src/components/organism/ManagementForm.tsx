/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-props-no-spreading */

import React, { VFC } from 'react';
import {
  useForm,
  useFieldArray,
  Controller,
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import './Management.css';

// eslint-disable-next-line import/no-cycle
import { FormValues } from '../../models/Form';

type Props = {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: any;
  clearErrors: any;
  setError: any;
};

const Management: VFC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    errors,
    clearErrors,
    setError,
  } = props;

  const { fields: DensityPlantFields } = useFieldArray({
    control,
    name: 'Density.Plant',
  });

  const { fields: RegenerationCostFields } = useFieldArray({
    control,
    name: 'RegenerationCost',
  });

  const { fields: ThinningPercentFields } = useFieldArray({
    control,
    name: 'ThinningPercent',
  });
  const { fields: HarvestingAgesFields } = useFieldArray({
    control,
    name: 'HarvestingAges',
  });

  const formTitleAndDescription = {
    Density: {
      Plant: [
        {
          title: '最小の植林密度',
          description: 'この値よりも小さい植林密度にはなりません',
        },
        {
          title: '最大の植林密度',
          description: 'この値よりも大きい植林密度にはなりません',
        },
      ],
      Minimum: {
        title: '主伐の直前の最小の植林密度',
        description: 'この値を下回る植林密度になる間伐は実施しません',
      },
    },

    RegenerationCost: [
      {
        title: '植林・育林費用',
        description: '地拵え,下刈り、枝打ち、除伐、獣害対策の合計費用',
      },
      {
        title: '苗木の価格',
        description: '苗木一本あたりの費用',
      },
    ],
    ThinningPercent: [
      {
        title: '最小の間伐率',
        description: 'この値以下の間伐は実施されません',
      },
      {
        title: '最大の間伐率',
        description: 'この値以上の間伐は実施されません',
      },
    ],
    AnnualInterestPercent: {
      title: '年利',
      description:
        '林業経営におけるリスクのことです。一般的には0.8 ~ 0.9になります',
    },
    HarvestingAges: [
      {
        title: '間伐を開始する林齢',
        description: 'この値以下の林齢では、間伐を実施しません',
      },
      {
        title: '最大伐期',
        description: 'この値以下の林業施業を提案します',
      },
      {
        title: '間伐の間隔',
        description: '間伐をしてから次の間伐までの最小の期間です',
      },
    ],
    MaxNumOfHarvest: {
      title: '間伐の最大回数',
      description: 'これよりも多い間伐は実施されません',
    },
  };

  const watchDensity: any = watch('Density');
  const watchThinningPercent: any = watch('ThinningPercent');
  // console.log(
  //   watchDensity.Plant[0].value * (1 - watchThinningPercent[0].value / 100),
  // );
  // console.log(watchDensity.Plant[0].value >= watchDensity.MinimumAtClearcut.value / 1 - watchThinningPercent[0].value)
  const clearError = () => {
    //   id.parent.Plant[0].value *
    //   // @ts-ignore
    //   (1 - id.from[1].value.ThinningPercent[0].value / 100) >=
    // // @ts-ignore
    // value
    // console.log(e); ThinningPercent
    if (
      watchDensity.Plant[0].value * (1 - watchThinningPercent[0].value / 100) >=
      watchDensity.Minimum
    ) {
      clearErrors('Density.Minimum');
    } else {
      console.log('test');
      setError('Density.Minimum', 'test', 'チョコレートくだあい');
    }
  };
  // if (errors.Density.Minimum !== undefined) {
  //   errors[loggingMethod]?.Diameter.map((item: any, index: number) => {
  //     tableAllErrors.push(item.value.message);
  //   });
  // }

  return (
    <div>
      <div className="card">
        <div className="form-title">経営方法の詳細</div>
        <div className="">
          <ul className="management-items">
            {DensityPlantFields.map((DensityPlantfield, index) => (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              <li
                className="input-form-items input-plants"
                key={DensityPlantfield.id}
              >
                <p className="control-label">
                  {formTitleAndDescription.Density.Plant[index].title}
                </p>
                <p className="field-description">
                  {formTitleAndDescription.Density.Plant[index].description}
                </p>
                <Controller
                  control={control}
                  name={`Density.Plant.${index}.value`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      onChange={(e) => {
                        clearError();

                        if (
                          // eslint-disable-next-line no-restricted-globals
                          isNaN(Number(e.target.value)) ||
                          e.target.value === ''
                        ) {
                          field.onChange('');
                        } else {
                          // eslint-disable-next-line radix
                          field.onChange(parseInt(e.target.value));
                        }
                      }}
                      // onChange={() => {
                      //   clearError();
                      // }}
                      // onTouchEnd={(e) => {
                      //   clearError()
                      //   // setValue(`${loggingMethod}.Price.${number}.value`, PriceValue);
                      // }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">本/ha</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      error={Boolean(errors.Density?.Plant?.[index])}
                      helperText={
                        errors.Density?.Plant?.[index] &&
                        errors.Density?.Plant?.[index].value.message
                      }
                    />
                  )}
                />
              </li>
            ))}

            <li className="input-form-items minimum-input">
              <p className="control-label">
                {formTitleAndDescription.Density.Minimum.title}
              </p>
              <p className="field-description">
                {formTitleAndDescription.Density.Minimum.description}
              </p>
              <Controller
                control={control}
                name="Density.Minimum"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    // onChange={(e) => {
                    //   console.log("てきすと");
                    // }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">本/ha</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    error={Boolean(errors.Density?.Minimum)}
                    helperText={
                      errors.Density?.Minimum && errors.Density.Minimum.message
                    }
                  />
                )}
              />
              {/* <div className="errors">
                <div errors={errors} name="Density.Minimum" />
                
              </div> */}
            </li>

            {RegenerationCostFields.map((RegenerationCostField, index) => (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              <li
                className="input-form-items regenerationCost-inputs"
                key={RegenerationCostField.id}
              >
                <p className="control-label">
                  {formTitleAndDescription.RegenerationCost[index].title}
                </p>
                <p className="field-description">
                  {formTitleAndDescription.RegenerationCost[index].description}
                </p>
                <Controller
                  control={control}
                  name={`RegenerationCost.${index}.value`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">円</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      error={Boolean(errors.RegenerationCost?.[index])}
                      helperText={
                        errors.RegenerationCost?.[index] &&
                        errors.RegenerationCost?.[index].value.message
                      }
                    />
                  )}
                />
              </li>
            ))}

            {ThinningPercentFields.map((ThinningPercentField, index) => (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              <li
                className="input-form-items thinningPercent-inputs"
                key={ThinningPercentField.id}
              >
                <p className="control-label">
                  {formTitleAndDescription.ThinningPercent[index].title}
                </p>
                <p className="field-description">
                  {formTitleAndDescription.ThinningPercent[index].description}
                </p>
                <Controller
                  control={control}
                  name={`ThinningPercent.${index}.value`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      error={Boolean(errors.ThinningPercent?.[index])}
                      helperText={
                        errors.ThinningPercent?.[index] &&
                        errors.ThinningPercent?.[index].value.message
                      }
                    />
                  )}
                />
              </li>
            ))}

            <li className="input-form-items annualInterestPercent-item">
              <p className="control-label">
                {formTitleAndDescription.AnnualInterestPercent.title}
              </p>
              <p className="field-description">
                {formTitleAndDescription.AnnualInterestPercent.description}
              </p>
              <Controller
                control={control}
                name="AnnualInterestPercent"
                rules={{ required: 'required!' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    error={Boolean(errors.AnnualInterestPercent)}
                    helperText={
                      errors.AnnualInterestPercent &&
                      errors.AnnualInterestPercent.message
                    }
                  />
                )}
              />
              {errors.AnnualInterestPercent && (
                <p>{errors.AnnualInterestPercent?.message}</p>
              )}
            </li>

            {HarvestingAgesFields.map((HarvestingAgesField, index) => (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              <li
                className="input-form-items harvesting-ages-input"
                key={HarvestingAgesField.id}
              >
                <p className="control-label">
                  {formTitleAndDescription.HarvestingAges[index].title}
                </p>
                <p className="field-description">
                  {formTitleAndDescription.HarvestingAges[index].description}
                </p>
                <Controller
                  control={control}
                  name={`HarvestingAges.${index}.value`}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">年</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      error={Boolean(errors.HarvestingAges?.[index])}
                      helperText={
                        errors.HarvestingAges?.[index] &&
                        errors.HarvestingAges?.[index].value.message
                      }
                    />
                  )}
                />
              </li>
            ))}

            <li className="input-form-items max-num-of-harvest-item">
              <p className="control-label">
                {formTitleAndDescription.MaxNumOfHarvest.title}
              </p>
              <p className="field-description">
                {formTitleAndDescription.MaxNumOfHarvest.description}
              </p>
              <Controller
                control={control}
                name="MaxNumOfHarvest"
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">年</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    error={Boolean(errors.MaxNumOfHarvest)}
                    helperText={
                      errors.MaxNumOfHarvest && errors.MaxNumOfHarvest.message
                    }
                  />
                )}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Management;
