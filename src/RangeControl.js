import React, { Component } from 'react'

import './RangeControl.css'

class RangeControl extends Component {
  updateOption(event) {
    event.preventDefault()
    const {name, value} = event.target
    this.props.updateOptions(name, value)
  }

  render() {
    const {min, max, value, label} = this.props
    return (
      <div className="RangeControl">
        <span className="RangeControl-info">
          <span className="RangeControl-label">{ label }</span>
          <span className="RangeControl-value">{ value }</span>
        </span>
        <input
            className="RangeControl-input"
            type="range"
            max={max}
            min={min}
            name={label.toLowerCase()}
            defaultValue={value}
            onChange={(e) => this.updateOption(e) } />
      </div>
    )
  }
}

export default RangeControl;
