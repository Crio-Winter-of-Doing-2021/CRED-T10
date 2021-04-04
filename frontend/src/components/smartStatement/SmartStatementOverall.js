import React, { useRef, useEffect, useState } from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand, max } from 'd3';
import ResizeObserver from 'resize-observer-polyfill';
import PieChart from './PieChart';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

function SmartStatementOverall({
  data,
  categoriesCount,
  vendorsCount,
  categoriesNames,
  vendorsNames,
  categoriesAmount,
  vendorsAmount,
  categoriesAmountPercent,
  vendorsAmountPercent,
}) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [vendorsData, setVendorsData] = useState([]);
  const svgRef = useRef();
  const svgRef2 = useRef();
  const wrapperRef = useRef();
  const wrapperRef2 = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const dimensions2 = useResizeObserver(wrapperRef2);
  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const svg2 = select(svgRef2.current);
    console.log(categoriesCount, vendorsCount);
    console.log(categoriesNames, vendorsNames);
    console.log(categoriesAmount, vendorsAmount);
    if (categoriesData.length === 0)
      for (let i = 0; i < categoriesAmount.length; i++) {
        let tmpData = {};
        tmpData.label = categoriesNames[i];
        tmpData.value = categoriesAmount[i];
        // console.log(tmpData);
        let tmpArr = categoriesData;
        if (tmpData.value == 0) {
          // don't add it to pie chart
        } else {
          tmpArr.push(tmpData);
          setCategoriesData(tmpArr);
        }
      }
    if (vendorsData.length === 0)
      for (let i = 0; i < vendorsAmount.length; i++) {
        let tmpData = {};
        tmpData.label = vendorsNames[i];
        tmpData.value = vendorsAmount[i];
        // console.log(tmpData);
        let tmpArr = vendorsData;
        if (tmpData.value == 0) {
          // don't add it to pie chart
        } else {
          tmpArr.push(tmpData);
          setVendorsData(tmpArr);
        }
      }

    console.log(dimensions);

    if (!dimensions || !dimensions2) return;

    // scales
    const xScale1 = scaleBand()
      .domain(categoriesNames.map((value, index) => value))
      .range([0, dimensions.width]) // change
      .padding(0.5);
    const xScaleNew1 = scaleBand()
      .domain(categoriesNames.map((value, index) => index))
      .range([0, dimensions.width]) // change
      .padding(0.5);

    const yScale1 = scaleLinear()
      .domain([0, max(categoriesCount) * 1.5]) // todo
      .range([dimensions.height, 0]); // change

    const colorScale = scaleLinear()
      .domain([1, 3, 6])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    // create x-axis
    const xAxis1 = axisBottom(xScale1).ticks(categoriesCount.length);
    svg
      .select('.x-axis1')
      .style('transform', `translateY(${dimensions.height}px)`)
      .call(xAxis1);

    // create y-axis
    const yAxis1 = axisRight(yScale1);
    svg
      .select('.y-axis1')
      .style('transform', `translateX(${dimensions.width}px)`)
      .call(yAxis1);

    // draw the bars
    svg
      .selectAll('.bar1')
      .data(categoriesCount)
      .join('rect')
      .attr('class', 'bar1')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value, index) => xScaleNew1(index))
      .attr('y', -dimensions.height)
      .attr('width', xScale1.bandwidth())
      .on('mouseenter', function (event, value) {
        // events have changed in d3 v6:
        // https://observablehq.com/@d3/d3v6-migration-guide#events
        const index = svg.selectAll('.bar1').nodes().indexOf(this);
        svg
          .selectAll('.tooltip1')
          .data([value])
          .join((enter) => enter.append('text').attr('y', yScale1(value) - 4))
          .attr('class', 'tooltip1')
          .text(value)
          .attr('x', xScale1(index) + xScale1.bandwidth() / 2)
          .attr('text-anchor', 'middle')
          .transition()
          .attr('y', yScale1(value) - 8)
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.select('.tooltip1').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', (value) => dimensions.height - yScale1(value));

    // svg
    //   .append('text')
    //   .attr('class', 'text-box1')
    //   .attr('x', dimensions.width / 2)
    //   .attr('y', 0 + dimensions.height / 4)
    //   .attr('text-anchor', 'middle')
    //   .style('font-size', '25px')
    //   .style('text-decoration', 'underline')
    //   .style('stroke', 'white')
    //   .text('Transactions for particular Categories');
    /* */
    // create x-axis
    // scales
    const xScale2 = scaleBand()
      .domain(vendorsNames.map((value, index) => value))
      .range([0, dimensions2.width]) // change
      .padding(0.5);

    const xScaleNew2 = scaleBand()
      .domain(vendorsNames.map((value, index) => index))
      .range([0, dimensions.width]) // change
      .padding(0.5);

    const yScale2 = scaleLinear()
      .domain([0, max(vendorsCount) * 1.5]) // todo
      .range([dimensions2.height, 0]); // change

    const xAxis2 = axisBottom(xScale2).ticks(vendorsCount.length);
    svg2
      .select('.x-axis2')
      .style('transform', `translateY(${dimensions2.height}px)`)
      .call(xAxis2);

    // create y-axis
    const yAxis2 = axisRight(yScale2);
    svg2
      .select('.y-axis2')
      .style('transform', `translateX(${dimensions2.width}px)`)
      .call(yAxis2);

    // draw the bars
    svg2
      .selectAll('.bar2')
      .data(vendorsCount)
      .join('rect')
      .attr('class', 'bar2')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value, index) => xScaleNew2(index))
      .attr('y', -dimensions2.height)
      .attr('width', xScale2.bandwidth())
      .on('mouseenter', function (event, value) {
        // events have changed in d3 v6:
        // https://observablehq.com/@d3/d3v6-migration-guide#events
        const index = svg.selectAll('.bar2').nodes().indexOf(this);
        svg2
          .selectAll('.tooltip2')
          .data([value])
          .join((enter) => enter.append('text').attr('y', yScale2(value) - 4))
          .attr('class', 'tooltip2')
          .text(value)
          .attr('x', xScale2(index) + xScale2.bandwidth() / 2)
          .attr('text-anchor', 'middle')
          .transition()
          .attr('y', yScale2(value) - 8)
          .attr('opacity', 1);
      })
      .on('mouseleave', () => svg.select('.tooltip2').remove())
      .transition()
      .attr('fill', colorScale)
      .attr('height', (value) => dimensions2.height - yScale2(value));
  }, [
    data,
    dimensions,
    dimensions2,
    vendorsCount,
    categoriesCount,
    categoriesNames,
    vendorsNames,
    categoriesAmount,
    vendorsAmount,
    categoriesData,
    vendorsData,
  ]);

  return (
    <>
      <h3 style={{ color: '#f2f2f2' }}>Transactions Count of each Category</h3>
      <div
        ref={wrapperRef}
        style={{
          marginBottom: '2rem',
          display: 'flex',
          backgroundColor: '#000',
          padding: '5px',
        }}
        className="svgBarDiv"
      >
        <svg
          ref={svgRef}
          style={{
            overflow: 'visible',
            color: '#f2f2f2',
            height: '200px',
            width: '200px',
          }}
        >
          <g className="x-axis1" />
          <g className="y-axis1" />
        </svg>
      </div>
      <h3 style={{ color: '#f2f2f2' }}>Transactions Count of each Vendor</h3>
      <div
        ref={wrapperRef2}
        style={{
          marginBottom: '2rem',
          display: 'flex',
          backgroundColor: '#000',
          padding: '5px',
        }}
      >
        <svg
          ref={svgRef2}
          style={{
            overflow: 'visible',
            color: '#f2f2f2',
            height: '200px',
            width: '200px',
          }}
          className="svgBarDiv"
        >
          <g className="x-axis2" />
          <g className="y-axis2" />
        </svg>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '[first] 1fr [second] 1fr [third]',
        }}
      >
        <div className="hide-sm" style={{ textAlign: 'center', color: '#fff' }}>
          <h3>Categories Split-Up based on Amount</h3>
        </div>
        <div className="hide-sm" style={{ textAlign: 'center', color: '#fff' }}>
          <h3>Vendors Split-Up based on Amount</h3>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <span>
          {categoriesData.length > 0 ? (
            <PieChart
              data={categoriesData}
              outerRadius={100}
              innerRadius={20}
              check={false}
            />
          ) : null}
        </span>
        <span style={{ marginRight: '20px' }}>
          {vendorsData.length > 0 ? (
            <PieChart
              data={vendorsData}
              outerRadius={100}
              innerRadius={20}
              check={true}
            />
          ) : null}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          backgroundColor: '#1f1f1f',
          color: '#fff',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              '[first] 1fr [second] 1fr [third] 1fr [fourth]',
            fontSize: '30px',
            textAlign: 'center',
            border: '1px solid #f4f4f4',

            marginRight: '20px',
          }}
        >
          <>
            <div style={{ marginRight: '5px' }}>Category</div>
            <div style={{ marginRight: '5px' }}>Transactions</div>
            <div>Total</div>
          </>
          {categoriesNames &&
            categoriesNames.map((value, index) => (
              <>
                <div style={{ marginRight: '5px' }}>
                  {capitalizeFirstLetter(value)}
                </div>
                <div style={{ marginRight: '5px' }}>
                  {categoriesCount[index]}
                </div>
                <div>{categoriesAmount[index]}</div>
              </>
            ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              '[first] 1fr [second] 1fr [third] 1fr [fourth]',
            fontSize: '30px',
            textAlign: 'center',
            border: '1px solid #f4f4f4',
          }}
        >
          <>
            <div style={{ marginRight: '5px' }}>Vendor</div>
            <div style={{ marginRight: '5px' }}>Transactions</div>
            <div>Total</div>
          </>
          {vendorsNames &&
            vendorsNames.map((value, index) => (
              <>
                <div style={{ marginRight: '5px' }}>
                  {capitalizeFirstLetter(value)}
                </div>
                <div style={{ marginRight: '5px' }}>{vendorsCount[index]}</div>
                <div>{vendorsAmount[index]}</div>
              </>
            ))}
        </div>
      </div>
      {/* {vendorsAmount === [] ? null : <PieChart />} */}
    </>
  );
}
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default SmartStatementOverall;
