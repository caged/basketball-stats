import React, { Component } from 'react'
import Config from './Config'

import './SideBar.css'

class SideBar extends Component {
  componentDidMount() {
    // TODO: Allow selecting stats to include in sidebar
    const stats = Config.stats
    this.props.updateStats({ stats })
  }

  render() {
    return (
      <div className="SideBar">
        SideBar
      </div>
    )
  }
}

export default SideBar;
