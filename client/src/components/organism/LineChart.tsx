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

import './LineChart.css';

// eslint-disable-next-line
type Props = {
  description: string;
  title: string;
  loggingMethod: string;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  clearErrors: any;
};
const LineChart: VFC<Props> = (props) => {
  // eslint-disable-next-line
  const {
    description,
    title,
    loggingMethod,
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    clearErrors,
  } = props;

  const d3Chart = useRef();
  // eslint-disable-next-line
  // @ts-ignore
  const watchCostCalculation: any = watch(`${loggingMethod}`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  // console.log(watchSdmd);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const points: Array<Array<number>> = [];
  for (let index = 0; index < 11; index++) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const Xelement = Number(watchCostCalculation.Diameter[index].value);
    const Yelement = Number(watchCostCalculation.Price[index].value);
    points[index] = [Xelement, Yelement];
  }

  useEffect(() => {
    const margin = { top: 20, right: 50, bottom: 70, left: 95 };
    const width =
      parseInt(d3.select('#d3demo').style('width'), 10) -
      margin.left -
      margin.right;
    const height =
      parseInt(d3.select('#d3demo').style('height'), 10) -
      margin.top -
      margin.bottom;

    // const points: Array<Array<number>>= []

    // eslint-disable-next-line

    // console.log(array)
    // const points: Array<Array<number>> = [
    //   [5, 2000],
    //   [6, 3000],
    //   [15, 3000],
    //   [16, 8000],
    //   [18, 8000],
    //   [20, 9500],
    //   [22, 9500],
    //   [24, 11500],
    //   [28, 11500],
    //   [30, 12500],
    //   [40, 12500],
    // ];

    d3
      // eslint-disable-next-line
      // @ts-ignore
      .select(d3Chart.current)
      .selectAll('*')
      .remove();

    const svg = d3
      // eslint-disable-next-line
      // @ts-ignore
      .select(d3Chart.current)
      .attr('width', width + margin.left + margin.right + 20)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // eslint-disable-line

    // x axis scale
    const x = d3
      .scaleLinear()
      .domain(
        // eslint-disable-next-line
        // @ts-ignore
        d3.extent(points, (d: Array<number>) => d[0]),
      )
      .range([0, width]);

    const max = d3.max(points, (d: Array<number>) => d[1]); // eslint-disable-line

    const y = d3
      .scaleLinear()
      // eslint-disable-next-line
      // @ts-ignore
      .domain([0, max])
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const line = d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    const AxisRange: Array<Array<number>> = [
      [0, 0],
      [40, 20000],
    ];

    const focus = svg.append('g');

    // eslint-disable-next-line
    // @ts-ignore
    x.domain(d3.extent(AxisRange, (d: Array<Array<number>>) => d[0]));
    // eslint-disable-next-line
    // @ts-ignore
    y.domain(d3.extent(AxisRange, (d: Array<Array<number>>) => d[1]));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call

    focus
      .append('path')
      .datum(points)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      // eslint-disable-next-line
      // @ts-ignore
      .attr('d', line);

    // tooltip用div要素追加
    const tooltip = d3.select('body').append('div').attr('class', 'tooltip');

    focus
      .selectAll('circle')
      .data(points)
      .enter()
      .append('circle')
      .attr('r', 5.0)
      .attr('cx', (d: Array<number>) => x(d[0]))
      .attr('cy', (d: Array<number>) => y(d[1]))
      .style('cursor', 'pointer')
      .style('fill', 'steelblue')
      .attr('id', (d, i: number): string => `id-${i}`)
      .classed('cirStyle', true)
      .on('mouseover', (e, d: Array<number>) => {
        // console.log(e,d)
        const idAsString = e.toElement.id; // eslint-disable-line
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const id = Number(idAsString.replace(/[^0-9]/g, ''));
        console.log(points);
        console.log(id);
        tooltip.style('visibility', 'visible').html(
          // eslint-disable-next-line
          '胸腔直径:' +
            Math.round(d[0] * 10) / 10 + // eslint-disable-line
            'cm' +
            '<br>金額: ' +
            Math.round(d[1] / 100) * 100 + // eslint-disable-line
            '円',
        );
      })
      .on('mousemove', (e, d: Array<number>) => {
        const idAsString = e.toElement.id; // eslint-disable-line
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const id = Number(idAsString.replace(/[^0-9]/g, ''));
        console.log(points);
        console.log(id);

        tooltip
          // eslint-disable-next-line
          // @ts-ignore
          .style('top', event.pageY - 20 + 'px') // eslint-disable-line
          // eslint-disable-next-line
          // @ts-ignore
          .style('left', event.pageX + 10 + 'px') // eslint-disable-line
          .html(
            // eslint-disable-next-line
            // eslint-disable-next-line
            '胸腔直径:' +
              points[id][0] + // eslint-disable-line
              'cm' +
              '<br>金額: ' +
              points[id][1] + // eslint-disable-line
              '円',
          );
      })
      //  eslint-disable-next-line
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    focus
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    focus.append('g').attr('class', 'axis axis--y').call(yAxis);
    //  eslint-disable-next-line
    const dragstarted = () => {};

    function dragged(e: any, d: any) {
      //   // eslint-disable-next-line
      //  console.log(props.title)
      //   // eslint-disable-next-line
      //  console.log(props.loggingMethod)
      // eslint-disable-next-line
      // @ts-ignore
      focus.select('path').attr('d', line); // eslint-disable-line

      // eslint-disable-next-line
      // @ts-ignore
      d3.select(this).classed('dragging', true);
      // eslint-disable-next-line
      // @ts-ignore
      const idAsString = this.id; // eslint-disable-line
      const id = Number(idAsString.replace(/[^0-9]/g, '')); // eslint-disable-line
      // eslint-disable-next-line
      d[0] = Math.max(
        id !== 0 ? points[id - 1][0] : 0,
        Math.min(
          x.invert(e.x), // eslint-disable-line
          id !== points.length - 1 ? points[id + 1][0] : 40,
        ),
      );

      d[1] = Math.max(0, Math.min(y.invert(e.y), 20000)); // eslint-disable-line

      // eslint-disable-next-line
      // @ts-ignore
      d3.select(this).attr('cx', x(d[0])).attr('cy', y(d[1])); // eslint-disable-line

      tooltip
        .html(
          // eslint-disable-next-line
          '胸腔直径:' +
            Math.round(d[0] * 10) / 10 + // eslint-disable-line
            'cm' +
            '<br>金額: ' +
            Math.round(d[1] / 100) * 100 + // eslint-disable-line
            '円',
        )
        .style('visibility', 'visible')
        // eslint-disable-next-line
        // @ts-ignore
        .style('top', event.pageY - 20 + 'px') // eslint-disable-line
        // eslint-disable-next-line
        // @ts-ignore
        .style('left', event.pageX + 10 + 'px'); // eslint-disable-line
    }

    // eslint-disable-next-line
    function dragended(d: any) {
      // eslint-disable-next-line
      // @ts-ignore
      d3.select(this).classed('dragging', false);

      // eslint-disable-next-line
      // @ts-ignore
      const idAsString = this.id; // eslint-disable-line
      const number = Number(idAsString.replace(/[^0-9]/g, '')); // eslint-disable-line

      const PriceValue = Math.round(d.subject[1] / 100) * 100; // eslint-disable-line
      const PriceDiameter = Math.round(d.subject[0] * 10) / 10; // eslint-disable-line
      // eslint-disable-next-line
      // @ts-ignore
      setValue(`${loggingMethod}.Price.${number}.value`, PriceValue);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      clearErrors(`${loggingMethod}.Price.${number}.value`);
      // eslint-disable-next-line
      // @ts-ignore
      setValue(`${loggingMethod}.Diameter.${number}.value`, PriceDiameter);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      clearErrors(`${loggingMethod}.Diameter.${number}.value`);

      tooltip.style('visibility', 'hidden');
    }

    const drag = d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);

    // eslint-disable-next-line
    // @ts-ignore
    focus.selectAll('circle').call(drag);

    // gridlines in x axis function
    const makeXGridlines = () => d3.axisBottom(x).ticks(5);

    // gridlines in y axis function
    const makeYGridlines = () => d3.axisLeft(y).ticks(5);
    // add the X gridlines

    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', 'translate(0,' + height + ')') // eslint-disable-line

      .call(
        makeXGridlines()
          .tickSize(-height)
          // eslint-disable-next-line
          // @ts-ignore
          .tickFormat(''),
      );
    // add the Y gridlines
    svg
      .append('g')
      .attr('class', 'grid')

      .call(
        makeYGridlines()
          .tickSize(-width)
          // eslint-disable-next-line
          // @ts-ignore
          .tickFormat(''),
      );

    //  軸ラベルの追加
    svg
      .append('text')
      .attr('class', 'axis--x')
      .attr('y', height + 50)
      .attr('x', width / 2)
      .attr('text-anchor', 'middle')
      .text('胸腔直径[cm]');

    svg
      .append('text')
      .attr('class', 'axis--y')
      .attr('y', height / 2)
      .attr('x', -75)
      .attr('text-anchor', 'middle')
      .attr('writing-mode', 'tb')
      .text('金額【円】');
  }, [clearErrors, loggingMethod, points, setValue]);

  return (
    <div id="d3demo">
      <div className="form-group lineChart">
        <div className="lineChartText">
          {/* eslint-disable-next-line */}
          <label className="control-label lineChartTitle">{props.title}</label>
          <p
            id="root_Thinning_LoggingPitch__description"
            className="field-description lineChartDescription"
          >
            {/* eslint-disable-next-line */}
            {props.description}
          </p>
        </div>
        {/* eslint-disable-next-line */}
        {/* @ts-ignore  */}
        <svg ref={d3Chart} />
      </div>
    </div>
  );
};

export default LineChart;
