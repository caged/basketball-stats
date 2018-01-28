import React, { Component } from 'react'
import FeatureHeader from './FeatureHeader'

// import './FeatureContent.css'

class FeatureContent extends Component {
  render() {
    return (
      <div className="FeatureContent">
        <FeatureHeader options={this.props.options} updateOptions={this.props.updateOptions} />
      </div>
    )
  }
}

export default FeatureContent;
