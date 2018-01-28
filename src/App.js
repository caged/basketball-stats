import React, { Component } from 'react'
import SideBar from './SideBar'
import FeatureContent from './FeatureContent'

import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      options: {
        perplexity: 10,
        epsilon: 5
      }
    }

    this.updateOptions = this.updateOptions.bind(this)
  }

  updateOptions(key, val) {
    const options = {...this.state.options}
    options[key] = val
    this.setState({ options })
  }

  componentDidMount() {
    this.setState({
      defaults: {
        perplexity: 10,
        epsilon: 5
      }
    })
  }

  render() {
    return (
      <div className="App">
        <SideBar />
        <FeatureContent options={this.state.options} updateOptions={this.updateOptions} />
      </div>
    )
  }
}

export default App;
