/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useRef, VFC } from 'react';
import {
  useFieldArray,
  Controller,
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import * as d3 from 'd3';
import { FormValues } from '../../models/Form';

import './ResultLineChart.css';

// eslint-disable-next-line
interface Props {
  arrayX: number[];
  arrayY: number[];
  title: string;
  DigitsOfYaxis: number;
  yaxisTitle: string;
  yaxisUnit: string;
}

const ResultLineChart: VFC<Props> = (props) => {
  const { arrayX, arrayY, title, DigitsOfYaxis, yaxisTitle, yaxisUnit } = props;
  const d3Chart = useRef();

  // ランダムな文字列(id)を作成する
  // 生成する文字列の長さ
  const l = 8;

  // 生成する文字列に含める文字セット
  const c = 'abcdefghijklmnopqrstuvwxyz';

  const cl = c.length;
  let randomIdChart = '';
  for (let i = 0; i < l; i++) {
    randomIdChart += c[Math.floor(Math.random() * cl)];
  }

  useEffect(() => {
    d3
      // eslint-disable-next-line
      // @ts-ignore
      .select(d3Chart.current)
      .selectAll('*')
      .remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data: [number, number][] = [];

    arrayX.map((element, index) => data.push([arrayX[index], arrayY[index]]));

    const margin = { top: 50, right: 100, bottom: 60, left: 100 };
    const width =
      parseInt(d3.select(`#${randomIdChart}`).style('width'), 10) -
      margin.left -
      margin.right;
    const height = 500 - margin.top - margin.bottom;

    const maxX = Math.ceil(arrayX.reduce((a, b) => (a > b ? a : b)) / 10) * 10;
    const minX = arrayX.reduce((a, b) => (a < b ? a : b));

    const maxY =
      Math.ceil(arrayY.reduce((a, b) => (a > b ? a : b)) / DigitsOfYaxis) *
      DigitsOfYaxis;
    const minY = arrayY.reduce((a, b) => (a < b ? a : b));

    const x = d3.scaleLinear().domain([minX, maxX]).range([0, width]);

    const y = d3.scaleLinear().domain([minY, maxY]).range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    // tooltip用div要素追加
    const tooltip = d3.select('body').append('div').attr('class', 'tooltip');

    const line = d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    const svg = d3
      // eslint-disable-next-line
      // @ts-ignore
      .select(d3Chart.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const focusText = svg
      .append('g')
      .append('text')
      .style('opacity', 0)
      .attr('text-anchor', 'left')
      .attr('alignment-baseline', 'middle')
      ;

    //  軸ラベルの追加
    svg
      .append('text')
      .attr('class', 'axis--x')
      .attr('y', height + 50)
      .attr('x', width / 2)
      .attr('text-anchor', 'middle')
      .text('林齢【年】');

    svg
      .append('text')
      .attr('class', 'axis--y')
      .attr('y', -30)
      .attr('x', -10)
      .attr('text-anchor', 'middle')
      .text(`${yaxisTitle}【${yaxisUnit}】`);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');

    svg.append('path').datum(data).attr('class', 'line').attr('d', line);

    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus.append('circle').attr('r', 4.5);

    focus
      .append('rect')
      .attr('class', 'tooltip')
      .attr('width', 100)
      .attr('height', 50)
      .attr('x', 10)
      .attr('y', -22)
      .attr('rx', 4)
      .attr('ry', 4);

    focus
      .append('text')
      .attr('class', 'tooltip-date')
      .attr('x', 18)
      .attr('y', -2);

    // focus.append('text').attr('x', 18).attr('y', 18).text(':');

    focus
      .append('text')
      .attr('class', 'tooltip-likes')
      .attr('x', 60)
      .attr('y', 18);

    focus
      .append('rect')
      .attr('class', 'tooltip')
      .attr('width', 100)
      .attr('height', 50)
      .attr('x', 10)
      .attr('y', -22)
      .attr('rx', 4)
      .attr('ry', 4);

    focus.append('text').attr('x', 9).attr('y', '.35em');

    svg
      .append('rect')
      .attr('class', 'overlay')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', () => {
        focus.style('display', 'block');
        focus.style('opacity', 1);
        focus.style('background-color', 'red');
        focusText.style('opacity', 1);
      })
      .on('mouseout', () => {
        focus.style('display', 'none');
        focus.style('opacity', 0);
        focusText.style('opacity', 0);
      })
      .on('mousemove', mousemove);

    function mousemove(e: any) {
      // console.log(d3.pointer(e));
      const bisect = d3.bisector((d: any) => d[0]).left;
      const x0 = x.invert(d3.pointer(e)[0]);
      const i = bisect(data, x0, 1);
      const d0 = data[i - 1];
      const d1 = data[i];
      console.log(d0);
      console.log(d1);

      if (d1 !== undefined) {
        const d = x0 - d0[0] > d1[0] - x0 ? d1 : d0;
        focus.attr('transform', `translate(${x(d[0])},${y(d[1])})`);
        focusText
          .html(`x:${d[0]}  -  ` + `y:${d[1]}`)
          .attr('x', x(d[0]) + 15)
          .attr('y', y(d[1]));
        // focus.select('.tooltip-date').text(d[0]);
        // focus.select('.tooltip-likes').text(d[1]);
      }
    }
  });

  return (
    <>
      <div className="chart-item">
        <div className="chart-title">{title}</div>
        {/* eslint-disable-next-line */}
        {/* @ts-ignore  */}
        <svg ref={d3Chart} id={randomIdChart} />
      </div>
    </>
  );
};
export default ResultLineChart;
