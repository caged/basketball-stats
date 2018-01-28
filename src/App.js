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
      dimensions: {
        width: 0,
        height: 0
      },
      options: {
        perplexity: 10,
        epsilon: 5
      },
      stats: Config.Stats
    }

    this.updateOptions = this.updateOptions.bind(this)
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateOptions(key, val) {
    const options = {...this.state.options}
    options[key] = val
    this.setState({ options })
  }

  updateDimensions(dimensions) {
    this.setState({ dimensions })
  }

  componentDidMount() {
    csv('./players.csv')
      .get((data) => {
        const players = data
        this.setState( { players })
      })
  }

  render() {
    return (
      <div className="App">
        <SideBar />
        <FeatureContent
          dimensions={this.state.dimensions}
          options={this.state.options}
          updateOptions={this.updateOptions}
          updateDimensions={this.updateDimensions} />
      </div>
    )
  }
}

export default App;
