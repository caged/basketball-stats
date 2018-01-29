import React, { Component } from 'react'
import FeatureHeader from './FeatureHeader'
import Visualization from './Visualization'

import './FeatureContent.css'

class FeatureContent extends Component {
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

  render() {
    return (
      <div className="FeatureContent">
        <FeatureHeader options={this.props.options} updateOptions={this.props.updateOptions} />
        <div ref={node => this.node = node} className="viswrapper">
          <Visualization stats={this.props.stats} players={this.props.players} dimensions={this.props.dimensions} options={this.props.options} />
        </div>
      </div>
    )
  }
}

export default FeatureContent;
