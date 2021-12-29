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

import './LineChart.css';

// eslint-disable-next-line
type Props = {
  description?: string;
  title?: string;
  loggingMethod?: string;
  register?: UseFormRegister<FormValues>;
  handleSubmit?: UseFormHandleSubmit<FormValues>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control?: Control<FormValues, object>;
  setValue?: UseFormSetValue<FormValues>;
  watch?: UseFormWatch<FormValues>;
  clearErrors?: any;
  xaxisTitle: string;
  xaxisUnit: string;
  yaxisTitle: string;
  yaxisUnit: string;
  xaxisMax?: number;
  yaxisMin?: number;
  xaxisMin?: number;
  yaxisMax?: number;
  isdrag?: boolean;
  data: Array<Array<number>>;
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
    xaxisTitle,
    xaxisUnit,
    yaxisTitle,
    yaxisUnit,
    xaxisMax,
    yaxisMax,
    xaxisMin,
    yaxisMin,
    data,
    isdrag,
  } = props;

  const d3Chart = useRef();

  useEffect(() => {
    const margin = { top: 40, right: 0, bottom: 70, left: 70 };
    const width =
      parseInt(d3.select('#d3demo').style('width'), 10) -
      margin.left -
      margin.right;
    const height =
      parseInt(d3.select('#d3demo').style('height'), 10) -
      margin.top -
      margin.bottom;

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

    const maxX =
      xaxisMax !== undefined
        ? xaxisMax
        : d3.max(data, (d: Array<number>) => d[0]); // eslint-disable-line
    const minX =
      xaxisMin !== undefined
        ? xaxisMin
        : d3.min(data, (d: Array<number>) => d[0]); // eslint-disable-line

    // x axis scale
    const x = d3
      .scaleLinear()
      // eslint-disable-next-line
      // @ts-ignore
      .domain([minX, maxX])
      .range([0, width]);

    const maxY =
      yaxisMax !== undefined
        ? yaxisMax
        : d3.max(data, (d: Array<number>) => d[1]); // eslint-disable-line
    const minY =
      yaxisMin !== undefined
        ? yaxisMin
        : d3.min(data, (d: Array<number>) => d[1]); // eslint-disable-line

    // // eslint-disable-next-line
    // // @ts-ignore
    // x.domain(d3.extent(AxisRange, (d: Array<Array<number>>) => d[0]));
    const y = d3
      .scaleLinear()
      // eslint-disable-next-line
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      .domain([minY, maxY + 10000])
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    const line = d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    const focus = svg.append('g');

    focus
      .append('path')
      .datum(data)
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
      .data(data)
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
        console.log(data);
        console.log(id);
        tooltip.style('visibility', 'visible').html(
          // eslint-disable-next-line
          `${xaxisTitle}:` +
            Math.round(d[0] * 10) / 10 + // eslint-disable-line
            'cm' +
            `<br>${yaxisTitle}: ` +
            Math.round(d[1] / 100) * 100 + // eslint-disable-line
            '円',
        );
      })
      .on('mousemove', (e, d: Array<number>) => {
        const idAsString = e.toElement.id; // eslint-disable-line
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const id = Number(idAsString.replace(/[^0-9]/g, ''));
        console.log(data);
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
            `${xaxisTitle}:` +
              data[id][0] + // eslint-disable-line
              `${xaxisUnit}` +
              `<br>${yaxisTitle}: ` +
              data[id][1] + // eslint-disable-line
              `${yaxisUnit}`,
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

    if (isdrag) {
      //  eslint-disable-next-line
      const dragstarted = () => {};
      // eslint-disable-next-line
      // @ts-ignore
      function dragged(e: any, d: any) {
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
          id !== 0 ? data[id - 1][0] : 0,
          Math.min(
            x.invert(e.x), // eslint-disable-line
            id !== data.length - 1 ? data[id + 1][0] : 40,
          ),
        );
        // eslint-disable-next-line
        // @ts-ignore
        d[1] = Math.max(0, Math.min(y.invert(e.y), maxY + 20000 )); // eslint-disable-line

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
      // @ts-ignore
      function dragended(d: any) {
        // eslint-disable-next-line
        // @ts-ignore
        d3.select(this).classed('dragging', false);

        // eslint-disable-next-line
        // @ts-ignore
        const idAsString = this.id; // eslint-disable-line
        const number = Number(idAsString.replace(/[^0-9]/g, '')); // eslint-disable-line

        const PriceValue = Math.round(d.subject[1] / 100) * 100; // eslint-disable-line
        const PriceDiameter = Math.round(d.subject[0]); // eslint-disable-line
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
    }

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
      .text(`${xaxisTitle}【${xaxisUnit}】`);

    svg
      .append('text')
      .attr('class', 'axis--y')
      .attr('y', -20)
      .attr('x', -15)
      .attr('text-anchor', 'middle')
      .text(`${yaxisTitle}【${yaxisUnit}】`);
  }, [
    clearErrors,
    loggingMethod,
    data,
    setValue,
    xaxisTitle,
    xaxisUnit,
    yaxisTitle,
    yaxisUnit,
    yaxisMax,
    xaxisMax,
    xaxisMin,
    yaxisMin,
    isdrag,
  ]);

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
