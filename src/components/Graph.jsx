import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const extractDataFromLog = (data) => {
    if (!data) {
        return 0;
    }

    // If data is an array, use the last element; otherwise use the value directly
    let str = Array.isArray(data) ? data[data.length - 1] : data;

    const match = str.match(/gain:\s*([0-9]+(?:\.[0-9]+)?)/i);
    if (match && match[1]) {
        return parseFloat(match[1]);
    }
    return 0;
};

export const Graph = ({ graphData }) => {
    const svgRef = useRef();
    const maxValue = 2;

    useEffect(() => {
        const svg = d3.select('svg');
        svg.selectAll('*').remove();

        let w = svg.node().getBoundingClientRect().width - 40;
        let h = svg.node().getBoundingClientRect().height - 25;

        const barWidth = w / graphData.length;

        let yScale = d3.scaleLinear().domain([0, maxValue]).range([h, 0]);

        const chartGroup = svg
            .append('g')
            .classed('chartGroup', true)
            .attr('transform', 'translate(30, 3)');

        const colourScale = d3
            .scaleSequential(d3.interpolateRgb('Lime', 'Red'))
            .domain([0, maxValue]);

        chartGroup
            .append('linearGradient')
            .attr('id', 'line-gradient')
            .attr('gradientUnits', 'userSpaceOnUse')
            .attr('x1', 0)
            .attr('y1', yScale(0))
            .attr('x2', 0)
            .attr('y2', yScale(maxValue))
            .selectAll('stop')
            .data([
                { offset: '0%', color: 'green' },
                { offset: '50%', color: 'yellow' },
                { offset: '100%', color: 'red' },
            ])
            .enter()
            .append('stop')
            .attr('offset', (d) => d.offset)
            .attr('stop-color', (d) => d.color);

        chartGroup
            .append('path')
            .datum(graphData.map((d) => extractDataFromLog(d)))
            .attr('fill', 'none')
            .attr('stroke', 'url(#line-gradient)')
            .attr('stroke-width', 1.5)
            .attr(
                'd',
                d3
                    .line()
                    .x((d, i) => i * barWidth)
                    .y((d) => yScale(d))
            );

        let yAxis = d3.axisLeft(yScale);
        chartGroup.append('g').classed('axis y', true).call(yAxis);
    }, [graphData]);

    return (
        <div
            id="graph-container"
            className="mb-3"
            style={{ width: '100%', height: '20vh', backgroundColor: '#222' }}
        >
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                className="border border-primary rounded p-2"
            />
        </div>
    );
};
