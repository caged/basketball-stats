import React, { Component } from 'react'
import SideBar from './SideBar'
import FeatureContent from './FeatureContent'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar />
        <FeatureContent />
      </div>
    )
  }

  componentDidMount() {
    this.setState({
      defaults: {
        perplexity: 10,
        epsilon: 5
      }
    })
  }
}

export default App;
