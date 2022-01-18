/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-unused-expressions */

import * as yup from 'yup';

const schema = yup
  .object({
    Density: yup.object({
      Minimum: yup
        .number()
        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      Plant: yup.array().of(
        yup.object().shape({
          value: yup
            .number()
            .typeError('半角数字で入力してください')
            .required('必須項目です')
            .moreThan(0, '0よりも大きい数字を入れてください')
            .lessThan(10000, '10000よりも小さい数字を入れてください')
            .test(
              'plant-left',
              '最大の植林密度よりも小さい数字を入れてください',
              (value, id) => {
                const Id = Number(id.path.replace(/[^0-9]/g, ''));
                if (Id === 0) {
                  if (
                    // @ts-ignore
                    id.options.from[1].value.Plant[Id + 1].value <
                    id.parent.value
                  ) {
                    return false;
                  }
                }

                return true;
              },
            )
            .test(
              'plant-left',
              '最小の植林密度よりも大きい数字を入れてください',
              (value, id) => {
                const Id = Number(id.path.replace(/[^0-9]/g, ''));
                if (Id === 1) {
                  if (
                    // @ts-ignore
                    id.options.from[1].value.Plant[Id - 1].value >
                    id.parent.value
                  ) {
                    return false;
                  }
                }

                return true;
              },
            ),
        }),
      ),
    }),
    RegenerationCost: yup.array().of(
      yup.object().shape({
        value: yup
          .number()
          .moreThan(0, '0よりも大きい数字を入れてください')
          .typeError('半角数字で入力してください')
          .required('必須項目です'),
      }),
    ),
    ThinningPercent: yup.array().of(
      yup.object().shape({
        value: yup
          .number()
          .typeError('半角数字で入力してください')
          .moreThan(0, '0よりも大きい数字を入れてください')
          .required('必須項目です')
          .test(
            'plant-left',
            '最大の間伐率よりも小さい数字を入れてください',
            (value, id) => {
              const Id = Number(id.path.replace(/[^0-9]/g, ''));
              if (Id === 0) {
                if (
                  // @ts-ignore
                  id.options.from[1].value.ThinningPercent[Id + 1].value <
                  id.parent.value
                ) {
                  return false;
                }
              }

              return true;
            },
          )
          .test(
            'plant-left',
            '最小の間伐率よりも大きい数字を入れてください',
            (value, id) => {
              const Id = Number(id.path.replace(/[^0-9]/g, ''));
              if (Id === 1) {
                if (
                  // @ts-ignore
                  id.options.from[1].value.ThinningPercent[Id - 1].value >
                  id.parent.value
                ) {
                  return false;
                }
              }

              return true;
            },
          ),
      }),
    ),
    AnnualInterestPercent: yup
      .number()
      .required('必須項目です')
      .lessThan(100, '100よりも大きい数字を入れてください')
      .typeError('半角数字で入力してください'),
    HarvestingAges: yup.array().of(
      yup.object().shape({
        value: yup
          .number()
          .moreThan(0, '0よりも大きい数字を入れてください')
          .typeError('半角数字で入力してください')

          .required('必須項目です')
          .test(
            'plant-left',
            '最大伐期よりも短い数字を入れてください',
            (value, id) => {
              const Id = Number(id.path.replace(/[^0-9]/g, ''));
              if (Id === 0) {
                if (
                  // @ts-ignore
                  id.options.from[1].value.HarvestingAges[Id + 1].value <
                  id.parent.value
                ) {
                  return false;
                }
              }

              return true;
            },
          )
          .test(
            'plant-left',
            '間伐を開始する林齢よりも長い数字を入れてください',
            (value, id) => {
              const Id = Number(id.path.replace(/[^0-9]/g, ''));
              if (Id === 1) {
                if (
                  // @ts-ignore
                  id.options.from[1].value.HarvestingAges[Id - 1].value >
                  id.parent.value
                ) {
                  return false;
                }
              }

              return true;
            },
          ),
      }),
    ),
    MaxNumOfHarvest: yup
      .number()
      .moreThan(0, '0よりも大きい数字を入れてください')
      .required('必須項目です')
      .typeError('半角数字で入力してください'),
    Thinning: yup.object({
      YieldRate: yup
        .number()
        .moreThan(0, '0よりも大きい数字を入れてください')
        .lessThan(1, '1よりも小さい数字を入れてください')
        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      Cost: yup
        .number()
        .moreThan(0, '0よりも大きい数字を入れてください')
        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      StumpHeight: yup
        .number()
        .moreThan(0, '0よりも大きい数字を入れてください')
        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      LogLength: yup
        .number()

        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      LoggingPitch: yup
        .number()

        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      Diameter: yup.array().of(
        yup.object().shape({
          value: yup
            .number()
            .test(
              'increase-left-diamter',
              '胸高直径は徐々に大きくなるようにしてください',
              (value, id) => {
                const diamterId = Number(id.path.replace(/[^0-9]/g, ''));
                if (diamterId !== 0 && 10) {
                  if (
                    // @ts-ignore
                    id.options.from[1].value.Diameter[diamterId - 1].value >
                    id.parent.value
                  ) {
                    return false;
                  }
                }

                return true;
              },
            )
            .test(
              'increase-right-diamter',
              '胸高直径は徐々に大きくなるようにしてください',
              (value, id) => {
                const diamterId = Number(id.path.replace(/[^0-9]/g, ''));
                if (diamterId !== 10) {
                  if (
                    // @ts-ignore
                    id.options.from[1].value.Diameter[diamterId + 1].value <
                    id.parent.value
                  ) {
                    return false;
                  }
                }

                return true;
              },
            )
            .typeError('半角数字で入力してください')
            .required('必須項目です'),
        }),
      ),
      Price: yup.array().of(
        yup.object().shape({
          value: yup
            .number()
            .typeError('半角数字で入力してください')
            .required('必須項目です'),
        }),
      ),
    }),
    Clearcut: yup.object({
      YieldRate: yup
        .number()
        .moreThan(0, '0よりも大きい数字を入れてください')
        .lessThan(1, '1よりも小さい数字を入れてください')
        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      Cost: yup
        .number()
        .moreThan(0, '0よりも大きい数字を入れてください')
        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      StumpHeight: yup
        .number()
        .moreThan(0, '0よりも大きい数字を入れてください')
        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      LogLength: yup
        .number()

        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      LoggingPitch: yup
        .number()

        .required('必須項目です')
        .typeError('半角数字で入力してください'),
      Diameter: yup.array().of(
        yup.object().shape({
          value: yup
            .number()
            .typeError('半角数字で入力してください')
            .required('必須項目です')
            .test(
              'increase-left-diamter',
              '胸高直径は徐々に大きくなるようにしてください',
              (value, id) => {
                const diamterId = Number(id.path.replace(/[^0-9]/g, ''));
                if (diamterId !== 0 && 10) {
                  if (
                    // @ts-ignore
                    id.options.from[1].value.Diameter[diamterId - 1].value >
                    id.parent.value
                  ) {
                    return false;
                  }
                }

                return true;
              },
            )
            .test(
              'increase-right-diamter',
              '胸高直径は徐々に大きくなるようにしてください',
              (value, id) => {
                const diamterId = Number(id.path.replace(/[^0-9]/g, ''));
                if (diamterId !== 10) {
                  if (
                    // @ts-ignore
                    id.options.from[1].value.Diameter[diamterId + 1].value <
                    id.parent.value
                  ) {
                    return false;
                  }
                }

                return true;
              },
            ),
        }),
      ),
      Price: yup.array().of(
        yup.object().shape({
          value: yup
            .number()
            .typeError('半角数字で入力してください')
            .moreThan(0, '0よりも大きい数字を入れてください')
            .required('必須項目です'),
        }),
      ),
    }),
  })
  .required();

export default schema;
