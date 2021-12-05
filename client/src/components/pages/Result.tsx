/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VFC } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

const Result: VFC = () => {
  console.log('Resultがレンダリングされました');
  const calculationResult = useSelector((state: RootState) => state);

  console.log(calculationResult.SHS);

  return (
    <>
      <p>outcomt to Result</p>
    </>
  );
};

export default Result;
