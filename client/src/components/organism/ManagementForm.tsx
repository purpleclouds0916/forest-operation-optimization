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
};

const Management: VFC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { register, handleSubmit, control, setValue, watch, errors } = props;

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
          title: 'Plantの左側',
          description: '説明が入ります',
        },
        {
          title: 'Plantの右側',
          description: '説明が入ります',
        },
      ],
      Minimum: { title: 'Minimum', description: 'Minimumの説明が入ります' },
    },

    RegenerationCost: [
      {
        title: 'RegenerationCost',
        description: '説明が入ります',
      },
      {
        title: 'RegenerationCost',
        description: '説明が入ります',
      },
    ],
    ThinningPercent: [
      {
        title: '最小の間伐率',
        description: '最小の間伐率の説明が入ります',
      },
      {
        title: '最大の間伐率',
        description: '最大の間伐率の説明が入ります。',
      },
    ],
    AnnualInterestPercent: {
      title: 'AnnualInterestPercent',
      description: 'AnnualInterestPercentの説明が入ります',
    },
    HarvestingAges: [
      {
        title: '間伐を開始する林齢',
        description: '間伐を開始する林齢の説明が入ります',
      },
      {
        title: '最大の間伐率',
        description: '最大の間伐率の説明が入ります',
      },
      {
        title: '間伐間隔',
        description: '間伐間隔の説明が入ります',
      },
    ],
    MaxNumOfHarvest: {
      title: '間伐回数',
      description: '間伐と皆伐の最大合計回数です',
    },
  };

  return (
    <div>
      <div className="all-form-item">
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
                          <InputAdornment position="end">本/ha</InputAdornment>
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
                          <InputAdornment position="end">本/ha</InputAdornment>
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
                        <InputAdornment position="end">本/ha</InputAdornment>
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
                          <InputAdornment position="end">本/ha</InputAdornment>
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
                        <InputAdornment position="end">本/ha</InputAdornment>
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
