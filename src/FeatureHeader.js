import React, { Component } from 'react'
import RangeControl from './RangeControl'

import './FeatureHeader.css'

class FeatureHeader extends Component {
  render() {
    const { perplexity, epsilon } = this.props.options

    return (
      <header className="FeatureHeader">
        <RangeControl min="2" max="100" value={perplexity} label="Perplexity" updateOptions={this.props.updateOptions} />
        <RangeControl min="1" max="20" value={epsilon} label="Epsilon" updateOptions={this.props.updateOptions} />
      </header>
    )
  }
}

export default FeatureHeader
