/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable array-callback-return */

import React, { useCallback, VFC } from 'react';
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
import TextField from '@material-ui/core/TextField';
import TeX from '@matejmazur/react-katex';
import { MenuItem } from '@material-ui/core';
import { FormValues } from '../../models/Form';
import StandDensityManagementData from '../../data/StandDensityManagementData.json';

type Props = {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
};

const DensityManagement: VFC<Props> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { register, handleSubmit, control, setValue, watch } = props;

  const { fields: HFields } = useFieldArray({
    control,
    name: 'SDMD.H',
  });
  const { fields: VFields } = useFieldArray({ control, name: 'SDMD.V' });
  // eslint-disable-next-line
  const { fields: DBHFields, remove: DBHRemove } = useFieldArray({
    control,
    name: 'SDMD.DBH',
  });
  // eslint-disable-next-line
  const { fields: HFFields, remove: HFRemove } = useFieldArray({
    control,
    name: 'SDMD.HF',
  });

  const onSetValue = useCallback(
    (e) => {
      //  配列の数に応じて、不要なフォームを削除する
      if (
        // eslint-disable-next-line
        // @ts-ignore
        StandDensityManagementData[e.target.value].SH.SDMD.DBH.length === 2 &&
        DBHFields.length === 3
      ) {
        DBHRemove(2);
      }
      if (
        // eslint-disable-next-line
        // @ts-ignore
        StandDensityManagementData[e.target.value].SH.SDMD.HF.length === 2 &&
        HFFields.length === 3
      ) {
        HFRemove(2);
      }

      // SDMDのH,V,DBH,HFは配列なので、まとめて代入
      // eslint-disable-next-line
      const SDMD_Property: string[] = ['H', 'V', 'DBH', 'HF'];
      // eslint-disable-next-line camelcase
      SDMD_Property.map((property) => {
        // eslint-disable-next-line
        // @ts-ignore
        StandDensityManagementData[e.target.value].SH.SDMD[property].map(
          // eslint-disable-next-line array-callback-return
          (value: number, index: number) => {
            // eslint-disable-next-line
            // @ts-ignore
            setValue(`SDMD.${property}.${index}.value`, value);
          },
        );
      });
      // SDMDのNRfの値は配列ではないので、個別で代入
      setValue(
        `SDMD.NRf`,
        // eslint-disable-next-line
        // @ts-ignore
        StandDensityManagementData[e.target.value].SH.SDMD.NRf,
      );
    },
    [DBHFields.length, DBHRemove, HFFields.length, HFRemove, setValue],
  );

  // const watchAllFields = watch();
  const watchSdmd: any = watch('SDMD');

  return (
    <div>
      <div className="card">
        <div className="form-title">林分密度管理図</div>
        <div className="sdmd-items">
          <div className="input-form-items">
            <input {...register('SDMD.NRf')} className="display-none" />
            <ul className="display-none">
              {HFields.map((field, index) => (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                <li key={field.id}>
                  <input {...register(`SDMD.H.${index}.value` as const)} />
                </li>
              ))}
            </ul>
            <ul className="display-none">
              {VFields.map((field, index) => (
                <li key={field.id}>
                  <input {...register(`SDMD.V.${index}.value` as const)} />
                </li>
              ))}
            </ul>
            <ul className="display-none">
              {DBHFields.map((field, index) => (
                <li key={field.id}>
                  <input {...register(`SDMD.DBH.${index}.value` as const)} />
                </li>
              ))}
            </ul>
            <ul className="display-none">
              {HFFields.map((field, index) => (
                <li key={field.id}>
                  <input {...register(`SDMD.HF.${index}.value` as const)} />
                </li>
              ))}
            </ul>
            <div className="sdmd-form-item">
              <div className="control-label">林分密度管理図を選択する</div>
              <div className="control-description">
                選択することで、最適な林分の成長を予測することができます
              </div>
              {/* <Select
            {...register('region')}
            options={[
              { value: "tohoku", label: "tohoku" },
              { value: "tohoku", label: "tohoku" },
              { value: "tohoku", label: "tohoku" }
            ]}
            onChange={(e) => {
                    onSetValue(e);
                  }}
          /> */}
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="選択する"
                    fullWidth
                    defaultValue="minamikinnkisikokusugi"
                    margin="normal"
                    variant="outlined"
                    id="select"
                    select
                    onChange={(e) => {
                      onSetValue(e);
                    }}
                  >
                    <MenuItem value="kyushuShikoku">九州四国地方</MenuItem>
                    <MenuItem value="tohoku">東北地方</MenuItem>
                    <MenuItem value="minamikinnkisikokusugi">
                      南近畿・四国地方 スギ林分密度管理図
                    </MenuItem>
                  </TextField>
                )}
              />
            </div>
          </div>
          {watchSdmd ? (
            <>
              <div className="sdmd-katexs-items">
                <div className="sdmd-katex-item sdmd-katex-formula">
                  <TeX>{String.raw`V = ({${watchSdmd.V[0].value}}H^{{${
                    watchSdmd.V[1].value
                  }}}{${
                    watchSdmd.V[2].value > 0
                      ? `+${watchSdmd.V[2].value}`
                      : `${watchSdmd.V[2].value}`
                  }}H^{{${watchSdmd.V[3].value}}}/N)^{-1}`}</TeX>
                  <br />
                  <TeX>{String.raw`HF = {${watchSdmd.HF[0].value}}{${
                    watchSdmd.HF[1].value > 0
                      ? `+${watchSdmd.HF[1].value}`
                      : `${watchSdmd.HF[1].value}`
                  }}H{${
                    watchSdmd.HF[2].value > 0
                      ? `+${watchSdmd.HF[2].value}`
                      : `${watchSdmd.HF[2].value}`
                  }}\sqrt{N}\cdot{H/100}`}</TeX>
                  <br />
                  <TeX>{String.raw`G = V/HF`}</TeX>
                  <br />
                  <TeX>{String.raw`\overline{d}g = 200\sqrt{G/(\pi\cdot{N})}`}</TeX>
                  <br />
                  <TeX>{String.raw`\overline{d} = {${watchSdmd.DBH[0].value}}{${
                    watchSdmd.DBH[1].value > 0
                      ? `+${watchSdmd.DBH[1].value}`
                      : `${watchSdmd.DBH[1].value}`
                  }}\overline{d}g{${
                    typeof watchSdmd.DBH[2] === 'undefined'
                      ? ``
                      : `${
                          watchSdmd.DBH[2].value > 0
                            ? `+${
                                watchSdmd.DBH[2].value
                              }${String.raw`\sqrt{N}\cdot{H/100}`}`
                            : `${
                                watchSdmd.DBH[2].value
                              }${String.raw`\sqrt{N}\cdot{H/100}`}`
                        }`
                  }}`}</TeX>
                  <br />
                  <TeX>{String.raw`\overline{R\footnotesize{y}} = V/V\tiny {Rf}`}</TeX>
                  <br />
                  <TeX>{String.raw`{V\tiny{Rf}} = ({${
                    watchSdmd.V[0].value
                  }}H^{${watchSdmd.V[1].value}}{${
                    watchSdmd.V[2].value > 0
                      ? `+${watchSdmd.V[2].value}`
                      : `${watchSdmd.V[2].value}`
                  }}H^{${watchSdmd.V[3].value}}/{N\tiny{Rf}})^{-1}`}</TeX>
                  <br />
                  <TeX>{String.raw`\log{N\tiny{Rf}} = {${watchSdmd.NRf}}{${
                    Math.round(
                      (watchSdmd.V[3].value - watchSdmd.V[1].value) * 100000,
                    ) / 100000
                  }}\log{H}`}</TeX>
                </div>

                <div className="sdmd-katex-item sdmd-katex-description">
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{V:ha当たり材積}}`}</TeX>
                  </div>
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{H:上層樹高}}`}</TeX>
                  </div>
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{N:ha当たり本数}}`}</TeX>
                  </div>
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{HF:林分形状高}}`}</TeX>
                  </div>
                  <div className="explanation-item">
                    <TeX>{String.raw`{\text{G:ha当たり断面積}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`\overline{d}g{\text{:断面積平均直径}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`\overline{d}{\text{:平均胸腔直径}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`\overline{R\footnotesize{y}}{\text{:収穫比数}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`{V\tiny{Rf}}{\text{:最多密度におけるha当たり材積}}`}</TeX>
                  </div>

                  <div className="explanation-item">
                    <TeX>{String.raw`{N\tiny{Rf}}{\text{:最多密度におけるha当たり本数}}`}</TeX>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default DensityManagement;
