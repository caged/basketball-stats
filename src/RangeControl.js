import React, { Component } from 'react'

import './RangeControl.css'

class RangeControl extends Component {
  render() {
    const {min, max, value, label} = this.props
    return (
      <div className="RangeControl">
        <span className="RangeControl-label">{ label }</span>
        <input className="RangeControl-input" type="range" max={max} min={min} defaultValue={value} />
      </div>
    )
  }
}

export default RangeControl;
