import React, { Component } from 'react'
import { select, scaleLinear, scaleOrdinal } from 'd3'
import * as tsnejs from './tsne'
import './Visualization.css'

class Visualization extends Component {
  constructor() {
    super()

    this.margin = { t: 10, r: 10, b: 10, l: 10 }

    // this.paused = false
    this.x = scaleLinear()
    this.y = scaleLinear()
    this.c = scaleOrdinal()
      .domain(['G', 'F', 'C'])
      .range(['#46c06f', '#fa7d5e', '#7a3aa3'])


    this.t = scaleLinear()
      .domain([0, 20, 50, 100, 200, 6000])
      .range([60, 30, 20, 10, 0]);

    this.redraw = this.redraw.bind(this)
  }

  shouldComponentUpdate(props) {
    return props.stats.length > 0
  }

  componentDidUpdate(prevProps, b) {
    const {width:nWidth, height:nHeight} = prevProps.dimensions
    const { width, height } = this.props.dimensions

    if(nWidth !== width || nHeight !== height) {
      this.redraw()
    } else {
      this.recompute()
    }
  }

  recompute() {
    console.log('recomputing');
    // var step = 0
    // var chunk = 1
    // var frame
    // var tsne = new tsnejs.tSNE(this.props.options)
    //
    // tsne.initDataRaw(this.props.stats)
    //
    // function tick() {
    //   if(step >= 400) chunk = 10
    //   for(var k = 0; k < chunk; k++) {
    //     tsne.step()
    //     ++step
    //   }
    //
    //   const solution = tsne.getSolution().map((xy, i) => {
    //     // console.log(xy);
    //   })
    //
    //   // this.props.updateStep(step)
    // }
    //
    // tick = tick.bind(this)
    // tick()
  }

  redraw() {
    console.log('drawing');
    const { dimensions } = this.props
    const width = dimensions.width - this.margin.l - this.margin.r
    const height = dimensions.height - this.margin.t - this.margin.b

    this.x.range([0, width])
    this.y.range([0, height])

    this.recompute()
  }

  render() {
    const { width, height } = this.props.dimensions
    const transform = `translate(${this.margin.l}, ${this.margin.t})`

    return (
      <svg ref={node => this.node = node} width={width} height={height} className="Visualization">
        <g transform={transform}>
        </g>
      </svg>
    )
  }
}

export default Visualization;
