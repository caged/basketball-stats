import React, { Component } from 'react'
import {debounce} from 'throttle-debounce'

import './RangeControl.css'

class RangeControl extends Component {
  constructor() {
    super()
    this.updateOption = debounce(200, this.updateOption)
  }

  updateOption(event) {
    const {name, value} = event.target
    this.props.updateOptions(name, value)
  }

  onChange(event) {
    event.persist()
    this.updateOption(event)
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
            onChange={this.onChange.bind(this)} />
      </div>
    )
  }
}

export default RangeControl;
