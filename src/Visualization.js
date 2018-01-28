import React, { Component } from 'react'
import { select } from 'd3'
import './Visualization.css'

class Visualization extends Component {
  constructor() {
    super()
    this.initializeCanvas = this.initializeCanvas.bind(this)
  }

  componentDidMount() {
    this.initializeCanvas()
  }

  //  componentDidUpdate() {
  //    this.initializeCanvas()
  //  }
  //
  // shouldComponentUpdate() {
  //   return false;
  // }

  initializeCanvas() {
    console.log(this.props);
    const margin = { t: 0, r: 0, b: 0, l: 0 }
    console.log('updated');
    console.log(this.props.dimensions);
  }

  render() {
    const { width, height } = this.props.dimensions

    return (
      <svg width={width} height={height} className="Visualization" ref={node => this.node = node}>
        Visualization
      </svg>
    )
  }
}

export default Visualization;
