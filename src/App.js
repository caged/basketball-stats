import React, { Component } from 'react'
import SideBar from './SideBar'
import FeatureContent from './FeatureContent'
import Config from './Config'

import { csv } from 'd3'

import './App.css'

class App extends Component {

  constructor() {
    super()

    this.state = {
      players: [],
      stats: [],
      dimensions: {
        width: 0,
        height: 0
      },
      options: {
        perplexity: 10,
        epsilon: 5
      },
      config: Config
    }

    this.updateOptions = this.updateOptions.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.updatePlayers = this.updatePlayers.bind(this)
  }

  updateOptions(key, val) {
    const options = {...this.state.options}
    options[key] = +val
    this.setState({ options })
  }

  updateDimensions(dimensions) {
    this.setState({ dimensions })
  }

  updateConfig(config) {
    const stats = this.extractStats(config, this.state.players)
    this.setState({ config, stats })
  }

  componentDidMount() {
    csv('./players.csv')
      .get(this.updatePlayers)
  }

  updatePlayers(data) {
    const players = data
    const stats = this.extractStats(this.state.config, players)
    this.setState({ players, stats })
  }

  extractStats(config, players) {
    return players.map((p) => {
      return config.stats.map((s) => {
        return +p[s]
      })
    })
  }

  render() {
    return (
      <div className="App">
        <SideBar updateConfig={this.updateConfig} />
        <FeatureContent
          dimensions={this.state.dimensions}
          options={this.state.options}
          stats={this.state.stats}
          updateOptions={this.updateOptions}
          updateDimensions={this.updateDimensions} />
      </div>
    )
  }
}

export default App;
