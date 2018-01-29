import React, { Component } from 'react'
import FeatureHeader from './FeatureHeader'
import Visualization from './Visualization'

import './FeatureContent.css'

class FeatureContent extends Component {
  constructor() {
    super()

    this.state = {
      step: 0
    }

    this.updateStep = this.updateStep.bind(this)
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  updateDimensions() {
    const dimensions = {
      width: this.node.clientWidth,
      height: this.node.clientHeight
    }

    this.props.updateDimensions(dimensions)
  }

  updateStep(step) {
    console.log(step);
    // this.setState({ step })
  }

  render() {
    return (
      <div className="FeatureContent">
        <FeatureHeader
          step={this.state.step}
          options={this.props.options}
          updateOptions={this.props.updateOptions} />
        <div ref={node => this.node = node} className="viswrapper">
          <Visualization
            stats={this.props.stats}
            dimensions={this.props.dimensions}
            options={this.props.options}
            updateStep={this.updateStep} />
        </div>
      </div>
    )
  }
}

export default FeatureContent;
