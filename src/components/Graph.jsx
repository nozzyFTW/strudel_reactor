import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const extractDataFromLog = (data) => {
    if (!data) {
        return 0;
    }

    var stringArray = data.split(/(\s+)/);
    for (const item of stringArray) {
        if (item.startsWith('gain:')) {
            let val = item.substring(5);
            return Number(val);
        }
    }
    return 0;
};

export const Graph = ({ graphData }) => {
    const svgRef = useRef();
    const maxValue = 1;

    useEffect(() => {
        const svg = d3.select('svg');
        svg.selectAll('*').remove();

        let w = svg.node().getBoundingClientRect().width;
        w = w - 40;
        let h = svg.node().getBoundingClientRect().height;
        h = h - 25;
        const barMargin = 10;
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
