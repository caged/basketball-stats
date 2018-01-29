import React, { Component } from 'react'
import { select, scaleLinear, scaleOrdinal } from 'd3'
import * as tsnejs from './tsne'
import './Visualization.css'

class Visualization extends Component {
  constructor() {
    super()

    this.margin = { t: 10, r: 10, b: 10, l: 10 }

    this.x = scaleLinear()
    this.y = scaleLinear()
    this.c = scaleOrdinal()
      .domain(['G', 'F', 'C'])
      .range(['#46c06f', '#fa7d5e', '#7a3aa3'])

    this.redraw = this.redraw.bind(this)
  }

  shouldComponentUpdate(props) {
    return props.stats.length > 0
  }

  // componentDidMount() {
  //   this.redraw()
  // }

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
    var tsne = new tsnejs.tSNE(this.props.options)
    tsne.initDataRaw(this.props.stats)
    console.log(this.props.stats);
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
